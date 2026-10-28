import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sprout,
} from 'lucide-react'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/layout/FloatingActions'
import Faq from '../components/sections/Faq'
import { Container } from '../components/ui/Section'
import Button from '../components/ui/Button'
import { site } from '../data/site'
import { getWhatsAppLink } from '../lib/whatsapp'
import { submitConsultationLead } from '../lib/consultationApi'

function CopyButton({ text }) {
  const { t } = useLocale()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard fallback */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full glass-pill px-3 py-1.5 text-xs font-bold text-emerald transition hover:bg-white"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? t.contact.copied : t.contact.copy}
    </button>
  )
}

export default function ContactPage() {
  const { t, lang } = useLocale()
  const { navigate } = useRouter()

  // Consultation Form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    spaceType: 'rooftop',
    areaSqft: 600,
    location: 'Dhaka',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [submittedResult, setSubmittedResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return

    setLoading(true)
    const res = await submitConsultationLead({ ...form, lang })
    setLoading(false)

    if (res?.ok && res.data) {
      setSubmittedResult(res.data)
    }
  }

  const phone = site.phones[0]

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero & Breadcrumb */}
        <section className="relative isolate overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14">
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
              <span className="text-emerald font-bold">{t.nav.contact}</span>
            </nav>

            <div className="rounded-3xl glass-panel p-8 sm:p-12 shadow-lift border border-white/85">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-4">
                <Sprout className="size-4 text-emerald" />
                {lang === 'bn' ? 'সরাসরি যোগাযোগ ও অন-সাইট অডিট' : 'Direct Inquiry & On-Site Consultation'}
              </span>
              <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-forest leading-tight">
                {lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Connect with Dhanshiri Agronomists'}
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-charcoal/80 leading-relaxed">
                {lang === 'bn'
                  ? 'আপনার নতুন ছাদবাগান, লন প্রতিষ্ঠা বা বিদ্যমান গাছের চিকিৎসার জন্য সরাসরি বুক করুন বা অফিসে যোগাযোগ করুন।'
                  : 'Book an on-site structural audit, plan a precision turf lawn, or triage an existing garden with certified agronomists.'}
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Grid: Form + Office Locations */}
        <section className="relative isolate overflow-hidden py-6 sm:py-10">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
              {/* Left Column: Interactive Consultation Booking Form */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl glass-panel p-6 sm:p-10 shadow-lift border border-white/85">
                  <div className="mb-6 border-b border-forest/10 pb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full glass-pill px-3 py-1 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                      <Calendar className="size-3.5 text-emerald" />
                      {lang === 'bn' ? 'অনলাইন বুকিং ফর্ম' : 'Online Intake Portal'}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-forest">
                      {lang === 'bn' ? 'পরামর্শ ও সাইট অডিটের আবেদন' : 'Schedule a Consultation or Site Visit'}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-charcoal/70">
                      {lang === 'bn'
                        ? 'তথ্য পূরণ করুন। আমাদের ব্যাকএন্ড সিস্টেম আপনার নিকটস্থ কৃষিবিদ নির্ধারণ করে দেবে।'
                        : 'Submit your requirements. Our system assigns an agronomist to review your space.'}
                    </p>
                  </div>

                  {submittedResult ? (
                    <div className="animate-rise rounded-2xl glass-emerald p-6 text-white border border-white/30 shadow-lift">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-full bg-white text-emerald font-bold">
                          ✓
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-bold">
                            {lang === 'bn' ? 'আবেদনটি সফলভাবে জমা হয়েছে!' : 'Inquiry Successfully Submitted!'}
                          </h3>
                          <span className="font-mono text-xs opacity-90">
                            ID: {submittedResult.referenceId}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl bg-forest/30 p-4 text-xs leading-relaxed text-white/90">
                        <p className="font-semibold text-white">
                          {submittedResult.confirmationMessage}
                        </p>
                        <p className="mt-2 text-white/80">
                          <strong>{lang === 'bn' ? 'প্রাথমিক পরামর্শ:' : 'Preliminary Advice:'}</strong> {submittedResult.preliminaryAdvice}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                          href={getWhatsAppLink(
                            `Consultation Lead [${submittedResult.referenceId}]: ${form.spaceType} (${form.areaSqft} sq.ft) in ${form.location}. Please follow up.`,
                            null,
                            lang
                          )}
                          variant="primary"
                          size="md"
                          className="bg-white text-forest hover:bg-cream"
                        >
                          <MessageCircle className="size-4 text-emerald" />
                          <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে তাৎক্ষণিক বার্তা দিন' : 'Open in WhatsApp'}</span>
                        </Button>
                        <button
                          type="button"
                          onClick={() => setSubmittedResult(null)}
                          className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/30 transition"
                        >
                          {lang === 'bn' ? 'নতুন ফর্ম পূরণ করুন' : 'Submit Another'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                          {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={lang === 'bn' ? 'উদা: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                          className="w-full rounded-xl glass-card px-4 py-2.5 text-sm text-forest placeholder:text-charcoal/40 border border-white/80 focus:outline-none focus:ring-2 focus:ring-emerald"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                          {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="017XXXXXXXX"
                          className="w-full rounded-xl glass-card px-4 py-2.5 text-sm text-forest placeholder:text-charcoal/40 border border-white/80 focus:outline-none focus:ring-2 focus:ring-emerald"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                          {lang === 'bn' ? 'প্রকল্পের ধরন' : 'Project Type'}
                        </label>
                        <select
                          value={form.spaceType}
                          onChange={(e) => setForm({ ...form, spaceType: e.target.value })}
                          className="w-full rounded-xl glass-card px-4 py-2.5 text-sm text-forest border border-white/80 focus:outline-none focus:ring-2 focus:ring-emerald"
                        >
                          <option value="rooftop">{lang === 'bn' ? 'ছাদবাগান ও ড্রেইনেজ (Rooftop)' : 'Rooftop Garden'}</option>
                          <option value="lawn">{lang === 'bn' ? 'কার্পেট ঘাস ও লন (Lawn)' : 'Carpet Turf Lawn'}</option>
                          <option value="vertical">{lang === 'bn' ? 'ভার্টিক্যাল গ্রিন ওয়াল (Vertical Garden)' : 'Vertical Green Wall'}</option>
                          <option value="irrigation">{lang === 'bn' ? 'স্মার্ট ড্রিপ সেচ (Irrigation)' : 'Automated Irrigation'}</option>
                          <option value="farmhouse">{lang === 'bn' ? 'ফার্মহাউস ও রিসোর্ট (Farmhouse)' : 'Farmhouse Landscaping'}</option>
                        </select>
                      </div>

                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                          {lang === 'bn' ? 'আনুমানিক মাপ (বর্গফুট)' : 'Approx. Area (Sq.Ft)'}
                        </label>
                        <input
                          type="number"
                          min="50"
                          max="30000"
                          value={form.areaSqft}
                          onChange={(e) => setForm({ ...form, areaSqft: Number(e.target.value) })}
                          className="w-full rounded-xl glass-card px-4 py-2.5 text-sm text-forest border border-white/80 focus:outline-none focus:ring-2 focus:ring-emerald"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                          {lang === 'bn' ? 'এলাকা / জেলা' : 'Location (District / Area)'}
                        </label>
                        <input
                          type="text"
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          placeholder={lang === 'bn' ? 'উদা: গুলশান ২, ঢাকা বা নওগাঁ সদর' : 'e.g. Gulshan, Dhaka or Naogaon'}
                          className="w-full rounded-xl glass-card px-4 py-2.5 text-sm text-forest placeholder:text-charcoal/40 border border-white/80 focus:outline-none focus:ring-2 focus:ring-emerald"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                          {lang === 'bn' ? 'বিশেষ প্রয়োজন বা বার্তা' : 'Requirements or Message'}
                        </label>
                        <textarea
                          rows="3"
                          value={form.notes}
                          onChange={(e) => setForm({ ...form, notes: e.target.value })}
                          placeholder={
                            lang === 'bn'
                              ? 'আপনার ছাদে পানির চাপ, রোদ কেমন পড়ে বা কোন কোন ফলের গাছ লাগাতে চান লিখুন...'
                              : 'Mention sunlight exposure, drainage conditions, or preferred plants...'
                          }
                          className="w-full rounded-xl glass-card px-4 py-2.5 text-sm text-forest placeholder:text-charcoal/40 border border-white/80 focus:outline-none focus:ring-2 focus:ring-emerald"
                        />
                      </div>

                      <div className="sm:col-span-2 mt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={loading}
                          className="w-full justify-center"
                        >
                          <Send className="size-4" />
                          <span>
                            {loading
                              ? (lang === 'bn' ? 'প্রসেস হচ্ছে...' : 'Submitting...')
                              : (lang === 'bn' ? 'অনুরোধ জমা দিন' : 'Submit Consultation Request')}
                          </span>
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: Office Hubs & Helpline */}
              <div className="lg:col-span-5 grid gap-5">
                {/* Dhaka Office Card */}
                <div className="rounded-3xl glass-card p-6 shadow-soft border border-white/80">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl glass-emerald text-white shadow-soft">
                      <MapPin className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-forest">
                        {site.offices[0].city} · {site.offices[0].name}
                      </h3>
                      <p className="text-xs text-emerald font-semibold">{site.offices[0].note}</p>
                    </div>
                  </div>
                  <address className="mt-4 text-xs sm:text-sm not-italic leading-relaxed text-charcoal/85">
                    {site.offices[0].address}
                  </address>
                  <div className="mt-4">
                    <CopyButton text={site.offices[0].address} />
                  </div>
                </div>

                {/* Naogaon Office Card */}
                <div className="rounded-3xl glass-card p-6 shadow-soft border border-white/80">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl glass-emerald text-white shadow-soft">
                      <Sprout className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-forest">
                        {site.offices[1].city} · {site.offices[1].name}
                      </h3>
                      <p className="text-xs text-emerald font-semibold">{site.offices[1].note}</p>
                    </div>
                  </div>
                  <address className="mt-4 text-xs sm:text-sm not-italic leading-relaxed text-charcoal/85">
                    {site.offices[1].address}
                  </address>
                  <div className="mt-4">
                    <CopyButton text={site.offices[1].address} />
                  </div>
                </div>

                {/* Direct Call & Emergency Triage Card */}
                <div className="rounded-3xl glass-panel p-6 shadow-soft border border-white/85">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald block mb-1">
                    {lang === 'bn' ? 'সরাসরি হেল্পলাইন' : 'Direct Helpline'}
                  </span>
                  <p className="text-lg font-bold text-forest">{phone.number}</p>
                  <p className="mt-1 text-xs text-charcoal/70">
                    {lang === 'bn'
                      ? 'সকাল ৯টা হতে রাত ৮টা (শুক্রবার সহ সপ্তাহে ৭ দিন খোলা)'
                      : '9:00 AM – 8:00 PM (Open 7 days a week including Friday)'}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button href={`tel:${phone.tel}`} variant="primary" size="sm" icon={Phone}>
                      {t.actions.callNow}
                    </Button>
                    <Button href={getWhatsAppLink(null, null, lang)} variant="glass" size="sm" icon={MessageCircle}>
                      {t.actions.whatsapp}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <Faq />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
