import { useLocale } from './lib/locale'
import FloatingActions from './components/layout/FloatingActions'
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

export default function App() {
  const { t } = useLocale()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        {t.nav.skip}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <Services />
        <Rooftop />
        <Lawn />
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
      <FloatingActions />
    </>
  )
}
