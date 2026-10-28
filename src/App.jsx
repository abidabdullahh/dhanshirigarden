import { Suspense, lazy } from 'react'
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
import PlantDoctor from './components/plant-doctor/PlantDoctor'

// Dynamic high-utility client features
import GardenStudio from './components/dynamic/GardenStudio'

// Code-split Dedicated Standalone Pages
const PlantDoctorPage = lazy(() => import('./pages/PlantDoctorPage'))
const PlantWikiPage = lazy(() => import('./pages/PlantWikiPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const StudioPage = lazy(() => import('./pages/StudioPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

function PageFallback() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 rounded-3xl glass-panel p-8 shadow-lift border border-white/85">
        <div className="size-9 rounded-full border-3 border-emerald/25 border-t-emerald animate-spin" />
        <span className="font-display text-xs font-bold uppercase tracking-wider text-forest">Dhanshiri Garden</span>
      </div>
    </div>
  )
}

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

        {/* Key USP: AI Plant Doctor Interactive Diagnostics Suite */}
        <PlantDoctor />

        {/* CAD Studio & Itemized BOQ Estimator */}
        <GardenStudio />

        {/* Focused Core Services */}
        <Services />

        {/* Engineering Deep Dives */}
        <Rooftop />
        <Lawn />

        {/* Real Signature Projects */}
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

  // Multi-Page Routes with Suspense
  if (route === '/services') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ServicesPage />
      </Suspense>
    )
  }
  if (route === '/studio') {
    return (
      <Suspense fallback={<PageFallback />}>
        <StudioPage />
      </Suspense>
    )
  }
  if (route === '/projects') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ProjectsPage />
      </Suspense>
    )
  }
  if (route === '/about') {
    return (
      <Suspense fallback={<PageFallback />}>
        <AboutPage />
      </Suspense>
    )
  }
  if (route === '/contact') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ContactPage />
      </Suspense>
    )
  }
  if (route === '/plant-doctor') {
    return (
      <Suspense fallback={<PageFallback />}>
        <PlantDoctorPage />
      </Suspense>
    )
  }
  if (route === '/plant-wiki') {
    return (
      <Suspense fallback={<PageFallback />}>
        <PlantWikiPage />
      </Suspense>
    )
  }
  if (route === '/blog') {
    return (
      <Suspense fallback={<PageFallback />}>
        <BlogPage />
      </Suspense>
    )
  }

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
