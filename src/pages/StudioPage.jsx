import { ArrowLeft, Check, ChevronRight, Compass, ShieldCheck } from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import GardenStudio from '../components/dynamic/GardenStudio'
import { Container } from '../components/ui/Section'
import Button from '../components/ui/Button'
import { getWhatsAppLink } from '../lib/whatsapp'

export default function StudioPage() {
  const { t, lang } = useLocale()
  const { navigate } = useRouter()

  const standards = [
    {
      title: lang === 'bn' ? 'BNBC স্ট্রাকচারাল লোড নিরাপত্তা' : 'BNBC Structural Load Compliance',
      desc: lang === 'bn'
        ? 'বাংলাদেশ ন্যাশনাল বিল্ডিং কোড (BNBC) অনুযায়ী প্রতি বর্গফুটে নিরাপদ ডেড লোড গণনা এবং ৩-লেয়ার ড্রেনেজ সেলের মাধ্যমে ছাদের স্থায়ী সুরক্ষা।'
        : 'Engineered in accordance with BNBC guidelines. Lightweight 3-layer drainage cells ensure dead weight remains well within safe design thresholds.',
    },
    {
      title: lang === 'bn' ? '১০০% নিশ্ছিদ্র ওয়াটারপ্রুফিং গ্যারান্টি' : '100% Watertight Waterproofing',
      desc: lang === 'bn'
        ? 'ইলাস্টোমেরিক মেমব্রেন ও জিওটেক্সটাইল ফিল্টারের নিখুঁত সমন্বয় যা ভবনের কংক্রিট কাঠামোকে আর্দ্রতা ও শিকড়ের ক্ষত থেকে আজীবন রক্ষা করে।'
        : 'Multi-layer elastomeric membrane barrier preventing dampness, seepage, and destructive root intrusion for the lifetime of your building.',
    },
    {
      title: lang === 'bn' ? 'বিজ্ঞানসম্মত হালকা মাটির ফর্মুলেশন' : 'Engineered Lightweight Soil Mix',
      desc: lang === 'bn'
        ? 'ভারী বেলে-এঁটেল মাটির বদলে কোকোপিট, ভার্মিকম্পোস্ট, পার্লাইট ও ট্রাইকোডার্মার পুষ্টিসমৃদ্ধ হালকা মিডিয়া ব্যবহার যা পানির ধারণক্ষমতা বহুগুণ বাড়ায়।'
        : 'Proprietary soil amendment using cocopeat, vermicompost, perlite, and Trichoderma fungi for high aeration without excessive rooftop weight.',
    },
  ]

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero & Breadcrumb */}
        <section className="relative isolate overflow-hidden pt-8 pb-8 sm:pt-12 sm:pb-12">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 -z-10 size-96 rounded-full bg-bright/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 -z-10 size-96 rounded-full bg-emerald/15 blur-3xl" />

          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-forest/70">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 hover:text-emerald transition"
              >
                <ArrowLeft className="size-3.5" />
                <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
              </button>
              <ChevronRight className="size-3 text-forest/30" />
              <span className="text-emerald font-bold">{t.nav.studio}</span>
            </nav>

            <div className="rounded-3xl glass-panel p-8 sm:p-12 shadow-lift border border-white/85">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-4">
                <Compass className="size-4 text-emerald" />
                {lang === 'bn' ? 'রিয়েল-টাইম ক্যাড প্ল্যানার ও বাজেট ক্যালকুলেটর' : 'Real-Time CAD Planner & BOQ Estimator'}
              </span>
              <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-forest leading-tight">
                {lang === 'bn' ? 'ইন্টারেক্টিভ গার্ডেন স্টুডিও' : 'Interactive Landscape Studio'}
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-charcoal/80 leading-relaxed">
                {lang === 'bn'
                  ? 'আপনার ছাদ বা আঙ্গিনার সঠিক মাপ দিয়ে তৎক্ষণাৎ ব্লুপ্রিন্ট ও আনুমানিক খরচ (BOQ) হিসাব করুন। সাথে দেখুন কাঠামোগত লোড ও তাপমাত্রা হ্রাসের পূর্বাভাস।'
                  : 'Configure your rooftop or lawn dimensions for instant CAD architectural blueprint visualization, load calculation, and itemized budget estimates.'}
              </p>
            </div>
          </Container>
        </section>

        {/* CAD Studio Component */}
        <GardenStudio />

        {/* Technical Standards Section */}
        <section className="relative isolate overflow-hidden py-16">
          <Container>
            <div className="rounded-3xl glass-card p-8 sm:p-12 border border-white/80 shadow-soft">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1 text-xs font-bold text-forest uppercase tracking-wider mb-3">
                  <ShieldCheck className="size-4 text-emerald" />
                  {lang === 'bn' ? 'প্রকৌশলগত নিশ্চয়তা' : 'Engineering Assurance'}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-forest">
                  {lang === 'bn' ? 'আমাদের প্রতিটি নকশার বিজ্ঞানভিত্তিক ভিত্তি' : 'Scientific Rigor Behind Every Project'}
                </h2>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {standards.map((std) => (
                  <div key={std.title} className="rounded-2xl glass-panel p-6 border border-white/85 shadow-soft">
                    <span className="grid size-9 place-items-center rounded-xl glass-emerald text-white mb-4">
                      <Check className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-forest">{std.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{std.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl glass-amber p-6 text-center border border-bloom/30">
                <p className="text-sm font-semibold text-charcoal">
                  {lang === 'bn'
                    ? '💡 সঠিক মেপে অন-সাইট অডিট ছাড়া চূড়ান্ত এস্টিমেট নির্ধারিত হয় না। বিনামূল্যে প্রকৌশল অডিটের জন্য যোগাযোগ করুন।'
                    : '💡 Final quotation is confirmed after on-site physical measurement and structural inspection.'}
                </p>
                <div className="mt-4">
                  <Button href={getWhatsAppLink(null, null, lang)} variant="primary" size="md">
                    {lang === 'bn' ? 'সাইট অডিটের তারিখ বুক করুন' : 'Book Physical Site Audit'}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
