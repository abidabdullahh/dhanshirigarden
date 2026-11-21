import { useState, useRef, useCallback } from 'react'
import {
  ArrowRight,
  Building2,
  ChevronsLeftRight,
  Sparkles,
} from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { Container, Section, SectionHeading } from '../ui/Section'

const TRANSFORMATION_CASES = [
  {
    id: 'rooftop',
    title: {
      bn: 'গুলশান লেকভিউ এস্টেট — আরবান রুফটপ স্যাঙ্কচুয়ারি',
      en: 'Gulshan Lakeview Estate — Urban Rooftop Sanctuary',
    },
    location: { bn: 'গুলশান ২, ঢাকা', en: 'Gulshan-2, Dhaka' },
    area: '২,৮০০ বর্গফুট (2,800 sq ft)',
    stat: { bn: '-৪.৮° সে. ছাদের তাপমাত্রা হ্রাস', en: '-4.8°C Rooftop Slab Temp Drop' },
    engineering: {
      bn: '৭-লেয়ার ওয়াটারপ্রুফিং, লাইটওয়েট পারলাইট গ্রোয়িং মিডিয়া, ড্রিপ সেচ ও সেগুন কাঠের পারগোলা',
      en: '7-layer elastomeric waterproofing, lightweight volcanic substrate, drip irrigation & teak pergola',
    },
    beforePhoto: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200',
    afterPhoto: 'https://images.pexels.com/photos/19053055/pexels-photo-19053055.jpeg?auto=compress&cs=tinysrgb&w=1200',
    beforeLabel: { bn: 'কাজের পূর্বে: রুক্ষ কংক্রিট স্ল্যাব', en: 'Before: Bare Concrete Slab' },
    afterLabel: { bn: 'কাজের পরে: বায়োফিলিক গ্রিন লাউঞ্জ', en: 'After: Biophilic Green Lounge' },
  },
  {
    id: 'lawn',
    title: {
      bn: 'বনানী পার্ক লেন ভিলা — কোরিয়ান ভেলভেট কার্পেট লন',
      en: 'Banani Park Lane Villa — Korean Velvet Carpet Turf Lawn',
    },
    location: { bn: 'বনানী রোড ১১, ঢাকা', en: 'Banani Road 11, Dhaka' },
    area: '৩,৫০০ বর্গফুট (3,500 sq ft)',
    stat: { bn: '১০০% মসৃণ ও স্বয়ংক্রিয় ড্রেনেজ', en: '100% Laser-Graded & Sub-Drainage' },
    engineering: {
      bn: 'লেজার লেভেলিং, সিলেট স্যান্ডস্টোন স্টেপিং পেভার্স, অ্যান্ড ড্রেনেজ গ্রাভেল সাব-বেস',
      en: 'Laser levelling, Sylhet sandstone stepping stones, and gravel sub-base drainage',
    },
    beforePhoto: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1200',
    afterPhoto: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=1200',
    beforeLabel: { bn: 'কাজের পূর্বে: অমসৃণ কর্দমাক্ত মাটি', en: 'Before: Uneven Muddy Soil' },
    afterLabel: { bn: 'কাজের পরে: গল্ফ-গ্রীন মখমল লন', en: 'After: Golf-Grade Velvet Lawn' },
  },
  {
    id: 'vertical',
    title: {
      bn: 'বসুন্ধরা কনকর্ড হেডকোয়ার্টার্স — লিভিং গ্রিন ওয়াল',
      en: 'Bashundhara Concord HQ — Biophilic Living Green Wall',
    },
    location: { bn: 'বসুন্ধরা আ/এ, ঢাকা', en: 'Bashundhara R/A, Dhaka' },
    area: '১,২০০ বর্গফুট (1,200 sq ft)',
    stat: { bn: 'শব্দ নিরোধক ও বায়ু পরিশোধক', en: 'Acoustic Buffer & Air Purifying' },
    engineering: {
      bn: 'সেলফ-ওয়াটারিং হাইড্রো-ম্যাট্রিক্স, ড্রেন চ্যানেল ও ৮ জাতের ছায়াপ্রেমী এয়ার-পিউরিফায়ার',
      en: 'Self-watering hydro-matrix, drain channels, and 8 shade-tolerant air-purifying varieties',
    },
    beforePhoto: 'https://images.pexels.com/photos/220444/pexels-photo-220444.jpeg?auto=compress&cs=tinysrgb&w=1200',
    afterPhoto: 'https://images.pexels.com/photos/34968591/pexels-photo-34968591.jpeg?auto=compress&cs=tinysrgb&w=1200',
    beforeLabel: { bn: 'কাজের পূর্বে: রসহীন ধূসর দেয়াল', en: 'Before: Blank Industrial Wall' },
    afterLabel: { bn: 'কাজের পরে: জীবন্ত বায়োফিলিক দেয়াল', en: 'After: Living Biophilic Wall' },
  },
]

export default function LandscapeTransformation() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const [activeTab, setActiveTab] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const activeCase = TRANSFORMATION_CASES[activeTab]

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handleTouchMove = (e) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  return (
    <Section id="transformation" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Background glow atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/4 -z-10 size-[32rem] rounded-full bg-emerald/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 size-[32rem] rounded-full bg-bloom/15 blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow={isBn ? 'সরাসরি স্থাপত্য রূপান্তর' : 'Direct Architectural Transformation'}
          icon={Sparkles}
          title={isBn ? 'কাজের পূর্বে ও পরে রূপান্তরের জাদু' : 'Before & After: Engineering Nature from Scratch'}
          sub={
            isBn
              ? 'স্লাইডারটি ডানে-বামে টেনে দেখুন কীভাবে একটি রুক্ষ কংক্রিট ছাদ বা অনুৎপাদনশীল প্রাঙ্গণ রূপ নেয় একটি জীবন্ত স্থাপত্যে।'
              : 'Slide across to see how barren concrete slabs and uneven grounds transform into world-class living landscapes.'
          }
        />

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {TRANSFORMATION_CASES.map((item, idx) => {
            const isActive = activeTab === idx
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(idx)
                  setSliderPos(50)
                }}
                className={`group flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-forest text-white shadow-lift scale-105'
                    : 'glass-card text-forest hover:bg-white hover:border-emerald/40'
                }`}
              >
                <span className={`size-2 rounded-full ${isActive ? 'bg-bright animate-pulse' : 'bg-forest/30'}`} />
                <span>{item.title[lang] || item.title.en}</span>
              </button>
            )
          })}
        </div>

        {/* Interactive Before/After Split Viewer */}
        <div className="rounded-3xl glass-panel p-4 sm:p-8 shadow-lift border border-white/85">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl select-none cursor-ew-resize shadow-inner bg-charcoal/10"
          >
            {/* AFTER IMAGE (Full Base Layer) */}
            <img
              src={activeCase.afterPhoto}
              alt={activeCase.afterLabel[lang]}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />

            {/* BEFORE IMAGE (Clipped Layer via High-Performance clip-path) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={activeCase.beforePhoto}
                alt={activeCase.beforeLabel[lang]}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            {/* Split Divider Line & Floating Draggable Handle */}
            <div
              className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -left-5 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-forest text-white shadow-lift ring-4 ring-white/90">
                <ChevronsLeftRight className="size-5 text-bright animate-pulse" />
              </div>
            </div>

            {/* Floating Badges on Top Corners */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-soft">
                <span className="size-2 rounded-full bg-alert" />
                <span>{activeCase.beforeLabel[lang]}</span>
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/85 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-soft">
                <span className="size-2 rounded-full bg-bright animate-pulse" />
                <span>{activeCase.afterLabel[lang]}</span>
              </span>
            </div>

            {/* Bottom Floating Stats Pill */}
            <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:left-4 z-20 pointer-events-none">
              <div className="rounded-xl bg-forest/90 backdrop-blur-md px-4 py-2 text-white shadow-lift border border-white/20">
                <p className="text-xs font-mono uppercase tracking-wider text-bright">
                  {isBn ? 'প্রকৌশলগত অর্জন' : 'ARCHITECTURAL OUTCOME'}
                </p>
                <p className="font-display text-sm sm:text-base font-bold text-white">
                  {activeCase.stat[lang]}
                </p>
              </div>
            </div>
          </div>

          {/* Transformation Details & Specification Bar */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald font-bold uppercase tracking-wider">
                <Building2 className="size-3.5" />
                <span>{activeCase.location[lang]}</span>
                <span className="text-forest/30">|</span>
                <span>{activeCase.area}</span>
              </div>
              <h4 className="font-display text-lg sm:text-xl font-bold text-forest mt-1">
                {activeCase.title[lang]}
              </h4>
              <p className="text-xs sm:text-sm text-charcoal/80 mt-1 leading-relaxed">
                <strong className="text-forest font-semibold">{isBn ? 'ব্যবহৃত প্রযুক্তি: ' : 'Engineered Systems: '}</strong>
                {activeCase.engineering[lang]}
              </p>
            </div>

            <div className="md:col-span-4 flex justify-start md:justify-end">
              <Button
                href={getWhatsAppLink(activeCase.title[lang], null, lang)}
                size="md"
                variant="primary"
                className="w-full sm:w-auto font-bold uppercase tracking-wider shadow-lift"
              >
                <span>{isBn ? 'আমার স্পেসের জন্য আলোচনা' : 'Consult for My Space'}</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
