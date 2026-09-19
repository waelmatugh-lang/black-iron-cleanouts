'use client';

import { useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { site } from '@/lib/site';
import {
  categories,
  cities,
  calculateEstimate,
  formatUsd,
  unitPrice,
  type Lang,
  type Mode,
  type Estimate,
  type PriceItem,
} from '@/lib/pricing';
import { HeartHandIcon, TrashIcon, CheckIcon, CloseIcon, ArrowRightIcon, WhatsAppIcon } from './icons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function EstimateCalculator() {
  const t = useTranslations('estimate');
  const tq = useTranslations('quote.form');
  const lang = useLocale() as Lang;

  // /estimate?mode=donation preselects the mode (linked from the Donation Pickup page).
  const requestedMode = useSearchParams().get('mode');
  const [mode, setMode] = useState<Mode>(requestedMode === 'donation' ? 'donation' : 'disposal');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [city, setCity] = useState('');
  const [stairs, setStairs] = useState(0);
  const [disassembly, setDisassembly] = useState(false);
  const [curbside, setCurbside] = useState(false);
  const [sameDay, setSameDay] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const estimate = useMemo(
    () => calculateEstimate({ mode, quantities, city, stairs, disassembly, curbside, sameDay }),
    [mode, quantities, city, stairs, disassembly, curbside, sameDay],
  );
  const hasItems = estimate.itemCount > 0;

  function setQty(id: string, qty: number) {
    setQuantities((q) => {
      const next = { ...q };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 99);
      return next;
    });
  }

  function reset() {
    setQuantities({});
    setCity('');
    setStairs(0);
    setDisassembly(false);
    setCurbside(false);
    setSameDay(false);
    setShowForm(false);
    setStatus('idle');
    setErrors({});
  }

  function openForm() {
    setShowForm(true);
    // Let the form render before scrolling to it.
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  // Plain-English summary for the email the owners receive.
  function buildDetails(date: string, notes: string) {
    const opts = [
      stairs > 0 && `${stairs} flight(s) of stairs`,
      disassembly && 'disassembly needed',
      curbside && 'items at curb/garage',
      sameDay && 'same-day service',
    ].filter(Boolean);
    const lines = [
      `INSTANT ESTIMATE — ${mode === 'donation' ? 'Donation pickup' : 'Disposal'}`,
      '',
      'Items:',
      ...estimate.lines.map((l) => `- ${l.qty} × ${l.item.name.en} — ${formatUsd(l.total)}`),
      '',
      `Options: ${opts.length ? opts.join('; ') : 'none'}`,
      `City: ${city || 'not specified'}`,
      `Breakdown: items ${formatUsd(estimate.subtotal)}` +
        (estimate.heavyFee ? `, heavy ${formatUsd(estimate.heavyFee)}` : '') +
        (estimate.stairsFee ? `, stairs ${formatUsd(estimate.stairsFee)}` : '') +
        (estimate.disassemblyFee ? `, disassembly ${formatUsd(estimate.disassemblyFee)}` : '') +
        (estimate.sameDayFee ? `, same-day ${formatUsd(estimate.sameDayFee)}` : '') +
        (estimate.curbsideDiscount ? `, curbside −${formatUsd(estimate.curbsideDiscount)}` : '') +
        (estimate.travelFee ? `, travel ${formatUsd(estimate.travelFee)}` : '') +
        (estimate.minimumApplied ? ' (minimum charge applied)' : ''),
      `Estimate shown to customer: ${formatUsd(estimate.low)} – ${formatUsd(estimate.high)}`,
    ];
    if (date) lines.push(`Preferred date: ${date}`);
    if (notes) lines.push('', `Notes: ${notes}`);
    return lines.join('\n');
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = new FormData(form);
    const get = (k: string) => String(raw.get(k) || '').trim();

    const next: Record<string, string> = {};
    if (!get('name')) next.name = tq('errors.name');
    if (!get('phone') && !get('email')) next.contact = tq('errors.contact');
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstId = Object.keys(next)[0] === 'contact' ? 'est-phone' : 'est-name';
      document.getElementById(firstId)?.focus();
      return;
    }

    const data = new FormData();
    data.set('name', get('name'));
    data.set('phone', get('phone'));
    data.set('email', get('email'));
    data.set('service', mode === 'donation' ? 'donation' : 'junk');
    data.set('propertyType', 'residential');
    data.set('city', city);
    data.set('details', buildDetails(get('date'), get('notes')));
    data.set('estimate', `${formatUsd(estimate.low)} – ${formatUsd(estimate.high)}`);

    setStatus('submitting');
    try {
      const res = await fetch('/api/quote', { method: 'POST', body: data });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card mx-auto max-w-2xl p-8 text-center" role="status" aria-live="polite">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-forest-600 dark:bg-forest-500/15 dark:text-forest-300">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-2xl font-bold">{t('book.successTitle')}</h2>
        <p className="mx-auto mt-3 max-w-md text-base text-muted">{t('book.successBody')}</p>
        <p className="mt-5 text-3xl font-extrabold text-accent">
          {formatUsd(estimate.low)} – {formatUsd(estimate.high)}
        </p>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-6 bg-[#25D366] text-white hover:bg-[#1faa53]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {site.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile: compact running total pinned under the header */}
      <div className="sticky top-16 z-30 -mx-4 mb-6 border-b border-border bg-surface/95 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t('summary.total')}</p>
            <p className="truncate text-lg font-extrabold text-accent">
              {hasItems ? `${formatUsd(estimate.low)} – ${formatUsd(estimate.high)}` : '—'}
            </p>
          </div>
          <button
            type="button"
            disabled={!hasItems}
            onClick={() => summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="btn-primary h-10 shrink-0 whitespace-nowrap px-4 py-0 text-sm"
          >
            {t('summary.count', { count: estimate.itemCount })}
            <ArrowRightIcon className="h-4 w-4 rotate-90" />
          </button>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div className="space-y-10">
          {/* ---------- Mode ---------- */}
          <fieldset>
            <legend className="text-xl font-bold">{t('mode.label')}</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { value: 'donation', Icon: HeartHandIcon },
                  { value: 'disposal', Icon: TrashIcon },
                ] as const
              ).map(({ value, Icon }) => {
                const active = mode === value;
                return (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                      active
                        ? 'border-accent bg-forest-50 ring-2 ring-accent/30 dark:bg-forest-500/10'
                        : 'border-border bg-surface hover:bg-surface-2'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={value}
                      checked={active}
                      onChange={() => setMode(value)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        active ? 'bg-accent text-accent-fg' : 'bg-surface-2 text-muted'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-base font-bold">{t(`mode.${value}`)}</span>
                      <span className="mt-0.5 block text-sm text-muted">{t(`mode.${value}Desc`)}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* ---------- Items ---------- */}
          <section>
            <h2 className="text-xl font-bold">{t('items.title')}</h2>
            <p className="mt-1 text-sm text-muted">{t('items.subtitle')}</p>
            <div className="mt-5 space-y-6">
              {categories.map((cat) => (
                <div key={cat.id} className="card overflow-hidden">
                  <h3 className="border-b border-border bg-surface-2 px-5 py-3 text-sm font-bold uppercase tracking-wider text-muted">
                    {cat.name[lang]}
                  </h3>
                  <ul className="divide-y divide-border">
                    {cat.items.map((item) => (
                      <ItemRow
                        key={item.id}
                        item={item}
                        lang={lang}
                        mode={mode}
                        qty={quantities[item.id] ?? 0}
                        onChange={(q) => setQty(item.id, q)}
                        labels={{
                          disposalOnly: t('items.disposalOnly'),
                          heavy: t('items.heavy'),
                          each: t('items.each'),
                        }}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- Options ---------- */}
          <section>
            <h2 className="text-xl font-bold">{t('options.title')}</h2>
            <div className="card mt-5 space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="est-city" className="mb-1.5 block text-sm font-semibold">
                    {t('options.city')}
                  </label>
                  <select id="est-city" className="ipt" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">{t('options.cityPlaceholder')}</option>
                    {cities.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                        {c.travelFee ? ` (+${formatUsd(c.travelFee)})` : ''}
                      </option>
                    ))}
                    <option value="other">{t('options.cityOther')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="est-stairs" className="mb-1.5 block text-sm font-semibold">
                    {t('options.stairs')}
                  </label>
                  <Stepper id="est-stairs" value={stairs} onChange={setStairs} max={10} />
                </div>
              </div>
              <Toggle label={t('options.disassembly')} checked={disassembly} onChange={setDisassembly} />
              <Toggle label={t('options.curbside')} checked={curbside} onChange={setCurbside} />
              <Toggle label={t('options.sameDay')} checked={sameDay} onChange={setSameDay} />
            </div>
          </section>
        </div>

        {/* ---------- Summary ---------- */}
        <div ref={summaryRef} className="scroll-mt-32 lg:sticky lg:top-24">
          <Summary
            estimate={estimate}
            lang={lang}
            hasItems={hasItems}
            onContinue={openForm}
            onReset={reset}
            t={t}
          />
        </div>
      </div>

      {/* ---------- Booking form ---------- */}
      {showForm && hasItems && (
        <div ref={formRef} className="mt-12 scroll-mt-24">
          <div className="card mx-auto max-w-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold">{t('book.title')}</h2>
            <p className="mt-2 text-base text-muted">{t('book.subtitle')}</p>

            {status === 'error' && (
              <div
                role="alert"
                className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
              >
                <CloseIcon className="h-5 w-5 shrink-0" />
                <span>
                  <strong className="block">{tq('errorTitle')}</strong>
                  {tq('errorBody')}
                </span>
              </div>
            )}

            <form onSubmit={onSubmit} noValidate className="mt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={tq('name')} htmlFor="est-name" required requiredLabel={tq('required')} error={errors.name}>
                  <input id="est-name" name="name" type="text" autoComplete="name" placeholder={tq('namePlaceholder')} className="ipt" />
                </Field>
                <Field label={tq('phone')} htmlFor="est-phone" error={errors.contact}>
                  <input id="est-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder={tq('phonePlaceholder')} className="ipt" />
                </Field>
                <Field label={tq('email')} htmlFor="est-email">
                  <input id="est-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder={tq('emailPlaceholder')} className="ipt" />
                </Field>
                <Field label={t('book.date')} htmlFor="est-date">
                  <input id="est-date" name="date" type="date" className="ipt" />
                </Field>
              </div>
              <div className="mt-5">
                <Field label={t('book.notes')} htmlFor="est-notes">
                  <textarea id="est-notes" name="notes" rows={3} placeholder={t('book.notesPlaceholder')} className="ipt resize-y" />
                </Field>
              </div>
              <div className="mt-6 flex flex-col items-center gap-3">
                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto sm:px-10">
                  {status === 'submitting' ? tq('submitting') : t('book.submit')}
                  {status !== 'submitting' && <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />}
                </button>
                <p className="text-center text-xs text-muted">{t('summary.disclaimer')}</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────── Pieces ───────────────────────────── */

function ItemRow({
  item,
  lang,
  mode,
  qty,
  onChange,
  labels,
}: {
  item: PriceItem;
  lang: Lang;
  mode: Mode;
  qty: number;
  onChange: (q: number) => void;
  labels: { disposalOnly: string; heavy: string; each: string };
}) {
  const price = unitPrice(item, mode);
  const disposalOnly = mode === 'donation' && item.donation === null;
  return (
    <li className={`flex items-center gap-3 px-5 py-3 ${qty > 0 ? 'bg-forest-50/60 dark:bg-forest-500/5' : ''}`}>
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium text-fg">{item.name[lang]}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <span>
            {formatUsd(price)} {labels.each}
          </span>
          {disposalOnly && <Tag>{labels.disposalOnly}</Tag>}
          {item.heavy && <Tag>{labels.heavy}</Tag>}
        </p>
      </div>
      <Stepper id={`qty-${item.id}`} value={qty} onChange={onChange} max={99} label={item.name[lang]} />
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-2xs font-semibold uppercase tracking-wide text-muted">
      {children}
    </span>
  );
}

function Stepper({
  id,
  value,
  onChange,
  max,
  label,
}: {
  id: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  label?: string;
}) {
  const btn =
    'flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-lg font-bold text-fg transition-colors hover:bg-surface-2 disabled:opacity-40 disabled:cursor-not-allowed';
  return (
    <div className="flex shrink-0 items-center gap-1" dir="ltr">
      <button type="button" className={btn} aria-label={`− ${label ?? ''}`} disabled={value <= 0} onClick={() => onChange(value - 1)}>
        −
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Math.max(0, Math.min(max, Number(e.target.value) || 0)))}
        className="h-9 w-12 rounded-lg border border-border bg-surface text-center text-base font-semibold text-fg [appearance:textfield] focus:border-accent focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button type="button" className={`${btn} border-accent text-accent`} aria-label={`+ ${label ?? ''}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <span className="text-base text-fg">{label}</span>
      <span className="relative inline-flex shrink-0">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
        <span className="h-7 w-12 rounded-full bg-steel-300 transition-colors peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 dark:bg-steel-700" />
        <span className="absolute start-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5" />
      </span>
    </label>
  );
}

function Summary({
  estimate,
  lang,
  hasItems,
  onContinue,
  onReset,
  t,
}: {
  estimate: Estimate;
  lang: Lang;
  hasItems: boolean;
  onContinue: () => void;
  onReset: () => void;
  t: ReturnType<typeof useTranslations<'estimate'>>;
}) {
  const fees: [string, number][] = [
    [t('summary.heavy'), estimate.heavyFee],
    [t('summary.stairs'), estimate.stairsFee],
    [t('summary.disassembly'), estimate.disassemblyFee],
    [t('summary.sameDay'), estimate.sameDayFee],
    [t('summary.curbside'), -estimate.curbsideDiscount],
    [t('summary.travel'), estimate.travelFee],
  ];
  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold">{t('summary.title')}</h2>

      {!hasItems ? (
        <p className="mt-3 text-sm text-muted">{t('summary.empty')}</p>
      ) : (
        <>
          <ul className="mt-4 max-h-56 space-y-1.5 overflow-auto text-sm">
            {estimate.lines.map((l) => (
              <li key={l.item.id} className="flex justify-between gap-3">
                <span className="text-fg">
                  <span className="font-semibold">{l.qty} ×</span> {l.item.name[lang]}
                </span>
                <span className="shrink-0 tabular-nums text-muted">{formatUsd(l.total)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
            <Row k={t('summary.items')} v={formatUsd(estimate.subtotal)} />
            {fees
              .filter(([, v]) => v !== 0)
              .map(([k, v]) => (
                <Row key={k} k={k} v={`${v < 0 ? '−' : '+'}${formatUsd(Math.abs(v))}`} accent={v < 0} />
              ))}
            {estimate.minimumApplied && <p className="text-xs text-muted">{t('summary.minimum')}</p>}
          </dl>

          <div className="mt-4 border-t border-border pt-4">
            <p className="text-sm font-semibold text-muted">{t('summary.total')}</p>
            <p className="mt-1 text-3xl font-extrabold text-accent">
              {formatUsd(estimate.low)} – {formatUsd(estimate.high)}
            </p>
            <p className="mt-1 text-xs text-muted">{t('summary.count', { count: estimate.itemCount })}</p>
          </div>
        </>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">{t('summary.disclaimer')}</p>

      <button type="button" disabled={!hasItems} onClick={onContinue} className="btn-primary mt-5 w-full">
        {t('summary.continue')}
        <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
      </button>
      {hasItems && (
        <button type="button" onClick={onReset} className="btn-ghost mt-2 w-full text-sm">
          {t('summary.reset')}
        </button>
      )}
    </div>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted">{k}</dt>
      <dd className={`tabular-nums ${accent ? 'text-accent' : 'text-fg'}`}>{v}</dd>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  requiredLabel,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  requiredLabel?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-fg">
        {label}
        {required && <span className="text-xs font-normal text-accent">({requiredLabel})</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
