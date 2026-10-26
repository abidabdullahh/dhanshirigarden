import { Calculator, Clock, MapPin, MessageCircle, ScanSearch, Sprout } from 'lucide-react'
import { photos } from '../../data/images'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { LeafDoodle, PlanTree, ScissorsDoodle, SproutDoodle, SunDoodle } from '../ui/Doodles'
import Img from '../ui/Img'
import { Container } from '../ui/Section'

/** A vine that grows up the left edge of the headline, then pops its leaves in. Runs once. */
function HeadlineVine() {
  const leaves = [
    { bottom: 8, rotate: 18, delay: 0.9 },
    { bottom: 30, rotate: -10, delay: 1.25 },
    { bottom: 52, rotate: 24, delay: 1.6 },
    { bottom: 74, rotate: -6, delay: 1.95 },
  ]
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-y-1 left-0 w-9 sm:w-11">
      <svg
        className="absolute inset-0 h-full w-full animate-[vine-grow_1.7s_ease-out_0.4s_both] overflow-visible"
        viewBox="0 0 40 100"
        preserveAspectRatio="none"
      >
        <path
          d="M8 100C0 88 18 78 8 66S0 42 8 30S18 10 8 0"
          fill="none"
          stroke="#2d6a4f"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {leaves.map((leaf, index) => (
        <LeafDoodle
          key={index}
          className="absolute left-2.5 size-6 animate-grow text-emerald sm:size-7"
          style={{ bottom: `${leaf.bottom}%`, rotate: `${leaf.rotate}deg`, animationDelay: `${leaf.delay}s`, transformOrigin: '0% 100%' }}
        />
      ))}
    </span>
  )
}

function HeroCollage() {
  const { t } = useLocale()
  return (
    <div className="enter relative mx-auto aspect-[4/5] w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-none" style={{ '--d': '0.2s' }}>
      <div className="absolute inset-y-0 right-0 w-[80%] overflow-hidden bg-mint shadow-lift ring-8 ring-white/70 leaf-a">
        <Img photo={photos.sunnyPath} width={1000} sizes="(min-width: 1024px) 34vw, 80vw" priority />
      </div>

      <div className="absolute bottom-[5%] left-0 aspect-square w-[46%] animate-float-slow overflow-hidden bg-mint shadow-lift ring-8 ring-white/80 leaf-b">
        <Img photo={photos.greenWall} width={600} sizes="(min-width: 1024px) 16vw, 40vw" priority />
      </div>

      <div
        className="absolute left-[4%] top-[6%] size-[27%] animate-float overflow-hidden rounded-full bg-mint shadow-soft ring-4 ring-white"
        style={{ '--r': '0deg' }}
      >
        <Img photo={photos.mowerClose} width={400} sizes="(min-width: 1024px) 10vw, 25vw" priority />
      </div>

      <a
        href="#plant-doctor"
        className="group absolute -right-1 bottom-[17%] flex rotate-3 items-center gap-3 rounded-3xl glass-card p-3 pr-5 shadow-lift transition duration-300 hover:-translate-y-1 hover:rotate-0 sm:-right-4"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest text-white">
          <ScanSearch className="size-6 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        </span>
        <span className="flex flex-col leading-tight">
          <strong className="font-display text-[1.02rem] text-forest">{t.hero.badgeTitle}</strong>
          <span className="text-[0.8rem] text-forest/75">{t.hero.badgeSub}</span>
        </span>
      </a>

      <ScissorsDoodle className="absolute -top-3 right-[14%] size-14 -rotate-12 animate-float text-forest sm:size-16" style={{ '--r': '-12deg' }} />
      <SunDoodle className="absolute -left-2 top-[38%] hidden size-12 animate-spin-slow text-bloom sm:block" />
      <SproutDoodle className="absolute -bottom-3 right-[30%] size-12 animate-sway text-emerald" />
    </div>
  )
}

export default function Hero() {
  const { t, lang } = useLocale()
  const copy = t.hero
  const titleSize = lang === 'bn' ? 'text-[clamp(2.15rem,5vw,3.8rem)]' : 'text-[clamp(2.05rem,4.5vw,3.5rem)]'

  return (
    <section id="top" className="relative isolate overflow-hidden pb-28 pt-28 sm:pt-32 lg:pb-32 lg:pt-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blueprint-grid [mask-image:linear-gradient(to_bottom,black_30%,transparent_92%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 mesh-glow" />
      <PlanTree className="absolute -left-16 top-44 -z-10 size-72 text-forest/[0.09]" />
      <PlanTree className="absolute -right-24 bottom-6 -z-10 size-[26rem] text-forest/[0.08]" lobes={11} />

      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="enter inline-flex items-center gap-2 rounded-full glass-green px-4 py-2 text-sm font-semibold text-forest">
            <MapPin className="size-4 text-emerald" aria-hidden="true" />
            {copy.eyebrow}
          </p>

          <h1 className={`enter relative mt-6 pl-10 sm:pl-14 ${titleSize}`} style={{ '--d': '0.08s' }}>
            <HeadlineVine />
            {copy.titleBefore}
            <span className="whitespace-nowrap">
              {copy.titleHighlight}
              <SproutDoodle
                className="ml-1.5 inline-block size-[0.78em] animate-grow align-[-0.08em] text-emerald"
                style={{ animationDelay: '1.5s', transformOrigin: '50% 100%' }}
              />
            </span>
            {copy.titleAfter}
          </h1>

          <p
            className="enter mt-6 max-w-xl pl-10 text-base leading-body text-charcoal/80 sm:pl-14 sm:text-lg"
            style={{ '--d': '0.2s' }}
          >
            {copy.sub}
          </p>

          <div className="enter mt-8 flex flex-wrap gap-3 pl-10 sm:pl-14" style={{ '--d': '0.3s' }}>
            <Button href={getWhatsAppLink(null, null, lang)} size="lg" icon={MessageCircle}>
              {copy.ctaPrimary}
            </Button>
            <Button href="#estimator" variant="glass" size="lg" icon={Calculator}>
              {t.nav.estimator}
            </Button>
            <Button href="#care-plans" variant="outline" size="lg">
              {copy.ctaSecondary}
            </Button>
          </div>

          <div
            className="enter mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 pl-10 text-sm text-forest/80 sm:pl-14"
            style={{ '--d': '0.4s' }}
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-emerald">
                <Sprout className="size-4" aria-hidden="true" />
              </span>
              <span className="max-w-sm leading-snug">{copy.founderLine}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 ring-1 ring-forest/10">
              <Clock className="size-4 text-emerald" aria-hidden="true" />
              {copy.chipReply}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroCollage />
        </div>
      </Container>
    </section>
  )
}
