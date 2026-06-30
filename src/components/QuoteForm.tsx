'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { site } from '@/lib/site';
import {
  CheckIcon,
  ArrowRightIcon,
  WhatsAppIcon,
  CloseIcon,
} from './icons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SERVICE_KEYS = [
  'junk',
  'moving',
  'hauling',
  'cleanout',
  'appliance',
  'commercial',
  'other',
] as const;

export function QuoteForm() {
  const t = useTranslations('quote.form');
  const tc = useTranslations('common');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Client-side validation
    const next: Record<string, string> = {};
    if (!String(data.get('name') || '').trim()) next.name = t('errors.name');
    if (
      !String(data.get('phone') || '').trim() &&
      !String(data.get('email') || '').trim()
    )
      next.contact = t('errors.contact');
    if (!String(data.get('details') || '').trim()) next.details = t('errors.details');
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstId = Object.keys(next)[0] === 'contact' ? 'phone' : Object.keys(next)[0];
      document.getElementById(firstId)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/quote', { method: 'POST', body: data });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center" role="status" aria-live="polite">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-forest-600 dark:bg-forest-500/15 dark:text-forest-300">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-2xl font-bold">{t('successTitle')}</h2>
        <p className="mx-auto mt-3 max-w-md text-base text-muted">{t('successBody')}</p>
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
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      {status === 'error' && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          <CloseIcon className="h-5 w-5 shrink-0" />
          <span>
            <strong className="block">{t('errorTitle')}</strong>
            {t('errorBody')}
          </span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('name')} htmlFor="name" required requiredLabel={t('required')} error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" placeholder={t('namePlaceholder')} className="ipt" />
        </Field>

        <Field label={t('service')} htmlFor="service">
          <select id="service" name="service" className="ipt" defaultValue="junk">
            {SERVICE_KEYS.map((k) => (
              <option key={k} value={k}>
                {t(`serviceOptions.${k}`)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t('phone')} htmlFor="phone" error={errors.contact}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder={t('phonePlaceholder')} className="ipt" />
        </Field>

        <Field label={t('email')} htmlFor="email">
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" placeholder={t('emailPlaceholder')} className="ipt" />
        </Field>

        <Field label={t('city')} htmlFor="city">
          <input id="city" name="city" type="text" autoComplete="address-level2" placeholder={t('cityPlaceholder')} className="ipt" />
        </Field>

        <Field label={t('propertyType')} htmlFor="propertyType">
          <select id="propertyType" name="propertyType" className="ipt" defaultValue="residential">
            <option value="residential">{tc('residential')}</option>
            <option value="commercial">{tc('commercial')}</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label={t('details')} htmlFor="details" required requiredLabel={t('required')} error={errors.details}>
          <textarea id="details" name="details" rows={4} placeholder={t('detailsPlaceholder')} className="ipt resize-y" />
        </Field>
      </div>

      <div className="mt-5">
        <Field label={t('photos')} htmlFor="photos" hint={t('photosHint')}>
          <input
            id="photos"
            name="photos"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="block w-full text-sm text-muted file:me-4 file:rounded-full file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-navy-700 hover:file:bg-navy-100 dark:file:bg-navy-400/15 dark:file:text-navy-200 dark:hover:file:bg-navy-400/25"
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col items-center gap-4">
        <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto sm:px-10">
          {status === 'submitting' ? (
            <>
              <Spinner />
              {t('submitting')}
            </>
          ) : (
            <>
              {t('submit')}
              <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
            </>
          )}
        </button>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
        >
          <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          {t('orWhatsapp')}
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  requiredLabel,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  requiredLabel?: string;
  hint?: string;
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
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4Z" />
    </svg>
  );
}
