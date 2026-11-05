import { ArrowLeft, ChevronRight, LayoutGrid, Sparkles } from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import CartDrawer from '../components/layout/CartDrawer'
import Projects from '../components/sections/Projects'
import Button from '../components/ui/Button'
import { Container } from '../components/ui/Section'
import { getWhatsAppLink } from '../lib/whatsapp'

export default function ProjectsPage() {
  const { t, lang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 pt-24 pb-20">
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
                <span>{isBn ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/30" />
              <span className="text-emerald font-bold">{isBn ? 'প্রকল্প চিত্রশালা' : 'Projects Showcase'}</span>
            </nav>

            <div className="rounded-3xl glass-panel p-8 sm:p-14 shadow-lift border border-white/85">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-4">
                <LayoutGrid className="size-4 text-emerald" />
                {isBn ? 'বাস্তবায়িত প্রকল্পের পূর্ণাঙ্গ দলিল' : 'Executed Living Case Studies'}
              </span>
              <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-forest leading-tight">
                {isBn ? 'আমাদের সেরা ল্যান্ডস্কেপ ও ছাদবাগান প্রকল্প' : 'Signature Projects & Proven Transformations'}
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-charcoal/80 leading-relaxed">
                {isBn
                  ? 'ঢাকা, নওগাঁ ও গাজীপুরের বিভিন্ন আবাসিক, কর্পোরেট, ভেলভেট লন, কার্টেন ক্রিপার, বাঁশের প্রাচীর ও ওয়াটারবডির প্রজেক্ট চিত্রশালা।'
                  : 'A curated showcase of residential rooftops, corporate headquarters, curtain creepers, bamboo walls, and waterbodies built with agronomic integrity.'}
              </p>
            </div>
          </Container>
        </section>

        {/* 1. Projects Gallery Section with all 9 Categories */}
        <Projects />

        {/* Bottom CTA with Whitespace */}
        <section className="relative isolate overflow-hidden py-24 sm:py-32">
          <Container>
            <div className="rounded-3xl glass-panel p-8 sm:p-14 shadow-lift border border-white/85 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1 text-xs font-bold text-emerald uppercase tracking-wider mb-3">
                <Sparkles className="size-3.5" />
                {isBn ? 'পরবর্তী প্রকল্পটি হোক আপনার' : 'Let Your Space Be Next'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                {isBn
                  ? 'আপনার আঙিনা, ব্যালকনি বা ছাদকে সবুজে সাজাতে চান?'
                  : 'Envisioning a Green Sanctuary in Your Space?'}
              </h2>
              <p className="mt-3 text-charcoal/80 text-sm sm:text-base leading-relaxed">
                {isBn
                  ? 'আমির আলীর ধানসিঁড়ি গার্ডেন টিম আপনার ড্রিম গার্ডেন বাস্তবে রূপ দিতে সদা প্রস্তুত।'
                  : 'Book a site visit today and get an engineered proposal tailored to your sunlight and architecture.'}
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <Button href={getWhatsAppLink(null, null, lang)} variant="primary" size="lg">
                  {t.actions.bookWhatsapp}
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
