# Dhanshiri Garden — website (ধানসিঁড়ি গার্ডেন)

[![Live Website](https://img.shields.io/badge/Website-dhanshirigarden.com-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.dhanshirigarden.com)
[![GitHub Pages Deployment](https://img.shields.io/github/actions/workflow/status/abidabdullahh/dhanshirigarden/deploy.yml?branch=main&label=GitHub%20Pages&style=for-the-badge)](https://github.com/abidabdullahh/dhanshirigarden/actions/workflows/deploy.yml)

---

## 🌿 About Dhanshiri Garden

**Dhanshiri Garden (ধানসিঁড়ি গার্ডেন)** is a premier landscape architecture, urban rooftop gardening, and agricultural consulting service based in Bangladesh. Founded by **Mr. Amir Ali (জনাব আমির আলী)** — a Diploma Agronomist and former Sub-Assistant Agriculture Officer with the Department of Agricultural Extension (DAE) — Dhanshiri Garden connects decades of practical, field-level agronomy with modern landscape design.

Whether designing lush rooftop sanctuaries, manicuring green lawn turf, engineering vertical living walls, or diagnosing plant health issues with AI, our foundational philosophy remains simple: *plants should live, grow, and stay beautiful year after year.*

### 🔗 Direct Website Link
👉 **[https://www.dhanshirigarden.com](https://www.dhanshirigarden.com)**  
*(Alternative GitHub mirror: [https://abidabdullahh.github.io/dhanshirigarden/](https://abidabdullahh.github.io/dhanshirigarden/))*

---

## Key Highlights & Credentials

* **Founder:** Mr. Amir Ali (Diploma Agronomist · Former Sub-Assistant Agriculture Officer, DAE)
* **Track Record:** 3+ Years of Excellence · 45+ Completed Projects · 30,000+ Plants Supplied & Nurtured
* **Direct Contact:** 
  * 📞 Phone: `+880 1739-203981` / `+880 1759-592324`
  * 💬 WhatsApp: `+880 1739-203981`
  * ✉️ Email: `dhanshirigarden@gmail.com`
  * 🏢 Corporate Office: ক-২৬/১ মহাখালী, ঢাকা ১২১২
  * 🏡 Plant Nursery: Sultanpur, Pandit Para, Naogaon Sadar 6500

---

## 💻 Tech Stack & Architecture

Bilingual (Bangla default · English) responsive web application built for maximum speed and simplicity:
* **Frontend:** Vite · React 19 · Tailwind CSS v4 · lucide-react · Fontsource (Inter, Bricolage Grotesque, Hind Siliguri)
* **Hosting & CI/CD:** GitHub Pages with GitHub Actions (`.github/workflows/deploy.yml`), Custom Domain CNAME & Enforced HTTPS
* **AI Diagnostics Backend:** Cloudflare Worker proxy (`worker/plant-doctor-worker.js`) calling Anthropic Claude API for the "Plant Doctor" tool.

---

## 🛠️ Local Development

Needs Node.js 22 or newer.

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:5173)
npm run dev

# Run content parity check (Bangla vs English copy sync)
npm run check:content

# Run linter
npm run lint

# Run worker tests
npm run test:worker

# Build production bundle for static hosting (outputs to dist/)
npm run build
```

---

## 🚀 Deployment

The site deploys automatically to GitHub Pages on every push to the `main` branch via GitHub Actions.

* **Workflow configuration:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
* **Custom domain configuration:** [`public/CNAME`](public/CNAME) (`www.dhanshirigarden.com`)
* **Live Production URL:** [https://www.dhanshirigarden.com](https://www.dhanshirigarden.com)

---

Photo credit: [Pexels](https://www.pexels.com/) (free to use). Fonts: Inter, Bricolage Grotesque and Hind Siliguri are bundled via Fontsource (SIL Open Font Licence).
