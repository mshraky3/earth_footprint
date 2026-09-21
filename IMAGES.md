# بصمة الأرض — Image brief

Every photo below the hero is currently a **free-licence stock placeholder** (Unsplash License: free for commercial use, no attribution required). They are toned into the site palette so the page looks finished today. For the final version, replace each one with a real photo of the office's own work using the shot list in the second half.

The hero (3D globe) uses no photography and is untouched.

---

## 1. What is on the site right now

All files live in `public/images/`. Photos are loaded with `loading="lazy"`. Two sections (**في أرقام** and the **footer**) use no photograph at all: they use `print.svg`, the fingerprint ridges from the logo, drawn large and faint.

Colour: **Reviews** and **Services** photos are toned into the site palette (kept as approved). All the other photos are in their **natural colour**, darkened only by a neutral scrim, so there is no green wash over them. Each subject is used once; the dune photo appears only in Contact.

| Section | File | Size | Subject | Source (photographer) |
|---|---|---|---|---|
| في أرقام | `print.svg` | vector | Fingerprint ridges from the logo (sand, ~15% opacity) | drawn for this site |
| الخدمات (side panel) | `services-panel.webp` | 800×1029 | Tree rings with a green leaf — echoes the logo (print + leaves). Portrait crop of the photo the client used on their original (v1) site, `earth_footprint/src/assets/contact16-9.webp` | Client-supplied (v1 site) |
| لماذا نحن | `why-seedling.webp` | 1800×1030 | Hands holding a seedling in soil | [Noah Buscher](https://unsplash.com/photos/hands-holding-small-plant-seedling-in-soil-x8ZStukS2PM) |
| القطاعات (band) | `sectors-solar.webp` | 1800×788 | Aerial solar farm | [Priamo Mendez](https://unsplash.com/photos/a-large-field-of-solar-panels-in-the-desert-E4XEBPEkgUs) |
| آراء العملاء | `reviews-palms.webp` | 1800×1200 | Date-palm grove, Saudi Arabia (toned) | [NEOM](https://unsplash.com/photos/a-row-of-palm-trees-with-mountains-in-the-background-ARpmY5qq7Lk) |
| تابعنا | `social-sunset.webp` | 1800×862 | City-skyline silhouette at sunset, no landmarks or people | [MO B.H](https://unsplash.com/photos/city-skyline-silhouette-against-a-colorful-sunset-sky--DylptRBhgY) |
| تواصل معنا | `contact-dunes.webp` | 1800×975 | Dune face at sunrise | [Benoît Deschasaux](https://unsplash.com/photos/golden-sunlight-bathes-the-vast-desert-sand-dunes-BhtjXDK_4V8) |
| Footer | `print.svg` | vector | Same ridge graphic, fainter | — |
| Share card | `og-image.jpg` | 1200×630 | Logo + name (generated) | — |

Client logos are in `public/clients/` (8 JPGs, supplied by the client).

Notes on the placeholders:
- The palm-grove photo shows a person in traditional dress. It is a stock image from a Saudi location; swap it if you would rather not show a stock model.
- The hands photo shows a person's hands (no face).
- The sunset skyline is unlabelled stock; a real Buraydah or Riyadh dusk shot would be better.
- I did not use several attractive shots (a water-sampling scientist, a solar/wind farm, a Riyadh tower) because they are **Unsplash+** (paid licence), and one Riyadh street shot was rejected because a car plate is legible.

---

## 2. Shot list — what to send me

Real photos beat stock here: this is a permitting office and clients want proof of real work. In priority order:

### A. Field work (highest impact — replaces `why-oasis` and `services-panel`)
- 3–5 photos of the team on site: taking air, water or soil samples, using measuring instruments, inspecting a facility.
- Landscape 3:2, at least 2400 px wide, sharp, daylight, natural (not posed at the camera).
- Hard hats / PPE visible is good. Faces are optional; shots from behind or of hands and instruments work well.
- Suggested alt text: `فريق بصمة الأرض أثناء أخذ عينات بيئية في الموقع`

### B. Permits and paperwork (replaces `numbers-ridges`)
- One clean, well-lit photo of a stack of issued permits or environmental reports on a desk, with the National Center for Environmental Compliance stamp or logo visible.
- Blur or crop any client names and licence numbers.
- Landscape 16:9, at least 2400 px wide.

### C. Client sites and sectors (replaces `sectors-solar`)
- A wide aerial or ground shot of a facility the office has worked on (factory, farm, water plant, clinic, waste site).
- Landscape 16:9 (or wider), at least 2400 px wide. Ask the client's permission before publishing.

### D. Al-Qassim / the office (replaces `reviews-palms` and `contact-dunes`)
- The office exterior or entrance, plus 1–2 photos of Buraydah / Al-Qassim (palm farms, dunes, skyline).
- Landscape 3:2, at least 2400 px wide.
- Suggested alt text: `مقر بصمة الأرض للاستشارات البيئية في القصيم`

### E. Team (optional, new section)
- One group photo and individual portraits (square 1:1, at least 800 px, plain background, same lighting).

### F. Brand files
- **Logo as SVG** (or the highest-resolution PNG with transparent background). The current file is a 1100 px WebP, fine for the nav but soft when large.
- **Client logos as PNG or SVG with transparent backgrounds.** Today they are JPGs on white or coloured squares, so they are shown on white tiles.
- Official NCEC accreditation badge/logo, if there is permission to display it.

---

## 3. Technical spec for anything you send

| | |
|---|---|
| Formats | JPG, PNG or (best) the original RAW/high-quality export. I convert to WebP. |
| Minimum size | 2400 px on the long edge for full-width backgrounds; 1200 px for panels |
| Orientation | Mostly landscape. Send one portrait (4:5) for the Services side panel |
| Look | Natural colour is fine — I tone everything into the green/sand palette, so avoid heavy filters or text/watermarks on the photo |
| Composition | Keep the important subject in the middle 60% of the frame; the edges fade into the page |
| Rights | Only photos the office owns or has permission to publish |

### How photos are prepared
Each photo is cropped to its slot, given a light contrast/colour adjustment, and saved as WebP at quality ~76 (typical result 25–260 KB). A neutral dark scrim is added in CSS so text on top stays readable. The Reviews and Services photos additionally have a green tone baked in.

---

## 4. Copy I wrote that needs your review

These lines did not exist in the original site. I derived them from the existing service descriptions and reviews, but please confirm they are accurate:

- **لماذا نحن → «من الطلب إلى التصريح»** — the four steps: نفهم نشاطك / نجهّز الملف / نقدّم الطلب / نتابع حتى الصدور (and their one-line descriptions).
- **القطاعات** — the closing line «قطاعك غير مذكور؟ نصمّم لك الحل المناسب.»
- **الخدمات** — panel caption «خدمات بيئية متكاملة»; the count "8" follows the number of services listed.
- **تواصل معنا** — form subtitle «اترك بياناتك وسيُفتح واتساب لإرسال طلبك مباشرة إلينا.» (this is accurate to how the form works today: it opens WhatsApp).
- **Footer** — tagline and the "أحدث مشاريعنا وتحديثات الأنظمة البيئية" line.
