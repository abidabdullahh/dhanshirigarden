import { useState } from 'react'
import { Check } from 'lucide-react'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { getWhatsAppLink } from '../../lib/whatsapp'
import { Container } from '../ui/Section'

export default function Contact() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'

  const [form, setForm] = useState({
    name: '',
    phone: '',
    type: 'rooftop',
    area: '',
    location: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const typeLabel =
      form.type === 'rooftop'
        ? isBn ? 'ছাদবাগান' : 'Rooftop Sanctuary'
        : form.type === 'estate'
        ? isBn ? 'ভিলা/আবাসিক এস্টেট' : 'Villa / Estate'
        : form.type === 'lawn'
        ? isBn ? 'কার্পেট লন' : 'Velvet Lawn'
        : isBn ? 'অন্যান্য' : 'Other'

    const msg = isBn
      ? `আসসালামু আলাইকুম। আমি একটি নতুন ল্যান্ডস্কেপিং প্রকল্পের জন্য আলোচনা করতে চাই:\n- নাম: ${form.name}\n- ফোন: ${form.phone}\n- ধরন: ${typeLabel}\n- আয়তন: ${form.area || 'অনির্দিষ্ট'} বর্গফুট\n- অবস্থান: ${form.location || 'ঢাকা'}`
      : `Hello! I would like to initiate an architectural landscape consultation:\n- Name: ${form.name}\n- Contact: ${form.phone}\n- Project Type: ${typeLabel}\n- Estimated Area: ${form.area || 'TBD'} sq ft\n- Location: ${form.location || 'Dhaka'}`

    window.open(getWhatsAppLink(msg, null, lang), '_blank')
  }

  return (
    <section id="contact" className="relative isolate py-28 sm:py-36 lg:py-48 bg-white border-b border-black/[0.06]">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-6 mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-emerald" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-charcoal/60">
              {isBn ? 'প্রকল্প আলোচনা ও যোগাযোগ' : 'COMMISSION & INQUIRY'}
            </span>
          </div>
          <span className="font-mono text-xs text-charcoal/40">
            [DHAKA · NAOGAON]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* LEFT 6 COLS: Swiss Typography & Studio Details */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-display text-4xl sm:text-6xl font-light tracking-[-0.035em] text-forest leading-[1.05]">
              {isBn ? (
                <>
                  আসুন একটি জীবন্ত <br />
                  <span className="text-emerald font-normal">নিসর্গ সৃষ্টি করি।</span>
                </>
              ) : (
                <>
                  Let&apos;s engineer <br />
                  <span className="text-emerald font-normal">a living sanctuary.</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-charcoal/70 font-light leading-relaxed max-w-lg">
              {isBn
                ? 'আপনার ছাদবাগান, আঙিনা কিংবা এস্টেটের প্রাথমিক সাইট পরিদর্শন ও সম্ভাব্যতা যাচাইয়ের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।'
                : 'Direct architectural and agronomic consultation for private residences, commercial developments, and estate grounds.'}
            </p>

            {/* Direct Studio Contact Cards */}
            <div className="space-y-4 pt-6 border-t border-black/[0.06]">
              {site.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="group flex items-baseline justify-between py-3 border-b border-black/[0.06] text-forest hover:text-emerald transition"
                >
                  <span className="font-display text-lg sm:text-xl font-normal tracking-tight">
                    {phone.number}
                  </span>
                  <span className="font-mono text-xs text-charcoal/40 uppercase group-hover:text-emerald transition">
                    {phone.label[lang] || phone.label.en} →
                  </span>
                </a>
              ))}

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-charcoal/70">
                <div>
                  <strong className="block font-mono text-[0.68rem] text-charcoal/40 uppercase tracking-wider mb-1">
                    DHAKA STUDIO &amp; HEADQUARTERS
                  </strong>
                  <p className="font-light leading-relaxed">
                    K-26/1, Mohakhali, Dhaka-1212
                  </p>
                </div>
                <div>
                  <strong className="block font-mono text-[0.68rem] text-charcoal/40 uppercase tracking-wider mb-1">
                    NAOGAON AGRONOMY FARM &amp; NURSERY
                  </strong>
                  <p className="font-light leading-relaxed">
                    Sultanpur, Pandit Para, Naogaon Sadar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLS: Swiss Architectural Inquiry Form */}
          <div className="lg:col-span-6 bg-neutral-50/80 rounded-2xl border border-black/[0.06] p-8 sm:p-12">
            <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-emerald block mb-6">
              {isBn ? 'ইনকোয়ারি ফর্ম' : 'DIRECT CONSULTATION FORM'}
            </span>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="size-12 rounded-full bg-emerald text-white grid place-items-center mx-auto">
                  <Check className="size-6" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-2xl font-light text-forest">
                  {isBn ? 'ধন্যবাদ! আপনার ইনকোয়ারি গৃহীত হয়েছে।' : 'Thank you. Inquiry submitted.'}
                </h3>
                <p className="text-sm text-charcoal/70 font-light max-w-sm mx-auto">
                  {isBn
                    ? 'আমাদের প্রধান ল্যান্ডস্কেপ টিম অতি দ্রুত আপনার সাথে যোগাযোগ করবে।'
                    : 'Our senior architectural team will reach out directly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-mono text-[0.68rem] uppercase tracking-wider text-charcoal/60 mb-2">
                    {isBn ? 'আপনার নাম' : 'YOUR NAME'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isBn ? 'উদা: মাহির চৌধুরী' : 'e.g. Mahir Chowdhury'}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-forest placeholder:text-charcoal/30 focus:border-forest focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[0.68rem] uppercase tracking-wider text-charcoal/60 mb-2">
                      {isBn ? 'মোবাইল / হোয়াটসঅ্যাপ' : 'PHONE / WHATSAPP'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-forest placeholder:text-charcoal/30 focus:border-forest focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[0.68rem] uppercase tracking-wider text-charcoal/60 mb-2">
                      {isBn ? 'প্রকল্পের ধরন' : 'PROJECT DISCIPLINE'}
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-forest focus:border-forest focus:outline-none transition"
                    >
                      <option value="rooftop">{isBn ? 'ছাদবাগান ও স্কাই টেরেস' : 'Rooftop Sanctuary'}</option>
                      <option value="estate">{isBn ? 'ভিলা ও এস্টেট ল্যান্ডস্কেপ' : 'Estate Landscape'}</option>
                      <option value="lawn">{isBn ? 'কার্পেট ঘাস ও লন' : 'Velvet Carpet Turf'}</option>
                      <option value="hardscape">{isBn ? 'পাথুরে হার্ডস্কেপ ও পারগোলা' : 'Hardscape & Pergola'}</option>
                      <option value="vertical">{isBn ? 'ভার্টিক্যাল লিভিং ওয়াল' : 'Living Green Wall'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[0.68rem] uppercase tracking-wider text-charcoal/60 mb-2">
                      {isBn ? 'আনুমানিক আয়তন (বর্গফুট)' : 'ESTIMATED AREA (SQ FT)'}
                    </label>
                    <input
                      type="text"
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                      placeholder={isBn ? 'উদা: ১,২০০ ব.ফু.' : 'e.g. 1,500 sq ft'}
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-forest placeholder:text-charcoal/30 focus:border-forest focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[0.68rem] uppercase tracking-wider text-charcoal/60 mb-2">
                      {isBn ? 'প্রকল্পের এলাকা / শহর' : 'PROJECT LOCATION'}
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder={isBn ? 'উদা: গুলশান-২, ঢাকা' : 'e.g. Gulshan, Banani, Uttara'}
                      className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-forest placeholder:text-charcoal/30 focus:border-forest focus:outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-forest py-4 text-xs sm:text-sm font-medium text-white hover:bg-forest/90 transition shadow-xs tracking-wider uppercase"
                >
                  {isBn ? 'প্রস্তাব পাঠান ও হোয়াটসঅ্যাপে আলোচনা করুন' : 'Submit & Inquire on WhatsApp'} →
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
