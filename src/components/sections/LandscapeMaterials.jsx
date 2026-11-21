import {
  Check,
  Droplets,
  Layers,
  Leaf,
  ShieldCheck,
  Sparkles,
  TreePine,
} from 'lucide-react'
import { useLocale } from '../../lib/locale'
import { Container, Section, SectionHeading } from '../ui/Section'

const MATERIALS = [
  {
    id: 'drainage',
    icon: ShieldCheck,
    tag: 'STRUCTURAL MEMBRANE',
    title: {
      bn: '৭-লেয়ার ইলাস্টোমেরিক ওয়াটারপ্রুফিং ও ড্রেন সেল',
      en: '7-Layer Elastomeric Waterproofing & Drain Cells',
    },
    desc: {
      bn: 'ছাদের স্ল্যাবকে ১০০% আর্দ্রতামুক্ত রাখতে পলিমার-মডিফায়েড মেমব্রেন, ৩০ মিমি এইচডিপিই ড্রেনেজ সেল এবং নন-ওভেন জিওটেক্সটাইল ফিল্টার ব্যবহার করা হয়।',
      en: 'Polymer-modified elastomeric barrier, 30mm high-density polyethylene drainage cells, and non-woven geotextile prevent any water ponding or root damage.',
    },
    specs: {
      bn: ['শূন্য স্ল্যাব লিকেজ গ্যারান্টি', 'মৌসুমি অতিরিক্ত বৃষ্টির দ্রুত নিষ্কাশন', 'স্ল্যাবের দীর্ঘায়ু বৃদ্ধি'],
      en: ['Zero slab leakage guarantee', 'Rapid monsoon runoff evacuation', 'Extends structural slab lifespan'],
    },
    badge: '100% LEAKPROOF',
  },
  {
    id: 'growing_media',
    icon: Leaf,
    tag: 'AGRONOMIC SUBSTRATE',
    title: {
      bn: 'ডিএই লাইটওয়েট আগ্নেয় ও জৈব গ্রোয়িং মিডিয়া',
      en: 'DAE Lightweight Volcanic & Organic Substrate',
    },
    desc: {
      bn: 'সাধারণ ভারী মাটির পরিবর্তে কোকোপিট, পারলাইট, ভার্মিকম্পোস্ট এবং ট্রাইকোডার্মা বায়ো-এজেন্টের বৈজ্ঞানিক সংমিশ্রণ—যা সাধারণ মাটির চেয়ে ৬০% হালকা।',
      en: 'Engineered mix of washed cocopeat, horticultural perlite, vermicompost, and Trichoderma organic bio-fungicide—60% lighter than natural clay.',
    },
    specs: {
      bn: ['ছাদের ডেড লোড ৬০% কমায়', 'শিকড়ে পর্যাপ্ত অক্সিজেন সঞ্চালন', 'মাটিবাহিত ছত্রাক ও মিলিবাগ মুক্ত'],
      en: ['Reduces roof dead load by 60%', 'Optimal root oxygenation & porosity', 'Free of soil pathogens & mealybugs'],
    },
    badge: '60% LIGHTER',
  },
  {
    id: 'sylhet_stone',
    icon: Layers,
    tag: 'NATURAL STONE',
    title: {
      bn: 'সিলেট রিভার স্যান্ডস্টোন ও ন্যাচারাল ফ্লেমড পেভার্স',
      en: 'Sylhet River Sandstone & Natural Flamed Pavers',
    },
    desc: {
      bn: 'জাফলং ও বিছনাকান্দির প্রাকৃতিক কোয়ারি থেকে সংগৃহীত অ্যান্টি-স্লিপ টেক্সচার্ড স্যান্ডস্টোন। ঘাসের সাথে ইন্টারলকিং করে তৈরি হয় দৃষ্টিনন্দন ওয়াকওয়ে।',
      en: 'Locally quarried natural river stone and flamed granite with anti-slip natural texture, interlocked with turf joints for timeless outdoor pathways.',
    },
    specs: {
      bn: ['বৃষ্টিতেও পা পিছলে যায় না', 'প্রাকৃতিক মাটির আর্দ্রতা ধরে রাখে', 'আজীবন আবহাওয়া-সহনশীল'],
      en: ['Non-slip even during monsoon', 'Allows ground permeability', 'Lifetime all-weather durability'],
    },
    badge: 'NATURAL HARDSCAPE',
  },
  {
    id: 'turf',
    icon: Sparkles,
    tag: 'ESTATE TURF',
    title: {
      bn: 'গল্ফ-গ্রেড বারমুডা ও কোরিয়ান ভেলভেট কার্পেট সোড',
      en: 'Golf-Grade Bermuda & Korean Velvet Turf Sod',
    },
    desc: {
      bn: 'নওগাঁর নিজস্ব এগ্রি-ফার্মে প্রস্তুতকৃত আগাছামুক্ত সোড। রোদ ও ফুট-ট্র্যাফিকের জন্য অত্যন্ত উপযোগী এবং দ্রুত মাটির সাথে শিকড় বিস্তার করে।',
      en: 'Weed-free, farm-grown sod acclimatized for high foot-traffic, drought-tolerance, and rapid root establishment in Bangladesh tropical climate.',
    },
    specs: {
      bn: ['গভীর সবুজ ও নরম অনুভূতির গালিচা', 'উচ্চ ফুট-ট্রাফিক সহনশীল', 'দ্রুত রুট-লকিং (৭–১০ দিন)'],
      en: ['Deep emerald velvet density', 'High wear & foot-traffic resilience', 'Rapid root locking (7–10 days)'],
    },
    badge: 'FARM ACCLIMATIZED',
  },
  {
    id: 'irrigation_tech',
    icon: Droplets,
    tag: 'SMART WATERING',
    title: {
      bn: 'স্মার্ট প্রেসার-কম্পেনসেটিং ড্রিপ ও রেইন সেন্সর',
      en: 'Smart Pressure-Compensating Drip & Rain Sensors',
    },
    desc: {
      bn: 'গাছের গোড়ায় সরাসরি সুষম পানি সরবরাহে প্রেসার-কম্পেনসেটিং এমিটার এবং বৃষ্টি হলে স্বয়ংক্রিয়ভাবে সেচ বন্ধ রাখার ক্লাউড সেন্সর প্রযুক্তি।',
      en: 'Uniform root-zone hydration via pressure-compensating emitters, coupled with smart digital controllers that auto-pause irrigation during rain.',
    },
    specs: {
      bn: ['৬৫% পানি অপচয় রোধ করে', 'পাতায় ছত্রাক আক্রমণ বন্ধ রাখে', 'স্মার্টফোন বা টাইমার নিয়ন্ত্রিত'],
      en: ['Saves up to 65% water', 'Prevents leaf-fungal blight', 'Smartphone & automated timer sync'],
    },
    badge: '65% WATER SAVER',
  },
  {
    id: 'hardwood',
    icon: TreePine,
    tag: 'TIMBER & STEEL',
    title: {
      bn: 'সিজনড সেগুন পারগোলা ও কর্টেন স্টিল প্ল্যান্টার',
      en: 'Seasoned Teak Pergolas & Corten Steel Planters',
    },
    desc: {
      bn: 'দীর্ঘস্থায়ী বহিরাঙ্গন সজ্জায় কিলন-ড্রাইড চিটাগাং টিক ও মরিচারোধী স্থাপত্য কর্টেন স্টিল—যা সময়ের সাথে সাথে আরও অভিজাত রূপ ধারণ করে।',
      en: 'Kiln-dried seasoned Chittagong teak coated with marine polyurethane, paired with architectural laser-cut Corten steel planter arrays.',
    },
    specs: {
      bn: ['উইপোকা ও রোদ-বৃষ্টি প্রতিরোধী', 'আধুনিক স্থাপত্যশৈলীর বহিঃপ্রকাশ', 'ন্যূনতম রক্ষণাবেক্ষণ প্রয়োজন'],
      en: ['Termite & UV weather-shielded', 'Modern minimalist architectural finish', 'Low maintenance luxury aesthetics'],
    },
    badge: 'MARINE GRADE',
  },
]

export default function LandscapeMaterials() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'

  return (
    <Section id="materials" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Background glow atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/3 -z-10 size-[32rem] rounded-full bg-emerald/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-1/3 -z-10 size-[32rem] rounded-full bg-bloom/15 blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow={isBn ? 'উপাদান ও প্রকৌশল মান' : 'Materials & Engineering Standards'}
          icon={Layers}
          title={isBn ? 'দীর্ঘস্থায়ী ল্যান্ডস্কেপিংয়ের কারিগরি ভিত্তি' : 'Craftsmanship, Proven Materials & Structural Longevity'}
          sub={
            isBn
              ? 'আমরা কেবল গাছ রোপণ করি না; প্রতিটি উপাদানের রাসায়নিক, কাঠামোগত ও আবহাওয়াগত স্থায়িত্ব নিশ্চিত করে বাস্তবায়ন করি।'
              : 'Beyond aesthetics: every structural membrane, substrate ratio, and natural stone paver is engineered for lifelong durability in Bangladesh.'
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MATERIALS.map((mat) => {
            const Icon = mat.icon
            return (
              <div
                key={mat.id}
                className="group relative rounded-3xl glass-panel p-6 sm:p-8 shadow-lift border border-white/85 transition-all duration-300 hover:border-emerald/40 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="size-11 rounded-2xl glass-emerald grid place-items-center shadow-soft">
                      <Icon className="size-5 text-white" />
                    </span>
                    <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[0.65rem] font-mono font-bold text-forest uppercase tracking-wider">
                      {mat.badge}
                    </span>
                  </div>

                  <span className="text-[0.65rem] font-mono font-bold tracking-widest uppercase text-emerald block mb-1">
                    {mat.tag}
                  </span>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-forest leading-snug">
                    {mat.title[lang]}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                    {mat.desc[lang]}
                  </p>
                </div>

                {/* Specs List */}
                <div className="mt-6 pt-4 border-t border-forest/10">
                  <ul className="space-y-2">
                    {mat.specs[lang].map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-xs text-forest/90 font-medium">
                        <span className="size-4 rounded-full bg-emerald/15 grid place-items-center shrink-0 mt-0.5">
                          <Check className="size-2.5 text-emerald" strokeWidth={3} />
                        </span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
