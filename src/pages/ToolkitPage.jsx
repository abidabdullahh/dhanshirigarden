import { useState, useMemo } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  MessageCircle,
  Share2,
  Sparkles,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import { Container } from '../components/ui/Section'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import { getCustomWhatsAppLink } from '../lib/whatsapp'

const POT_PRESETS = [
  { id: '8', nameBn: '৮ ইঞ্চি টব (3L)', nameEn: '8 Inch Pot (3L)', soil: 1.2, compost: 0.9, cocopeat: 0.9, neem: '১ চা চামচ', bone: '১ চা চামচ' },
  { id: '10', nameBn: '১০ ইঞ্চি টব (6L)', nameEn: '10 Inch Pot (6L)', soil: 2.4, compost: 1.8, cocopeat: 1.8, neem: '২ চা চামচ', bone: '২ চা চামচ' },
  { id: '12', nameBn: '১২ ইঞ্চি টব (12L)', nameEn: '12 Inch Pot (12L)', soil: 4.8, compost: 3.6, cocopeat: 3.6, neem: '৩ টেবিল চামচ', bone: '২ টেবিল চামচ' },
  { id: '18', nameBn: '১৮ ইঞ্চি ড্রাম (30L)', nameEn: '18 Inch Drum (30L)', soil: 13.5, compost: 10.5, cocopeat: 6.0, neem: '১/২ কাপ', bone: '১/৩ কাপ' },
  { id: 'half', nameBn: 'হাফ ড্রাম (100L)', nameEn: 'Half Drum (100L)', soil: 50.0, compost: 35.0, cocopeat: 15.0, neem: '২ কাপ', bone: '১.৫ কাপ' },
]

export default function ToolkitPage() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { navigate } = useRouter()

  const [selectedPot, setSelectedPot] = useState('12')
  const [copied, setCopied] = useState(false)

  const activePreset = useMemo(
    () => POT_PRESETS.find((p) => p.id === selectedPot) || POT_PRESETS[2],
    [selectedPot]
  )

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const proWhatsAppText = isBn
    ? 'হ্যালো ধানসিঁড়ি গার্ডেন! আমি আপনাদের "ছাদবাগান প্ল্যানার ওএস প্রো" (৳৪৯০) সংগ্রহ করতে চাই। বিকাশ/নগদ পেমেন্ট প্রসিডিউর জানান।'
    : 'Hello Dhanshiri Garden! I would like to purchase the "Rooftop Garden Planner OS Pro" (BDT 490). Please share bKash payment details.'

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <Container>
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald hover:text-forest transition-colors"
            >
              <ArrowLeft className="size-4" />
              {isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-charcoal/15 bg-white/70 hover:bg-white transition-colors"
            >
              <Share2 className="size-3.5 text-forest" />
              {copied ? (isBn ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : (isBn ? 'শেয়ার করুন' : 'Share')}
            </button>
          </div>

          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-forest text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="size-3.5 text-emerald" />
              {isBn ? 'ডিজিটাল প্ল্যানার ও অটোমেটেড ওএস' : 'Digital Planner & Workspace OS'}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-forest mb-4 leading-tight">
              {isBn ? (
                <>
                  ছাদবাগান ও ল্যান্ডস্কেপ <span className="text-emerald">প্ল্যানার ওএস</span>
                </>
              ) : (
                <>
                  Rooftop & Landscape <span className="text-emerald">Planner OS</span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
              {isBn
                ? 'বাংলাদেশের ঋতুভিত্তিক ফসলের ক্যালেন্ডার, টবের মাটির ওজন ক্যালকুলেটর, এবং রোগবালাই নিরাময়ের সম্পূর্ণ ডিজিটাল স্প্রেডশিট। আপনার ছাদবাগান পরিচালনায় শতভাগ বৈজ্ঞানিক গাইড।'
                : 'Bangladesh seasonal sowing calendar, container weight & soil mix engine, and organic pest diagnosis matrices. Ready to open in Excel, Google Sheets, or Notion.'}
            </p>
          </div>

          {/* Interactive Soil & Pot Formulation Engine Preview */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lift mb-16 bg-white/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-charcoal/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald">
                  {isBn ? 'লাইভ ক্যালকুলেটর প্রিভিউ' : 'Live Calculator Preview'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-forest">
                  {isBn ? 'টবের আকার অনুযায়ী বৈজ্ঞানিক মাটির অনুপাত' : 'Scientific Soil Mix Ratio Calculator'}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest/5 text-forest border border-forest/10">
                {isBn ? 'ভারমুক্ত ছাদের স্ট্যান্ডার্ড' : 'Roof Safe Standard'}
              </span>
            </div>

            {/* Pot Selector Buttons */}
            <div className="mt-6">
              <label className="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-3">
                {isBn ? 'টব বা ড্রামের মাপ নির্বাচন করুন:' : 'Select Container Size:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {POT_PRESETS.map((pot) => (
                  <button
                    key={pot.id}
                    onClick={() => setSelectedPot(pot.id)}
                    className={`px-3 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border text-left ${
                      selectedPot === pot.id
                        ? 'bg-forest text-white border-forest shadow-md scale-[1.02]'
                        : 'bg-white/80 text-charcoal hover:bg-white border-charcoal/15'
                    }`}
                  >
                    {isBn ? pot.nameBn : pot.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
              <div className="rounded-2xl bg-cream/70 p-4 border border-charcoal/10 text-center">
                <span className="block text-xs font-medium text-charcoal/60 mb-1">
                  {isBn ? 'বেলে দোআঁশ মাটি' : 'Sandy Loam Soil'}
                </span>
                <span className="text-xl sm:text-2xl font-black text-forest font-display">
                  {activePreset.soil} {isBn ? 'লিটার' : 'L'}
                </span>
                <span className="block text-[11px] text-emerald mt-1 font-medium">৪০-৫০%</span>
              </div>

              <div className="rounded-2xl bg-cream/70 p-4 border border-charcoal/10 text-center">
                <span className="block text-xs font-medium text-charcoal/60 mb-1">
                  {isBn ? 'ভার্মিকম্পোস্ট / গোবর' : 'Vermicompost'}
                </span>
                <span className="text-xl sm:text-2xl font-black text-forest font-display">
                  {activePreset.compost} {isBn ? 'লিটার' : 'L'}
                </span>
                <span className="block text-[11px] text-emerald mt-1 font-medium">৩০-৩৫%</span>
              </div>

              <div className="rounded-2xl bg-cream/70 p-4 border border-charcoal/10 text-center">
                <span className="block text-xs font-medium text-charcoal/60 mb-1">
                  {isBn ? 'কোকোপিট / তুষ' : 'Cocopeat (Light)'}
                </span>
                <span className="text-xl sm:text-2xl font-black text-forest font-display">
                  {activePreset.cocopeat} {isBn ? 'লিটার' : 'L'}
                </span>
                <span className="block text-[11px] text-emerald mt-1 font-medium">১৫-৩০%</span>
              </div>

              <div className="rounded-2xl bg-cream/70 p-4 border border-charcoal/10 text-center">
                <span className="block text-xs font-medium text-charcoal/60 mb-1">
                  {isBn ? 'নিম খৈল গুঁড়া' : 'Neem Cake'}
                </span>
                <span className="text-sm sm:text-base font-bold text-forest font-display">
                  {activePreset.neem}
                </span>
                <span className="block text-[11px] text-charcoal/60 mt-1">মাটি শোধন</span>
              </div>

              <div className="rounded-2xl bg-cream/70 p-4 border border-charcoal/10 text-center col-span-2 sm:col-span-1">
                <span className="block text-xs font-medium text-charcoal/60 mb-1">
                  {isBn ? 'হাড়ের গুঁড়া / টিএসপি' : 'Bone Meal'}
                </span>
                <span className="text-sm sm:text-base font-bold text-forest font-display">
                  {activePreset.bone}
                </span>
                <span className="block text-[11px] text-charcoal/60 mt-1">ফসফরাস ও শিকড়</span>
              </div>
            </div>
          </div>

          {/* Download & Purchase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
            {/* Free Download Card */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/80 shadow-lift flex flex-col justify-between bg-white/70">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-charcoal/10 text-charcoal">
                    {isBn ? 'ফ্রি সংস্করণ' : 'Free Lite Edition'}
                  </span>
                  <span className="text-2xl font-black text-charcoal font-display">৳০</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-forest mb-2">
                  {isBn ? 'ছাদবাগান প্ল্যানার ওএস (স্ট্যান্ডার্ড)' : 'Garden Planner OS (Standard)'}
                </h3>
                <p className="text-sm text-charcoal/80 mb-6">
                  {isBn
                    ? 'গুগল শিটস ও এক্সেলে সরাসরি ব্যবহারের জন্য ওপেন সিএসভি ফরম্যাট। ২৫+ ফসলের রোপণ সময় এবং ৪টি সম্পূর্ণ মডিউল।'
                    : 'Instant open CSV format for Google Sheets & Excel with 25+ crops and 4 core operational modules.'}
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    isBn ? '২৫+ দেশি ফল, শাকসবজি ও ফুলের রোপণ ক্যালেন্ডার' : '25+ fruits, vegetables & flowers calendar',
                    isBn ? '৮" থেকে হাফ ড্রামের লাইটওয়েট মাটির হিসাব' : '8" to half-drum soil weight calculation formulas',
                    isBn ? 'মিলিবাগ, মাকড় ও পাতা কোঁকড়ানো রোগের অর্গানিক সমাধান' : 'Mealybug, mite & leaf-curl organic remedies',
                    isBn ? 'ছাদের লোড ও ড্রেইনেজ নিরাপত্তা অডিট চেকলিস্ট' : 'Roof load & drainage safety audit checklist',
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal/80">
                      <CheckCircle2 className="size-4 text-emerald shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/downloads/Dhanshiri_Garden_Planner_OS.csv"
                download="Dhanshiri_Garden_Planner_OS.csv"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-forest text-white hover:bg-emerald transition-colors shadow-md"
              >
                <Download className="size-4" />
                {isBn ? 'বিনামূল্যে স্প্রেডশিট ডাউনলোড করুন' : 'Download Free OS (.CSV)'}
              </a>
            </div>

            {/* Pro Edition Card */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border-2 border-emerald/50 shadow-lift flex flex-col justify-between bg-gradient-to-br from-white via-white/95 to-emerald/5 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-emerald text-white px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase">
                BEST VALUE
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald/15 text-emerald">
                    {isBn ? 'প্রো প্যাকেজ' : 'Pro Bundle'}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-forest font-display">৳৪৯০</span>
                    <span className="text-xs text-charcoal/50 line-through">৳১,২০০</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-forest mb-2">
                  {isBn ? 'প্ল্যানার ওএস + ব্যক্তিগত বাগান পরামর্শ' : 'Planner OS Pro + Personal Advice'}
                </h3>
                <p className="text-sm text-charcoal/80 mb-6">
                  {isBn
                    ? 'সম্পূর্ণ স্প্রেডশিট ওএস, সাথে আপনার ছাদের আয়তন অনুযায়ী হোয়াটসঅ্যাপে আমাদের এগ্রোনোমিস্টের ১-অন-১ পরামর্শ।'
                    : 'Full Workspace OS plus 1-on-1 personalized WhatsApp consultation with our barind agriculturist team.'}
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    isBn ? 'সম্পূর্ণ ওএস স্প্রেডশিট + প্রিন্টযোগ্য পিডিএফ গাইড' : 'Full OS Spreadsheet + Printable PDF Quickstart',
                    isBn ? 'আপনার ছাদের সাইজ অনুযায়ী কাস্টম ড্রেনেজ লেআউট গাইড' : 'Custom roof layout advice based on your sq.ft',
                    isBn ? 'গাছের রোগবালাইয়ের ছবি পাঠালে দ্রুত সমাধান সহায়তা' : 'Direct photo diagnosis assistance over WhatsApp',
                    isBn ? 'ধানসিঁড়ি নার্সারি শপ অর্ডারে ১০% আজীবন ক্যাশব্যাক ডিসকাউন্ট' : '10% lifetime discount voucher on nursery plants',
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal/90 font-medium">
                      <Sparkles className="size-4 text-emerald shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getCustomWhatsAppLink(proWhatsAppText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-emerald text-white hover:bg-forest transition-colors shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="size-4" />
                {isBn ? 'হোয়াটসঅ্যাপে প্রো ওএস কিনুন (৳৪৯০)' : 'Get Pro OS via WhatsApp (BDT 490)'}
              </a>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
