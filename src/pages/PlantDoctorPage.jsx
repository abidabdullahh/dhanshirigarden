import { ArrowLeft } from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Logo from '../components/ui/Logo'
import LangToggle from '../components/ui/LangToggle'
import PlantDoctor from '../components/plant-doctor/PlantDoctor'
import Footer from '../components/layout/Footer'

export default function PlantDoctorPage() {
  const { lang } = useLocale()
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-cream">
      {/* Swiss Style Sub-Page Header */}
      <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-semibold text-forest hover:text-emerald transition"
          >
            <ArrowLeft className="size-4" />
            <span>{lang === 'bn' ? 'প্রচ্ছদে ফিরে যান' : 'Back to Home'}</span>
          </button>

          <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <Logo />
          </a>

          <div className="flex items-center gap-2">
            <LangToggle />
          </div>
        </div>
      </header>

      <main className="py-8 sm:py-12">
        <PlantDoctor />
      </main>

      <Footer />
    </div>
  )
}
