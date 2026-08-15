# LinkCore Media — landing page

A long-scroll SaaS-style landing page for LinkCore Media (short-form content
studio). Dark theme, red brand accent, scroll-driven motion.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Dev server: http://localhost:5188

```bash
npm run build
```

Build output lands in `dist/`. `base` is `./` in `vite.config.ts`, so the built
folder can be dropped anywhere under `htdocs` and opened directly.

## Editing content

**Almost everything lives in [`src/content.ts`](src/content.ts)** — headline
copy is the exception. Phone numbers, services, process steps, pricing tiers,
FAQ, testimonials and the portfolio reels are all there.

### Portfolio reels

Reels are rendered with Instagram's official embed endpoint
(`instagram.com/reel/<shortcode>/embed`). Nothing is downloaded or re-hosted —
the embed stays on Instagram's servers and links back to the post.

Each entry has a `zoom` value:

```ts
{ id: "DZi_sH2IApu", caption: "Founder short-form", zoom: 152 }
```

Instagram renders each reel's media at its own height while the account header
and the likes/comment bar stay a fixed size. `zoom` is the iframe width as a
percentage of the card — it pushes that white chrome outside the card's clipped
window. **Raise it if a reel shows white at the bottom; lower it if the video
looks over-cropped.** Expect to tune this whenever you swap a reel in.

### Testimonials

`src/content.ts` ships **placeholder** testimonials, and the section renders a
visible note saying so. Replace them with real, approved client quotes before
this goes live, and delete the note in
[`src/sections/testimonials.tsx`](src/sections/testimonials.tsx).

### Contact form

[`src/sections/contact.tsx`](src/sections/contact.tsx) has **no backend**. On
submit it opens the visitor's mail client with the fields pre-filled via
`mailto:`. Wire it to a real endpoint (Formspree, a PHP mailer, your CRM)
before launch — see the comment on `handleSubmit`.

## Components from 21st.dev

These were pulled from the 21st.dev catalog and adapted to the theme:

| Component | Used for |
| --- | --- |
| Text Reveal (Mask) | hero + section paragraph reveals |
| Scroll Reveal | wrapped as `src/components/reveal.tsx`, used site-wide |
| Process Timeline | the horizontal scroll-driven process cards |
| Aurora Bento Grid | the services bento |
| Floating Gradient | recolored into `src/components/ui/brand-gradient.tsx` |
| Pricing Section 1 | the pricing tiers |
| Accordion | the FAQ |

`Button`, `Card` and `Badge` are the standard shadcn primitives those
components expect, written to match this theme.

## Theme

- Brand red: `brand` / `brand-soft` / `brand-deep` in `tailwind.config.ts`
- Shared classes (`.display`, `.eyebrow`, `.surface`, `.grad-text`, `.noise`)
  are defined in `src/index.css`

## Note on motion

21st components import from both `motion/react` and `framer-motion`. They are
the same runtime, but loading both produces two motion contexts and React
throws "Invalid hook call" — so every import is normalised to `motion/react`
and `framer-motion` is deliberately **not** a dependency. Keep it that way when
adding new components.
