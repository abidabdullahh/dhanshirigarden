# Dhanshiri Garden — website (ধানসিঁড়ি গার্ডেন)

Bilingual (Bangla default · English) website for Dhanshiri Garden, built as a static site so it can be hosted free on **GitHub Pages**.

**Stack:** Vite · React 19 · Tailwind CSS v4 · lucide-react. No server, no database, no map.
**Sections:** Hero · Stats · Services · Rooftop Garden · Lawn & Carpet Grass · Projects · Gallery · Process · Plant Doctor (AI) · Care Plans · About & Team · FAQ · Contact.

---

## 1. Run it on your computer

Needs Node.js 22 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # checks copy, then writes the site to dist/
npm run preview    # serve dist/ locally
npm run lint
npm run test:worker
```

`npm run build` first runs `npm run check:content`, which fails if the Bangla and English copy ever get out of step (missing key, different list length, broken `{placeholder}`).

## 2. Publish on GitHub Pages

1. Create a repository on GitHub and push this folder to the `main` branch.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Every push to `main` now runs `.github/workflows/deploy.yml` (lint → tests → build → deploy). The address is shown in the workflow run, normally `https://YOUR-USERNAME.github.io/REPOSITORY/`.

The site uses relative paths (`base: './'`), so it works under a repository sub-path and on a custom domain (**Settings → Pages → Custom domain**) without any change.

## 3. Switch on Plant Doctor (the AI)

GitHub Pages is static, so an Anthropic API key can **never** go in this site. The photo is sent to a tiny Cloudflare Worker (`worker/`) that holds the key. Until the Worker is connected, Plant Doctor runs in **demo mode** and clearly labels its sample report as a demo — it never pretends to have analysed the photo.

One-time setup (free Cloudflare account + an Anthropic API key):

```bash
cd worker
# 1. in wrangler.toml set ALLOWED_ORIGINS to your site origin, e.g. https://YOUR-USERNAME.github.io
npx wrangler login
npx wrangler deploy
npx wrangler secret put ANTHROPIC_API_KEY      # paste the key; it is stored only in Cloudflare
```

Then in GitHub: **Settings → Secrets and variables → Actions → Variables → New repository variable**
`PLANT_DOCTOR_ENDPOINT` = the Worker address printed by `wrangler deploy` (`https://dhanshiri-plant-doctor.….workers.dev`), and re-run the workflow.
For local testing put the same address in a `.env.local` file: `VITE_PLANT_DOCTOR_ENDPOINT=https://…` (and add `http://localhost:5173` to `ALLOWED_ORIGINS`).

Good to know

- The Worker only answers requests whose `Origin` is in `ALLOWED_ORIGINS`, caps the photo size, treats the gardener's notes as data (not instructions) and never returns the key. `npm run test:worker` checks all of this against a mocked Anthropic API.
- Set a monthly spend limit in the Anthropic Console, and optionally add a Cloudflare rate-limiting rule (for example 10 requests per minute per IP) so the endpoint cannot be abused.
- The site shrinks every photo to at most 1024 px on its longest side before upload. Photos pass through Anthropic's API; the Worker stores nothing. Mention this in your privacy note if you publish one.
- The advice is guidance, not a certain diagnosis: results tell people to book an expert for severe cases, and the Worker never gives product brands or doses.
- The model defaults to `claude-sonnet-5-5`; change `MODEL` in `wrangler.toml` for any other Claude model that accepts images.

## 4. Make it yours — checklist

| What | Where | Notes |
| --- | --- | --- |
| **Amir Ali's portrait** and team photos | `src/assets/team/` | `amir-ali.jpg`, `horticulturist.jpg`, `architect.jpg`, `nurserymen.jpg`. Until added, illustrated placeholders show. Use real people only. |
| **Li Ador Noirrit** (Bangla display font) | `src/assets/fonts/` | Licensed by Lipighor, so the file is not in the repo. Add the Unicode `.woff2`/`.ttf` (see the README in that folder); until then Hind Siliguri is used. |
| **Social links** | `src/data/site.js` → `social` | Leave `''` and the icon hides itself. |
| **Phones, e-mail, WhatsApp, stats** | `src/data/site.js` | Stats are `3 years · 45+ projects · 30,000+ plants`. |
| **All wording (Bangla + English)** | `src/data/content.js` | Both languages share one structure; keep them in step (the build checks it). |
| **Photos in Projects / Gallery** | `src/data/images.js` | Currently free Pexels stock used as illustration. Replace with your own project photos, then set `illustrativePhotos: false` in `site.js` to remove the "illustrative photo" notes. |
| **Office addresses** | `content.js` → `contact` | Corporate office: ক-২৬/১ মহাখালী, ঢাকা ১২১২. Nursery: Sultanpur, Pandit Para, Naogaon Sadar 6500. |

## 5. Please confirm before launch

- **Care Plan inclusions** (Daily ৳1,199 · Monthly ৳4,499 · Half-yearly ৳24,999): prices and visit counts come from your brief; the longer inclusion lists are written to be realistic and should be checked by Mr. Amir Ali.
- **What "30,000+ plants" counts** (planted, supplied, or nursery stock) and what counts as a "project" — the site states them as given, nothing stronger.
- **Bangla copy** was written in the Bangla Academy register; a native proofreader should read it once, especially service names and plant terms.
- **Photos:** Pexels stock stands in for project photography and the images are loaded from Pexels' servers. Swap them for real work as it is photographed.
- **No claims beyond the facts supplied** (three years of experience; no "decades" or invented clients).

## 6. Project map

```
src/
  data/content.js        all Bangla + English copy
  data/site.js           contact details, stats, social links, Plant Doctor endpoint
  data/images.js         Pexels photo IDs used by Hero, Projects, Gallery
  components/sections/   Hero, Stats, Services, Rooftop, Lawn (+MowSlider), Projects, Gallery,
                         Process, CarePlans, About, Faq, Contact
  components/plant-doctor/   upload viewfinder, context form, scanning, report
  components/layout/     Navbar (services menu, language toggle), Footer, floating actions
  lib/                   locale, number formatting (Bangla digits), hooks, image resize, API client
worker/                  Cloudflare Worker for Plant Doctor (+ wrangler.toml)
scripts/                 check-content.mjs (copy parity), test-worker.mjs
.github/workflows/       deploy.yml (GitHub Pages)
```

Photo credit: [Pexels](https://www.pexels.com/) (free to use). Fonts: Inter, Bricolage Grotesque and Hind Siliguri are bundled via Fontsource (SIL Open Font Licence).
