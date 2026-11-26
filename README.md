# SS Tour & Travels

Premium travel brand website for **SS Tour & Travels** - tours, transportation and vehicle rental across Odisha, India. Built with Next.js (App Router), TypeScript (strict), Tailwind CSS, shadcn/ui, Framer Motion and GSAP.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Production check:

```bash
npm run build
npm start
```

## Business content

All business details - name, phone numbers, WhatsApp numbers, destinations, services, booking steps - live in one file:

```
src/config/site.ts
```

Update that file and the whole site (navbar, hero, cards, footer, WhatsApp messages, SEO) follows.

## Enquiry flow

The enquiry form (`#enquiry`) validates with Zod + React Hook Form (Indian mobile numbers, dates, group size).

- **Without Supabase configured** (default): the form prepares the enquiry and offers a one-tap **WhatsApp message with all details pre-filled** to +91 8327708096. Nothing is claimed to be "submitted".
- **With Supabase configured**: the enquiry is also stored in the `enquiries` table. If the database write ever fails, the site says so and falls back to WhatsApp.

## Optional: Supabase (enquiry storage + live visitor counter)

Not required for the site to work. When you're ready:

1. Create a free project at https://supabase.com
2. Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor.
3. Set environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret - server only, never in the browser)
   - `ANALYTICS_SALT` (any random string)
4. Redeploy. The footer visitor counter appears automatically once configured; before that it stays hidden. The counter uses anonymous random visitor IDs (no PII, no IPs stored), one count per session, with bot filtering and daily rate limits.

## Deployment

### Vercel

```bash
npx vercel deploy --prod
```

or connect the GitHub repo in the Vercel dashboard (framework is auto-detected). Set `NEXT_PUBLIC_SITE_URL` to the production domain. `@vercel/analytics` and `@vercel/speed-insights` are already integrated and free within Vercel's included limits.

Note: Vercel's free Hobby plan terms restrict it to non-commercial use. For a business site, either use a Vercel plan that covers commercial use or deploy to a host whose free tier allows it.

### Netlify (free tier allows commercial use)

`netlify.toml` is included. Connect the repo at https://app.netlify.com or run `npx netlify deploy --prod`. The Next.js runtime is auto-detected; API routes, SSR and `next/image` all work. (The Vercel analytics packages remain in the code but their dashboards only work on Vercel.)

## Project structure

```
src/
  app/                 # App Router pages, API routes, SEO files
    api/enquiries/     # enquiry validation + optional Supabase storage
    api/analytics/     # visitor tracking + aggregate count
  components/
    layout/            # Navbar, MobileMenu, Footer
    sections/          # Hero, TrustBar, Destinations, Services, Experience,
                       # WhyChooseUs, BookingSteps, EnquirySection, Contact
    animations/        # Reveal (scroll reveal wrapper)
    shared/            # Logo, WhatsAppFloat, VisitorCounter, etc.
    ui/                # shadcn/ui components
  config/site.ts       # ALL business content
  lib/                 # whatsapp, validations, supabase, analytics helpers
supabase/migrations/   # database schema (optional)
public/images/         # brand logo
```

## Tech

Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, Framer Motion, GSAP ScrollTrigger, lucide-react, React Hook Form, Zod, @supabase/supabase-js (optional), @vercel/analytics, @vercel/speed-insights.

## Performance & accessibility

- Server Components by default; client components only for interaction/animation.
- Local images via `next/image` with responsive `sizes`; hero preloaded.
- `prefers-reduced-motion` respected everywhere (CSS + Framer Motion + GSAP guards).
- Semantic landmarks, labelled form fields, keyboard-accessible lightbox (Esc/arrows), focus rings.

## Environment variables

See `.env.example`. None are required to run the site; all Supabase variables are optional.

## Visitor counter

Uses Upstash Redis (Vercel Marketplace, Free plan). Counts unique browsers (anonymous random ID, no IPs stored) and page views. Estimates only. Env: `KV_REST_API_URL`, `KV_REST_API_TOKEN` (injected by the integration). Non-production deployments use a separate `sst:test` key namespace.
