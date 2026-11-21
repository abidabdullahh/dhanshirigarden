import { useState } from 'react'
import { Check, Phone } from 'lucide-react'
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
    <section id="contact" className="relative isolate py-20 sm:py-28 lg:py-36 bg-white border-b border-stone-200">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-5 mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[#2d6a4f]" />
            <span className="font-sutonny font-bold text-sm tracking-wider uppercase text-[#1b4332]">
              {isBn ? 'যোগাযোগ ও সাইট ভিজিট' : 'COMMISSION & INQUIRY'}
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
            [ঢাকা ও নওগাঁ]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT 6 COLS: Studio Details */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-sutonny text-3xl sm:text-5xl font-bold tracking-tight text-[#1b4332] leading-[1.15]">
              {isBn ? (
                <>
                  আসুন আপনার আঙিনায় একটি <br />
                  <span className="text-[#2d6a4f]">জীবন্ত নিসর্গ সৃষ্টি করি।</span>
                </>
              ) : (
                <>
                  Let&apos;s engineer <br />
                  <span className="text-[#2d6a4f]">a living sanctuary.</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-stone-800 font-medium leading-relaxed max-w-lg">
              {isBn
                ? 'আপনার ছাদবাগান, আঙিনা কিংবা এস্টেটের প্রাথমিক সাইট পরিদর্শন ও বিনামূল্যে বাজেট সম্ভাব্যতা যাচাইয়ের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।'
                : 'Direct architectural and agronomic consultation for private residences, commercial developments, and estate grounds.'}
            </p>

            {/* Direct Studio Contact Cards */}
            <div className="space-y-3 pt-6 border-t-2 border-stone-200">
              {site.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="group flex items-center justify-between p-4 rounded-2xl border-2 border-stone-200 bg-stone-50 hover:border-[#1b4332] hover:bg-emerald-50/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="size-5 text-[#2d6a4f]" />
                    <span className="font-mono text-base sm:text-lg font-bold text-[#1b4332]">
                      {phone.number}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-stone-600 group-hover:text-[#1b4332] transition">
                    {phone.label[lang] || phone.label.bn} →
                  </span>
                </a>
              ))}

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-800 font-medium">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <strong className="block font-bold text-[#1b4332] mb-1">
                    ঢাকা অফিস ও স্টুডিও
                  </strong>
                  <span>ক-২৬/১, মহাখালী, ঢাকা-১২১২</span>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <strong className="block font-bold text-[#1b4332] mb-1">
                    নওগাঁ গবেষণা নার্সারি
                  </strong>
                  <span>সুলতানপুর, পণ্ডিত পাড়া, নওগাঁ সদর-৬৫০০</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLS: Direct Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border-2 border-stone-300 bg-white p-6 sm:p-8 lg:p-10 shadow-lg">
              <h3 className="font-sutonny text-xl sm:text-2xl font-bold text-[#1b4332] mb-2">
                {isBn ? 'বিনামূল্যে প্রাথমিক সাইট ভিজিট ও বাজেট অনুরোধ' : 'Request Free Site Visit & Estimate'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-medium mb-6">
                {isBn
                  ? 'তথ্য দিন—আমাদের প্রধান কৃষিবিদ সরাসরি আপনার সাথে যোগাযোগ করবেন।'
                  : 'Submit your requirements for direct agronomic review.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1.5">
                    {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isBn ? 'যেমন: মোহাম্মদ রফিকুল ইসলাম / সাহানা বেগম' : 'e.g. John Doe'}
                    className="w-full rounded-xl border-2 border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 focus:bg-white focus:border-[#1b4332] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1.5">
                    {isBn ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর *' : 'Mobile / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full rounded-xl border-2 border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 focus:bg-white focus:border-[#1b4332] focus:outline-none transition font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1.5">
                      {isBn ? 'প্রকল্পের ধরন' : 'Project Type'}
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full rounded-xl border-2 border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 focus:bg-white focus:border-[#1b4332] focus:outline-none transition"
                    >
                      <option value="rooftop">{isBn ? 'ছাদবাগান ও টেরেস (১০০% লিকপ্রুফ)' : 'Rooftop Sanctuary'}</option>
                      <option value="estate">{isBn ? 'প্রাইভেট ভিলা এস্টেট' : 'Villa / Estate'}</option>
                      <option value="lawn">{isBn ? 'কার্পেট ঘাসের লন' : 'Velvet Lawn'}</option>
                      <option value="vertical">{isBn ? 'ভার্টিক্যাল গ্রিন ওয়াল' : 'Vertical Green Wall'}</option>
                      <option value="other">{isBn ? 'বাগান মালি ও কেয়ার প্যাকেজ' : 'Care & Maintenance'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-900 mb-1.5">
                      {isBn ? 'আনুমানিক আয়তন (বর্গফুট)' : 'Approx. Area (Sq Ft)'}
                    </label>
                    <input
                      type="text"
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                      placeholder={isBn ? 'যেমন: ১২০০' : 'e.g. 1200'}
                      className="w-full rounded-xl border-2 border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 focus:bg-white focus:border-[#1b4332] focus:outline-none transition font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1.5">
                    {isBn ? 'সাইটের অবস্থান / এলাকা' : 'Site Location'}
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder={isBn ? 'যেমন: গুলশান-২ / ধানমন্ডি / পূর্বাচল / উত্তরা' : 'e.g. Gulshan-2, Dhaka'}
                    className="w-full rounded-xl border-2 border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 focus:bg-white focus:border-[#1b4332] focus:outline-none transition"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-[#1b4332] py-4 text-sm sm:text-base font-bold text-white hover:bg-[#2d6a4f] transition-all shadow-md hover:shadow-lg"
                  >
                    {isBn ? 'হোয়াটসঅ্যাপে তাৎক্ষণিক বার্তা পাঠান' : 'Dispatch via WhatsApp'}
                  </button>
                </div>

                {submitted && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-[#1b4332]">
                    <Check className="size-4" />
                    <span>{isBn ? 'আপনার অনুরোধ তৈরি হয়েছে, হোয়াটসঅ্যাপ উইন্ডো খুলছে...' : 'Request composed, opening WhatsApp...'}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
