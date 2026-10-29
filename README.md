# MG Gardens — website

Single-page site in plain HTML + Tailwind CSS v3 (compiled, committed) + a small vanilla JS file. No frameworks, no runtime CDNs.

## Folder layout

```
index.html              ← the whole site; sections separated by comment banners
thanks.html             ← page shown after the quote form is sent
404.html                ← not-found page (uses <base href="/mg-gardens/"> – update if the domain changes)
assets/css/styles.css   ← compiled Tailwind (run `npm run build` after any class/colour change)
assets/js/main.js       ← menu, scroll reveals, services tabs, before/after slider, lightbox, form validation
assets/fonts/           ← Bricolage Grotesque + Figtree (woff2) with OFL licences
images/brand/           ← logo.svg and logo-white.svg (traced from the Facebook profile picture)
images/work/            ← project photos, each as name.webp (large) + name-sm.webp (small)
images/                 ← favicons, og-image.jpg (share card), site.webmanifest
src/input.css           ← Tailwind source, @font-face, keyframes
tailwind.config.js      ← brand colours and fonts
sitemap.xml, robots.txt
_fb-pack/               ← Facebook research pack (not published – underscore folder)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| forest | `#0d431d` | Logo lettering colour – headings, buttons, dark sections |
| leaf | `#5aa832` | Logo leaf – accents, icons, ticks, "Free quote" button |
| sage | `#497256` | From the Facebook banner – small labels |
| stone | `#f3efe5` etc. | Warm tint for alternate sections (design choice) |
| ink | `#14261a` | Body text |

Fonts: **Bricolage Grotesque** (headings) and **Figtree** (body), self-hosted.
Logo: traced to clean SVG from the 1024px profile picture (same "MG" + leaf, same colours). The word "Gardens" next to it in the header is set in the heading font.

## Editing

- **Text:** edit `index.html` directly.
- **Colours / fonts:** `tailwind.config.js`, then `npm install && npm run build`.
- **Adding a work photo:** save `images/work/name.webp` (~1600px) and `name-sm.webp` (~800px), then copy one of the `<button … data-full=…>` blocks inside `data-gallery` in the *RECENT WORK* section and change the paths, alt text and `data-caption`.
- **Services explorer:** each service is a `role="tab"` button plus a matching `<article role="tabpanel">` in the *SERVICES* section. Keep the `id` / `aria-controls` pairs matching. The "Ask about…" buttons pre-select the form's service through `data-service` (must match an `<option>` in the form).
- **Before & after:** two `<img>` tags inside `[data-ba]` in the *BEFORE & AFTER* section – first is "before", second (`.ba-after`) is "after".

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/mg-gardens/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD, `sitemap.xml`, `robots.txt`, the form's `_next`, and the `<base>` in `404.html`.
- [ ] **When the client goes ahead, switch the form from Toby's email (`formsubmit.co/toby1@greggs.org`) to the client's email and activate FormSubmit** (first submission sends a confirmation email).
- [ ] Confirm phone numbers: 07839 717037 (calls) and 07911 743219 (WhatsApp), and email mggardensgsy@gmail.com.
- [ ] Get the client to sign off the services wording and "what's included" lists (built from their post: landscaping list + garden maintenance list, and their flyers).
- [ ] Assumptions to check: "Fully insured" and "Free quotes" / "often the same day" come from the client's own flyers and post; captions on the tree-bed sequence and the "St Peter Port" label on the gravel garden are assumed – check where these jobs were.
- [ ] Better/more photos would help: there are no hedge or patio photos yet (hedge panel uses an illustration). Their flyers contain small hedge and gravel step photos – ask for the originals.
- [ ] Left out: the single Facebook review (testimonials need 3+), the flyer graphics themselves, and the stock-looking patio image on one flyer.

## Source

Built from the Facebook pack in `_fb-pack/` (not published on the live site).
