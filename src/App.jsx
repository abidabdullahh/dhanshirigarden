import { Suspense, lazy } from 'react'
import { useLocale } from './lib/locale'
import { RouterProvider, useRouter } from './lib/router'
import { AtmosphereProvider } from './lib/AtmosphereProvider'
import { AuthProvider } from './lib/AuthContext'
import { CartProvider } from './lib/CartContext'
import CustomCursor from './components/dynamic/CustomCursor'
import NatureCanvas from './components/dynamic/NatureCanvas'
import FloatingActions from './components/layout/FloatingActions'
import CartDrawer from './components/layout/CartDrawer'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import LandscapeTransformation from './components/sections/LandscapeTransformation'
import Services from './components/sections/Services'
import LandscapeEstimator from './components/sections/LandscapeEstimator'
import LandscapeMaterials from './components/sections/LandscapeMaterials'
import Projects from './components/sections/Projects'
import Process from './components/sections/Process'
import Rooftop from './components/sections/Rooftop'
import Lawn from './components/sections/Lawn'
import IrrigationSimulator from './components/sections/IrrigationSimulator'
import CarePlans from './components/sections/CarePlans'
import About from './components/sections/About'
import Faq from './components/sections/Faq'
import Contact from './components/sections/Contact'
import { Container } from './components/ui/Section'

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
      <CartDrawer />

      <main id="main">
        {/* 1. Architectural Landscape Hero */}
        <Hero />

        {/* 2. Authority Stats & Credentials Strip */}
        <Stats />

        {/* 3. Before & After Architectural Transformation Showcase */}
        <LandscapeTransformation />

        {/* 4. 8 Specialized Landscaping Disciplines (Dossier & Grid) */}
        <Services />

        {/* 5. Interactive Landscaping Project BOM & Scope Estimator */}
        <LandscapeEstimator />

        {/* 6. Proven Materials & Craftsmanship Standards */}
        <LandscapeMaterials />

        {/* 7. Signature Real Projects Showcase (9 Categories) */}
        <Projects />

        {/* 8. 5-Stage Landscape Architectural Process */}
        <Process />

        {/* 9. Specialized Rooftop Ecosystems Engineering */}
        <Rooftop />

        {/* 10. Precision Turf & Carpet Grass Engineering */}
        <Lawn />

        {/* 11. Smart Weather-Synced Irrigation Simulator */}
        <section className="relative isolate overflow-hidden py-20 sm:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-10 -z-10 size-96 rounded-full bg-emerald/15 blur-3xl" />
          <Container>
            <IrrigationSimulator />
          </Container>
        </section>

        {/* 12. Commercial Maintenance, Stewardship & Care Plans */}
        <CarePlans />

        {/* 13. DAE Founder Authority & Heritage */}
        <About />

        {/* 14. Frequently Asked Architectural Questions */}
        <Faq />

        {/* 15. Direct Consultation Booking Center */}
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
  if (route === '/plant-doctor') {
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
  if (route === '/plant-wiki') {
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
            {/* Ambient Animated Cursor & Canvas Particles */}
            <CustomCursor />
            <NatureCanvas />

            <MainContent />
          </RouterProvider>
        </CartProvider>
      </AuthProvider>
    </AtmosphereProvider>
  )
}
