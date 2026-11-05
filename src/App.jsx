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
import IrrigationSimulator from './components/sections/IrrigationSimulator'
import { Container } from './components/ui/Section'

// Code-split Dedicated Standalone Pages
const StorePage = lazy(() => import('./pages/StorePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))

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
        {/* Hero with blurred background & climate bulletin */}
        <Hero />

        {/* Core Credentials & Authority Stats */}
        <Stats />

        {/* Focused Core Services */}
        <Services />

        {/* Engineering Deep Dives */}
        <Rooftop />
        <Lawn />

        {/* Interactive Smart Irrigation Simulation with expanded whitespace */}
        <section className="relative isolate overflow-hidden py-20 sm:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-10 -z-10 size-96 rounded-full bg-emerald/15 blur-3xl" />
          <Container>
            <IrrigationSimulator />
          </Container>
        </section>

        {/* Real Signature Projects Showcase (All 9 types) */}
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

  // Default Route: Home Landing Page
  return <HomePage />
}

export default function App() {
  return (
    <RouterProvider>
      <AtmosphereProvider>
        <AuthProvider>
          <CartProvider>
            <NatureCanvas />
            <CustomCursor />
            <CartDrawer />
            <MainContent />
          </CartProvider>
        </AuthProvider>
      </AtmosphereProvider>
    </RouterProvider>
  )
}
