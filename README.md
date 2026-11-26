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

All business details - name, phone numbers, WhatsApp numbers, destinations, services, gallery, booking steps - live in one file:

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
                       # WhyChooseUs, BookingSteps, Gallery, EnquirySection, Contact
    animations/        # Reveal (scroll reveal wrapper)
    shared/            # Logo, WhatsAppFloat, VisitorCounter, etc.
    ui/                # shadcn/ui components
  config/site.ts       # ALL business content
  lib/                 # whatsapp, validations, supabase, analytics helpers
supabase/migrations/   # database schema (optional)
public/images/         # local photography (see credits below)
```

## Tech

Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, Framer Motion, GSAP ScrollTrigger, lucide-react, React Hook Form, Zod, @supabase/supabase-js (optional), @vercel/analytics, @vercel/speed-insights.

## Performance & accessibility

- Server Components by default; client components only for interaction/animation.
- Local images via `next/image` with responsive `sizes`; hero preloaded.
- `prefers-reduced-motion` respected everywhere (CSS + Framer Motion + GSAP guards).
- Semantic landmarks, labelled form fields, keyboard-accessible lightbox (Esc/arrows), focus rings.

## Photo credits

All photography is by Wikimedia Commons contributors under Creative Commons licenses:

- public/images/hero.jpg - BubunTalk, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Deomali_hill_top_Koraput_India.jpg
- public/images/puri-temple.jpg - Kalyanpuranand, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Lord_Jagannath_temple_at_night.jpg
- public/images/puri-beach.jpg - Pinakpani, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:People_at_the_Puri_Beach_in_Puri,_Odisha_01.jpg
- public/images/konark.jpg - Subhrajyoti07, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Closeup_of_the_center_of_a_stone_wheel_-_Konark_Sun_Temple,_Orissa,_India.jpg
- public/images/koraput.jpg - Aashok Gupta, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Duduma_Waterfalls.jpg
- public/images/deomali.jpg - BubunTalk, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Deomali_hill_top_Koraput_India.jpg
- public/images/waterfall.jpg - Devopam, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Barehipani_Falls_panoramic_view.jpg
- public/images/chilika.jpg - Hellohappy, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Chilika_Lake_(56468).jpg
- public/images/gopalpur.jpg - Someswar Dora, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Gopalpur_port,Brahmapur,Ganjam,Odisha.jpg
- public/images/temple-detail.jpg - Joydeep, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:13th_Century_stone_curvings_at_Konark_Sun_Temple_Puri_district,_Odisha,_India_5.jpg
- public/images/road-scenic.jpg - Biswarup Ganguly, CC BY 3.0 - https://commons.wikimedia.org/wiki/File:National_Highway_53_-_Kamakhyanagar_Zero-point_Area_-_Dhenkanal_2018-01-23_7082.JPG
- public/images/simlipal.jpg - Sana chougle, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Simlipal_National_Park_banner_Sunrise.jpg
- public/images/daringbadi.jpg - Nandan Behera NB, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Ground_View_of_Lovers_Point_North,Near_Daringbadi.jpg
- public/images/tribal-dance.jpg - SocialMan8, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Odisha%27s_traditional_Sambalpuri_folk_dance_performing_by_local_tribal_people,_the_culture_of_Odisha_state.jpg
- public/images/family-picnic.jpg - Pinakpani, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Jiraffe_in_Nandankanan_Zoological_Park_03.jpg
- public/images/vehicle-bus.jpg - Biswarup Ganguly, CC BY 3.0 - https://commons.wikimedia.org/wiki/File:Long-distance_Buses_-_Tourist_Lodge_Road_-_Bolpur_2014-06-28_5274.JPG
- public/images/vehicle-coach.jpg - Biswarup Ganguly, CC BY 3.0 - https://commons.wikimedia.org/wiki/File:Force_Motors_-_Traveller_26_-_Agra_2014-05-14_4222.JPG
- public/images/wedding-car.jpg - Biswarup Ganguly, CC BY-SA 4.0 - https://commons.wikimedia.org/wiki/File:Grand_Dinner_-_Odia_Hindu_Wedding_Ceremony_-_Kamakhyanagar_-_Dhenkanal_2018-01-24_8524.JPG

## Environment variables

See `.env.example`. None are required to run the site; all Supabase variables are optional.
