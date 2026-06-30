# Deployment Guide — Black Iron Cleanouts

The site is a standard **Next.js 15 (App Router)** app. It deploys for **free** on
either **Vercel** (recommended — built by the Next.js team) or **Netlify**.

> The site works with **zero environment variables**. Email delivery for the quote
> form is optional — without it, leads are logged server-side and the user still sees
> a success message. Add the email keys later to receive quotes in your inbox.

---

## Step 0 — Push the code to GitHub (one time)

```bash
cd d:\black_iron
git init
git add .
git commit -m "Black Iron Cleanouts website"
# Create an empty repo on github.com first, then:
git remote add origin https://github.com/<you>/black-iron-cleanouts.git
git branch -M main
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `.next`, and `.env*` — your secrets are safe.

---

## Option A — Vercel (recommended)

1. Go to **https://vercel.com** and sign in with GitHub.
2. **Add New… → Project** → import `black-iron-cleanouts`.
3. Framework is auto-detected as **Next.js**. Leave build settings at defaults
   (`npm run build`). Click **Deploy**.
4. Done — you get a free `*.vercel.app` URL in ~1 minute.
5. (Optional) **Settings → Domains** → add your custom domain (e.g. `blackironcleanouts.com`).

**Email (optional):** Project → **Settings → Environment Variables**, add the three
keys from the table below, then **redeploy**.

---

## Option B — Netlify

1. Go to **https://netlify.com** and sign in with GitHub.
2. **Add new site → Import an existing project** → pick the repo.
3. `netlify.toml` (already in the repo) sets the build command and the Next.js plugin.
   Click **Deploy**.
4. You get a free `*.netlify.app` URL. Add a custom domain under **Domain settings**.

**Email (optional):** **Site configuration → Environment variables** → add the keys, redeploy.

---

## Environment variables (optional — for receiving quote emails)

| Variable | Value | Notes |
|----------|-------|-------|
| `RESEND_API_KEY` | `re_xxxxxxxx` | Free account at [resend.com](https://resend.com) |
| `QUOTE_TO_EMAIL` | `blackironcleanoutsllc@gmail.com` | Inbox that receives leads |
| `QUOTE_FROM_EMAIL` | `Black Iron Cleanouts <quotes@yourdomain.com>` | Must be a domain verified in Resend |

To send from `@gmail.com` you can't verify Gmail in Resend — use Resend's test sender
or verify your own domain. Until then, the form still works and logs leads.

---

## After deploying

1. Update the production URL in **`src/lib/site.ts`** (`url`) so SEO/sitemap links are
   correct, commit, and push (auto-redeploys).
2. Submit `https://yourdomain.com/sitemap.xml` to **Google Search Console** for local SEO.
3. Test the three languages: `/en`, `/es`, `/ar`, the dark-mode toggle, and the quote form.
