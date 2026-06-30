# Black Iron Cleanouts, LLC — Website

A professional, trilingual marketing website for **Black Iron Cleanouts, LLC** — junk
removal, furniture moving & responsible disposal in the greater Seattle & Everett, WA area.

> _Removing Clutter, Restoring Space and Your Peace._

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** with a 3-layer **Scale Design** token system (primitive → semantic → component)
- **next-intl** — full i18n in **English / Spanish / Arabic**, with automatic **RTL** for Arabic
- **Dark / light mode** — token-driven, system-aware, persisted, no-flash on load (toggle in the header)
- SEO: per-locale metadata, `hreflang`, `sitemap.xml`, `robots.txt`, `LocalBusiness`/`MovingCompany` JSON-LD

## Deployment

Free hosting on **Vercel** or **Netlify** — see **[DEPLOY.md](DEPLOY.md)** for step-by-step instructions.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /en
```

Build & run production:

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx              # passthrough root layout
    not-found.tsx           # global 404 shell
    sitemap.ts / robots.ts  # SEO
    [locale]/               # localized routes: home, services, how-it-works,
      ...                    #   service-areas, about, contact, quote
    api/quote/route.ts      # quote form → email (Resend)
  components/               # Header, Footer, Logo, QuoteForm, sections, icons…
  i18n/                     # next-intl routing + request config
  messages/                # en.json · es.json · ar.json (all site copy)
  lib/site.ts              # single source of truth for contact details
tailwind.config.ts         # brand palette + design tokens
```

## Editing content

- **All text** lives in `src/messages/{en,es,ar}.json` — edit there, not in components.
- **Contact details** (phone, WhatsApp, email, hours, address) live in `src/lib/site.ts`.
- **Brand colors / tokens** are in `tailwind.config.ts` and `src/app/globals.css`.
- **Logo**: `src/components/Logo.tsx` is an original SVG recreation of the brand mark.
  Drop the official SVG/PNG in `public/` and swap it in when available.

## Quote form email delivery

The `Get a Free Quote` form posts to `/api/quote`, which emails new leads via
[Resend](https://resend.com). **Without configuration it still works** — submissions
are logged server-side and the user sees a success message, so no lead is lost.

To deliver real emails, copy `.env.example` → `.env.local` and set:

```
RESEND_API_KEY=re_xxxxxxxx
QUOTE_TO_EMAIL=blackironcleanoutsllc@gmail.com
QUOTE_FROM_EMAIL="Black Iron Cleanouts <quotes@yourdomain.com>"
```

## Deployment

Optimized for **Vercel**: push the repo, import it, add the env vars above, deploy.
Set the production domain in `src/lib/site.ts` (`url`) so SEO URLs are correct.
