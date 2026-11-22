import { Suspense, lazy } from 'react'
import { useLocale } from './lib/locale'
import { RouterProvider, useRouter } from './lib/router'
import { AtmosphereProvider } from './lib/AtmosphereProvider'
import { AuthProvider } from './lib/AuthContext'
import { CartProvider } from './lib/CartContext'
import CartDrawer from './components/layout/CartDrawer'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import IrrigationAutomationEngine from './components/sections/IrrigationAutomationEngine'
import LawnMowerEngine from './components/sections/LawnMowerEngine'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import DynamicNursery from './components/sections/DynamicNursery'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

// Code-split Dedicated Standalone Pages
const StorePage = lazy(() => import('./pages/StorePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const ToolkitPage = lazy(() => import('./pages/ToolkitPage'))
const PlantDoctorPage = lazy(() => import('./pages/PlantDoctorPage'))
const StudioPage = lazy(() => import('./pages/StudioPage'))
const PlantWikiPage = lazy(() => import('./pages/PlantWikiPage'))

function PageFallback() {
  return (
    <div className="min-h-screen bg-[#FCFCFA] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 p-8">
        <div className="size-8 rounded-full border-2 border-forest/20 border-t-forest animate-spin" />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-forest/70">
          DHANSHIRI GARDEN
        </span>
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
      <CartDrawer />

      <main id="main">
        {/* 1. 3D Glassmorphic Architectural Hero */}
        <Hero />

        {/* 2. Flagship Irrigation Automation Engine */}
        <IrrigationAutomationEngine />

        {/* 3. Flagship Bermuda Lawn Mower Engine */}
        <LawnMowerEngine />

        {/* 4. Six Core Architectural Disciplines (01-06) */}
        <Services />

        {/* 5. Selected Works / Curated Portfolio Showcase */}
        <Projects />

        {/* 6. Dynamic Botanical Specimen Nursery */}
        <DynamicNursery />

        {/* 7. About & DAE Agronomic Heritage */}
        <About />

        {/* 8. Direct Commission & Site Consultation */}
        <Contact />
      </main>

      <Footer />
    </>
  )
}

function MainContent() {
  const { route } = useRouter()

  // Standalone Routes
  if (route === '/store') {
    return (
      <Suspense fallback={<PageFallback />}>
        <StorePage />
      </Suspense>
    )
  }
  if (route === '/services') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ServicesPage />
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
  if (route === '/admin') {
    return (
      <Suspense fallback={<PageFallback />}>
        <AdminPage />
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
  if (route === '/toolkit') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ToolkitPage />
      </Suspense>
    )
  }
  if (route === '/plant-doctor' || route === '/doctor') {
    return (
      <Suspense fallback={<PageFallback />}>
        <PlantDoctorPage />
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
  if (route === '/plant-wiki' || route === '/wiki') {
    return (
      <Suspense fallback={<PageFallback />}>
        <PlantWikiPage />
      </Suspense>
    )
  }

  // Default Single-Page Application (Home)
  return <HomePage />
}

export default function App() {
  return (
    <AtmosphereProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider>
            <MainContent />
          </RouterProvider>
        </CartProvider>
      </AuthProvider>
    </AtmosphereProvider>
  )
}
