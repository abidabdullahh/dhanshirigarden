import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import PlantDoctor from '../components/plant-doctor/PlantDoctor'
import { Container } from '../components/ui/Section'

export default function PlantDoctorPage() {
  const { t, lang } = useLocale()
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Breadcrumb Navigation */}
        <section className="pt-6 pb-4">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-forest/70">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 hover:text-emerald transition"
              >
                <ArrowLeft className="size-3.5" />
                <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/30" />
              <span className="text-emerald font-bold">{t.nav.plantDoctor}</span>
            </nav>
          </Container>
        </section>

        <PlantDoctor />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
