import { useLocale } from './lib/locale'
import { RouterProvider, useRouter } from './lib/router'
import { AtmosphereProvider } from './lib/AtmosphereProvider'
import CustomCursor from './components/dynamic/CustomCursor'
import NatureCanvas from './components/dynamic/NatureCanvas'
import FloatingActions from './components/layout/FloatingActions'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import About from './components/sections/About'
import CarePlans from './components/sections/CarePlans'
import Contact from './components/sections/Contact'
import Faq from './components/sections/Faq'
import Hero from './components/sections/Hero'
import Lawn from './components/sections/Lawn'
import Projects from './components/sections/Projects'
import Rooftop from './components/sections/Rooftop'
import Services from './components/sections/Services'
import Stats from './components/sections/Stats'

// High-utility client features
import GardenStudio from './components/dynamic/GardenStudio'
import GrowthSimulator from './components/dynamic/GrowthSimulator'
import BeforeAfterShowcase from './components/dynamic/BeforeAfterShowcase'

// Dedicated Pages (Separated with permalinks)
import PlantDoctorPage from './pages/PlantDoctorPage'
import BlogPage from './pages/BlogPage'

function MainContent() {
  const { t } = useLocale()
  const { route } = useRouter()

  // Route 1: Standalone Plant Doctor AI Diagnostic Suite
  if (route === '/plant-doctor') {
    return <PlantDoctorPage />
  }

  // Route 2: Standalone Agronomy Blog & Guides Collection
  if (route === '/blog') {
    return <BlogPage />
  }

  // Route 3: Main Landing Page (Clean, Swiss Architectural Layout)
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-forest focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        {t.nav.skip}
      </a>

      <Navbar />

      <main id="main">
        {/* Hero with blurred video background + integrated compact climate bulletin */}
        <Hero />

        {/* Core Credentials & Authority Stats */}
        <Stats />

        {/* Swiss Architectural CAD Studio & Itemized BOQ Estimator */}
        <GardenStudio />

        {/* Focused Core Services (No respecialties clutter) */}
        <Services />

        {/* Engineering Sections */}
        <Rooftop />
        <Lawn />

        {/* Visual Proof: Transformations & Growth */}
        <BeforeAfterShowcase />
        <GrowthSimulator />
        <Projects />

        {/* Commercial Care & Trust */}
        <CarePlans />
        <About />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <FloatingActions />
    </>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <AtmosphereProvider>
        <NatureCanvas />
        <CustomCursor />
        <MainContent />
      </AtmosphereProvider>
    </RouterProvider>
  )
}
