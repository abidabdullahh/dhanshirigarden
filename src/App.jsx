import { useLocale } from './lib/locale'
import { AtmosphereProvider } from './lib/AtmosphereProvider'
import CustomCursor from './components/dynamic/CustomCursor'
import NatureCanvas from './components/dynamic/NatureCanvas'
import FloatingDock from './components/layout/FloatingDock'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import About from './components/sections/About'
import CarePlans from './components/sections/CarePlans'
import Contact from './components/sections/Contact'
import Faq from './components/sections/Faq'
import Gallery from './components/sections/Gallery'
import Hero from './components/sections/Hero'
import Lawn from './components/sections/Lawn'
import Process from './components/sections/Process'
import Projects from './components/sections/Projects'
import Rooftop from './components/sections/Rooftop'
import Services from './components/sections/Services'
import Stats from './components/sections/Stats'
import PlantDoctor from './components/plant-doctor/PlantDoctor'
import Blog from './components/sections/Blog'

// New high-performance dynamic features
import WeatherAdvisory from './components/dynamic/WeatherAdvisory'
import GardenStudio from './components/dynamic/GardenStudio'
import GrowthSimulator from './components/dynamic/GrowthSimulator'
import BeforeAfterShowcase from './components/dynamic/BeforeAfterShowcase'
import PlantExplorer from './components/dynamic/PlantExplorer'

export default function App() {
  const { t } = useLocale()

  return (
    <AtmosphereProvider>
      <NatureCanvas />
      <CustomCursor />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        {t.nav.skip}
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <WeatherAdvisory />
        <Stats />
        <GardenStudio />
        <Services />
        <Rooftop />
        <Lawn />
        <GrowthSimulator />
        <BeforeAfterShowcase />
        <PlantExplorer />
        <Projects />
        <Gallery />
        <Process />
        <PlantDoctor />
        <Blog />
        <CarePlans />
        <About />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <FloatingDock />
    </AtmosphereProvider>
  )
}
