# Dhanshiri Garden — website (ধানসিঁড়ি গার্ডেন)

[![Live Website](https://img.shields.io/badge/Website-dhanshirigarden.com-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.dhanshirigarden.com)
[![GitHub Pages Deployment](https://img.shields.io/github/actions/workflow/status/abidabdullahh/dhanshirigarden/deploy.yml?branch=main&label=GitHub%20Pages&style=for-the-badge)](https://github.com/abidabdullahh/dhanshirigarden/actions/workflows/deploy.yml)

🌐 **Live Website:** [https://www.dhanshirigarden.com](https://www.dhanshirigarden.com)  
*(Also accessible via GitHub Pages mirror: [https://abidabdullahh.github.io/dhanshirigarden/](https://abidabdullahh.github.io/dhanshirigarden/))*

Bilingual (Bangla default · English) website for **Dhanshiri Garden**, built as a static site and deployed automatically via **GitHub Pages** with custom domain & SSL.

* **Stack:** Vite · React 19 · Tailwind CSS v4 · lucide-react. No server, no database, no map.
* **Sections:** Hero · Stats · Services · Rooftop Garden · Lawn & Carpet Grass · Projects · Gallery · Process · Plant Doctor (AI) · Care Plans · About & Team · FAQ · Contact.

---

## About Dhanshiri Garden & Founder

**Founder & Chief Agronomy Consultant:** Mr. Amir Ali (জনাব আমির আলী)  
**Credentials:** Diploma Agronomist · Former Sub-Assistant Agriculture Officer, Department of Agricultural Extension  
**Official Website:** [https://www.dhanshirigarden.com](https://www.dhanshirigarden.com)  
**Email:** dhanshirigarden@gmail.com  
**Phone / WhatsApp:** +880 1739-203981  

> *"Plants should live, grow and stay beautiful year after year."*

Mr. Amir Ali brings decades of agronomic expertise and public-service experience with the Department of Agricultural Extension into homes, rooftops, and institutional landscapes across Bangladesh. Under his leadership, Dhanshiri Garden has delivered 45+ projects with over 30,000+ healthy plants supplied and cared for.

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

`npm run build` first runs `npm run check:content`, which verifies that the Bangla and English copy remain in exact parity (no missing keys, matching lists, valid `{placeholder}` tags).

---

## 2. Publish on GitHub Pages

The repository is configured for automated CI/CD using **GitHub Actions**:

1. Any push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
2. The workflow performs:
   - Dependency installation (`npm ci`)
   - Linting (`npm run lint`)
   - Worker tests (`npm run test:worker`)
   - Production build (`npm run build`)
   - Automatic deployment to GitHub Pages (`actions/deploy-pages@v4`)
3. The custom domain is preserved via [`public/CNAME`](public/CNAME) (`www.dhanshirigarden.com`) with automated HTTPS certificate issuance.

---

## 3. Switch on Plant Doctor (the AI)

GitHub Pages is static, so an Anthropic API key can **never** go directly into client-side code. The plant photo is sent to a Cloudflare Worker microservice located in [`worker/`](worker/) that safely holds the key.

> **Note:** Until the Worker is deployed, Plant Doctor runs in **demo mode** and clearly labels its sample report as a demonstration.

### One-time setup:

```bash
cd worker
# 1. in wrangler.toml set ALLOWED_ORIGINS to your site origin:
#    ALLOWED_ORIGINS = "https://www.dhanshirigarden.com,https://abidabdullahh.github.io"
npx wrangler login
npx wrangler deploy
npx wrangler secret put ANTHROPIC_API_KEY      # paste your Anthropic API key
```

Then in GitHub: **Settings → Secrets and variables → Actions → Variables → New repository variable**
* Name: `PLANT_DOCTOR_ENDPOINT`
* Value: The Worker address printed by `wrangler deploy` (e.g. `https://dhanshiri-plant-doctor.<subdomain>.workers.dev`)

---

## 4. Customization Checklist

| What | Where | Notes |
| --- | --- | --- |
| **Official Website URL** | `src/data/site.js` → `website` | Set to `https://www.dhanshirigarden.com`. |
| **Amir Ali's portrait** & team photos | `src/assets/team/` | `amir-ali.jpg`, `horticulturist.jpg`, `architect.jpg`, `nurserymen.jpg`. |
| **Social links** | `src/data/site.js` → `social` | Fill in URLs; leave `''` to hide an icon automatically. |
| **Contact numbers, email, stats** | `src/data/site.js` | Stats: `3 years · 45+ projects · 30,000+ plants`. |
| **All wording (Bangla + English)** | `src/data/content.js` | Both languages share one structure (enforced by `npm run check:content`). |
| **Photos in Projects / Gallery** | `src/data/images.js` | Replace Pexels placeholders with actual project photos. |
| **Office addresses** | `src/data/content.js` → `contact` | Corporate office: ক-২৬/১ মহাখালী, ঢাকা ১২১২. Nursery: Sultanpur, Pandit Para, Naogaon Sadar 6500. |

---

## 5. Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Pages deployment action
├── public/                        # Static assets (favicon, CNAME)
├── src/
│   ├── components/
│   │   ├── layout/               # Navbar, Footer, Floating Actions
│   │   ├── plant-doctor/         # AI diagnostic viewfinder, scanner & report
│   │   ├── sections/             # Hero, Stats, Services, About, etc.
│   │   └── ui/                   # Buttons, Doodles, Icons, Modal, Reveal
│   ├── data/
│   │   ├── content.js            # Bilingual copy (Bangla + English)
│   │   ├── images.js             # Photo registry
│   │   └── site.js               # Business information, website URLs, stats
│   └── lib/                      # Localization, formatters, API clients
├── worker/                       # Cloudflare Worker proxy for Anthropic API
└── scripts/                      # Content parity and worker test suites
```

Photo credit: [Pexels](https://www.pexels.com/) (free to use). Fonts: Inter, Bricolage Grotesque and Hind Siliguri are bundled via Fontsource (SIL Open Font Licence).
