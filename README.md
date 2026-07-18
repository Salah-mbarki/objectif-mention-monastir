# Sanitaire Plus — Landing Page

Landing page for **Sanitaire Plus** (quincaillerie sanitaire, plomberie,
chauffage, climatisation — Monastir, Tunisie), built with Next.js 15 (App
Router), React 19, TypeScript and Tailwind CSS v4, following the cahier des
charges from KweekTech and the provided UI mockup.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx        Root layout: fonts, metadata, LocalBusiness JSON-LD
  page.tsx           Assembles all 8 landing page blocks in order
  globals.css        Tailwind v4 theme tokens (brand colors, shadows)

components/
  Header.tsx         Bloc 1 — sticky header, desktop nav, mobile hamburger
  Hero.tsx           Bloc 2 — hero + straddling advantages bar
  Features.tsx       Bloc 3 — 4-column advantages bar
  Categories.tsx      Bloc 4 — "Nos univers" grid
  CategoryCard.tsx    Category card (image, colored badge, hover zoom)
  About.tsx          Bloc 5 — "À propos de Sanitaire Plus"
  FeaturedProducts.tsx Bloc 6 — "Nos produits phares"
  ProductCard.tsx     Product card (image, name, subtitle, price)
  CTA.tsx            Bloc 7 — final CTA banner (devis + WhatsApp)
  QuoteModal.tsx      "Demander un devis" modal form
  Footer.tsx         Bloc 8 — footer, mandatory KweekTech credit link
  WhatsAppButton.tsx  Shared WhatsApp (wa.me) button used everywhere a
                      "phone" CTA appears, per the functional notes
  Button.tsx, Container.tsx, SectionTitle.tsx  Layout/UI primitives

data/
  navigation.ts       Nav links, WhatsApp number, contact info
  categories.ts        The 5 "univers" (icons from lucide-react)
  products.ts          Seed data for "Nos produits phares"

types/
  category.ts, product.ts

public/images/
  hero/, about/, categories/, products/, icons/
```

## Implementation notes

- **WhatsApp, not tel:** every phone-style button (header, final CTA banner,
  footer) opens `https://wa.me/21650706663` in a new tab instead of
  triggering a native call, per Bloc 1 / Bloc 7 / Bloc 8 of the cahier des
  charges. This is centralised in `WhatsAppButton.tsx` and `data/navigation.ts`
  so the number only needs to change in one place.
- **"Nous contacter" vs. the header button:** the hero's secondary button
  scrolls to `#contact` (the CTA banner section) rather than opening
  WhatsApp — this distinction is called out explicitly in the spec.
- **Category cards** are fully clickable (`<Link>` wraps image + label +
  arrow) and route to `/produits?categorie=<slug>`; the products/listing
  page itself is out of scope for this landing page deliverable.
- **Product prices** are defined in `data/products.ts` as a typed seed/
  fallback. The cahier des charges asks for these to ultimately come from a
  back-office/database — swap this file for a fetch call to that API when
  it's available; the component layer doesn't need to change.
- **Demander un devis** opens a modal (`QuoteModal.tsx`) collecting name,
  phone, email and a need description. Submission currently only flips local
  UI state — wire the `handleSubmit` function to your mail/back-office
  endpoint (e.g. an API route emailing sanitaire.plus9@gmail.com) before
  going live.
- **Footer "created by kweektech"** is a permanent, non-CMS-editable
  `<a>` tag pointing to `https://kweektech.com` (`target="_blank"`,
  `rel="noopener noreferrer"`), as mandated in Bloc 8.
- **Social links** in the footer are placeholders — swap in the client's
  real Facebook/Instagram/YouTube URLs before production, as noted in the
  spec ("liens à récupérer auprès du client").
- **LocalBusiness structured data** (schema.org) is emitted in
  `app/layout.tsx` for local SEO in Monastir, per section 5.2.
- **Accessibility:** semantic landmarks (`header`, `main`, `footer`, `nav`),
  one `h1` in the hero with `h2`s per section, alt text on every image,
  visible focus rings (`globals.css`), keyboard-operable mobile menu and
  modal (Escape to close), and `prefers-reduced-motion` support.

## Placeholder images

No real product/photography assets were supplied, so `public/images/*`
currently contains generated placeholder images sized to match the mockup's
aspect ratios (hero, about, 5 category thumbnails, 5 product photos, and a
logo mark). Replace these with the client's real photography before launch —
the layout, `next/image` `sizes`, and aspect ratios are already tuned to the
mockup, so drop-in replacements of the same aspect ratio require no code
changes.

## Responsive breakpoints

Tailwind's default breakpoints are used to match the four target sizes from
the brief: mobile (~390px, base styles), tablet (`sm:` 640px), laptop (`lg:`
1024/1280px), desktop (1440px+, content is capped at a 1280px container so it
does not stretch awkwardly on ultra-wide screens). The nav collapses to the
hamburger menu below `lg:` (1024px), comfortably under the spec's 992px
threshold.
