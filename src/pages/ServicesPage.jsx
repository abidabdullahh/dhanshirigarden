import { ArrowLeft, ChevronRight, Compass, Layers, Phone, ShieldCheck } from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import Services from '../components/sections/Services'
import Rooftop from '../components/sections/Rooftop'
import Lawn from '../components/sections/Lawn'
import CarePlans from '../components/sections/CarePlans'
import Button from '../components/ui/Button'
import { Container } from '../components/ui/Section'
import { site } from '../data/site'
import { getWhatsAppLink } from '../lib/whatsapp'

export default function ServicesPage() {
  const { t, lang } = useLocale()
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero & Breadcrumb */}
        <section className="relative isolate overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 -z-10 size-96 rounded-full bg-emerald/15 blur-3xl" />

          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-forest/70">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 hover:text-emerald transition"
              >
                <ArrowLeft className="size-3.5" />
                <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/30" />
              <span className="text-emerald font-bold">{t.nav.services}</span>
            </nav>

            <div className="rounded-3xl glass-panel p-8 sm:p-12 shadow-lift border border-white/85">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-4">
                <Layers className="size-4 text-emerald" />
                {lang === 'bn' ? 'বিজ্ঞানসম্মত কৃষি ও ল্যান্ডস্কেপিং' : 'Science-First Agronomic Landscaping'}
              </span>
              <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-forest leading-tight">
                {lang === 'bn' ? 'আমাদের বিশেষায়িত সেবাসমূহ' : 'Our Specialized Agronomic Services'}
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-charcoal/80 leading-relaxed">
                {lang === 'bn'
                  ? 'ছাদবাগান, কার্পেট ঘাসের লন, স্মার্ট স্বয়ংক্রিয় সেচ ও ভার্টিক্যাল গ্রিন ওয়াল — প্রতিটি প্রকল্প ডিএই সনদপ্রাপ্ত কৃষিবিদের তত্ত্বাবধানে নিখুঁত ও দীর্ঘস্থায়ীভাবে নির্মিত।'
                  : 'Rooftop ecosystems, precision-carpet turf lawns, automated micro-drip irrigation, and living vertical gardens — engineered under certified agronomist supervision.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('services')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lift hover:bg-emerald transition"
                >
                  {lang === 'bn' ? 'সকল সেবা এক্সপ্লোর করুন' : 'Explore All Services'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/studio')}
                  className="inline-flex items-center gap-2 rounded-full glass-card px-5 py-2.5 text-xs sm:text-sm font-bold text-forest hover:bg-white transition border border-white/80"
                >
                  <Compass className="size-4 text-emerald" />
                  <span>{lang === 'bn' ? 'ক্যাড স্টুডিও ও খরচ হিসাব' : 'CAD Studio & BOQ Estimator'}</span>
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* 1. Core Services Catalog */}
        <Services />

        {/* 2. Deep Dive: Rooftop Agriculture & Waterproofing */}
        <Rooftop />

        {/* 3. Deep Dive: Precision Turf & Lawn Engineering */}
        <Lawn />

        {/* 4. Commercial Maintenance & Care Plans */}
        <CarePlans />

        {/* Consultation Call to Action */}
        <section className="relative isolate overflow-hidden py-16">
          <Container>
            <div className="rounded-3xl glass-emerald p-8 sm:p-12 text-white shadow-lift border border-white/20 text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="size-4 text-bright" />
                {lang === 'bn' ? 'বিনামূল্যে সাইট ভিজিত ও মূল্যায়ন' : 'Complimentary Site Audit'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'bn'
                  ? 'আপনার বাড়ির ছাদ বা আঙিনা সাজাতে প্রস্তুত?'
                  : 'Ready to Transform Your Rooftop or Yard?'}
              </h2>
              <p className="mt-3 text-white/85 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                {lang === 'bn'
                  ? 'আমাদের প্রধান কৃষিবিদ জনাব আমির আলীর সাথে সরাসরি কথা বলুন এবং মাটির উপযোগিতা ও কাঠামোগত সক্ষমতা যাচাই করুন।'
                  : 'Consult directly with Lead Agronomist Mr. Amir Ali to audit soil feasibility, roof load tolerances, and sunlight dynamics.'}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  href={getWhatsAppLink(null, null, lang)}
                  variant="primary"
                  size="lg"
                  className="bg-white text-forest hover:bg-cream"
                >
                  {t.actions.bookWhatsapp}
                </Button>
                <Button
                  href={`tel:${site.phones[0].tel}`}
                  variant="glass"
                  size="lg"
                  icon={Phone}
                  className="text-white border-white/40 hover:bg-white/20"
                >
                  {t.actions.callNow}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
