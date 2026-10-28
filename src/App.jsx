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

// Dynamic high-utility client features
import GardenStudio from './components/dynamic/GardenStudio'
import GrowthSimulator from './components/dynamic/GrowthSimulator'
import BeforeAfterShowcase from './components/dynamic/BeforeAfterShowcase'

// Dedicated Standalone Pages
import PlantDoctorPage from './pages/PlantDoctorPage'
import BlogPage from './pages/BlogPage'
import ServicesPage from './pages/ServicesPage'
import StudioPage from './pages/StudioPage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function HomePage() {
  const { t } = useLocale()

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
        {/* Hero with blurred video background + climate bulletin */}
        <Hero />

        {/* Core Credentials & Authority Stats */}
        <Stats />

        {/* CAD Studio & Itemized BOQ Estimator */}
        <GardenStudio />

        {/* Focused Core Services */}
        <Services />

        {/* Engineering Deep Dives */}
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

function MainContent() {
  const { route } = useRouter()

  // Multi-Page Routes
  if (route === '/services') return <ServicesPage />
  if (route === '/studio') return <StudioPage />
  if (route === '/projects') return <ProjectsPage />
  if (route === '/about') return <AboutPage />
  if (route === '/contact') return <ContactPage />
  if (route === '/plant-doctor') return <PlantDoctorPage />
  if (route === '/blog') return <BlogPage />

  // Default Route: Home Landing Page
  return <HomePage />
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
