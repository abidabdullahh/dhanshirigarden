import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CartDrawer from '../components/layout/CartDrawer'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'
import { Container } from '../components/ui/Section'

export default function AboutPage() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-[#FCFCFA] text-charcoal flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 pt-24 sm:pt-32">
        {/* Page Header */}
        <section className="py-16 sm:py-24 border-b border-black/[0.06]">
          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs font-mono text-charcoal/50">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="hover:text-forest transition"
              >
                {isBn ? 'প্রচ্ছদ' : 'HOME'}
              </button>
              <span>/</span>
              <span className="text-forest font-semibold">{isBn ? 'অ্যাটেলিয়ার' : 'THE ATELIER'}</span>
            </nav>

            <div className="max-w-4xl">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-emerald block mb-4">
                {isBn ? 'ঐতিহ্য ও বিজ্ঞান' : 'HERITAGE & SCIENTIFIC AGRONOMY'}
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-light tracking-[-0.035em] text-forest leading-[1.05]">
                {isBn ? 'ধানসিঁড়ি অ্যাটেলিয়ার ও মৃত্তিকা বিজ্ঞান' : 'The Atelier & Living Soil Science'}
              </h1>
              <p className="mt-6 text-base sm:text-xl text-charcoal/70 font-light leading-relaxed max-w-2xl">
                {isBn
                  ? 'কৃষি সম্প্রসারণ অধিদপ্তরের (ডিএই) সাবেক কর্মকর্তা জনাব আমির আলীর হাত ধরে প্রতিষ্ঠিত বৈজ্ঞানিক ল্যান্ডস্কেপিং অ্যাটেলিয়ার।'
                  : 'Founded by former DAE officer Mr. Amir Ali to unify rigorous soil chemistry with contemporary landscape architecture.'}
              </p>
            </div>
          </Container>
        </section>

        {/* About Section */}
        <About />

        {/* Direct Contact */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
