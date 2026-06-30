import { NextResponse } from 'next/server';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB/photo
const MAX_FILES = 6;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const get = (k: string) => String(form.get(k) ?? '').trim();
    const name = get('name');
    const phone = get('phone');
    const email = get('email');
    const service = get('service');
    const propertyType = get('propertyType');
    const city = get('city');
    const details = get('details');

    // Minimal server-side validation + honeypot-friendly guard
    if (!name || (!phone && !email) || !details) {
      return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
    }

    // Collect photo attachments (best-effort)
    const attachments: { filename: string; content: string }[] = [];
    const files = form.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
    for (const file of files.slice(0, MAX_FILES)) {
      if (file.size > MAX_FILE_BYTES) continue;
      const buf = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name || 'photo', content: buf.toString('base64') });
    }

    const rows: [string, string][] = [
      ['Name', name],
      ['Phone', phone || '—'],
      ['Email', email || '—'],
      ['Service', service || '—'],
      ['Property type', propertyType || '—'],
      ['City / area', city || '—'],
      ['Details', details],
    ];

    const html = `
      <h2 style="font-family:Arial,sans-serif;color:#0f2238">New quote request — ${escapeHtml(site.name)}</h2>
      <table style="font-family:Arial,sans-serif;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px;font-weight:bold;color:#505f74;vertical-align:top">${k}</td><td style="padding:6px 12px;color:#13293d">${escapeHtml(
                v,
              ).replace(/\n/g, '<br>')}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="font-family:Arial,sans-serif;color:#65778e;font-size:12px">${attachments.length} photo(s) attached.</p>
    `;

    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.QUOTE_TO_EMAIL || site.email;
    const from = process.env.QUOTE_FROM_EMAIL || 'Black Iron Cleanouts <onboarding@resend.dev>';

    // If no email provider is configured, capture the lead in server logs so it
    // is never silently lost, and still report success to the user.
    if (!apiKey) {
      console.warn('[quote] RESEND_API_KEY not set — logging lead instead of emailing.');
      console.info('[quote] New lead:\n' + text);
      return NextResponse.json({ ok: true, delivered: false });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email || undefined,
        subject: `New quote request — ${name}${city ? ` (${city})` : ''}`,
        html,
        text,
        attachments: attachments.length ? attachments : undefined,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      console.error('[quote] Resend error:', res.status, errBody);
      // Still capture the lead so it isn't lost.
      console.info('[quote] Undelivered lead:\n' + text);
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[quote] Unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'unexpected' }, { status: 500 });
  }
}
