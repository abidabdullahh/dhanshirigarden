import { useState } from 'react'
import { Calendar, Check, Copy, Mail, MapPin, MessageCircle, Phone, Sprout } from 'lucide-react'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { getCustomWhatsAppLink, getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { LeafDoodle, PlanTree, ScissorsDoodle } from '../ui/Doodles'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/Icons'
import { Container, Section } from '../ui/Section'

function CopyButton({ text }) {
  const { t } = useLocale()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.85rem] font-semibold text-emerald transition-colors hover:bg-mint"
      aria-live="polite"
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      {copied ? t.contact.copied : t.contact.copy}
    </button>
  )
}

function Office({ icon: Icon, title, address, note }) {
  return (
    <div className="rounded-[2rem] glass-white p-6 shadow-soft transition duration-200 hover:shadow-lift">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-mint text-emerald">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-bold text-forest">{title}</h3>
      </div>
      <address className="mt-4 text-[1rem] not-italic leading-body text-charcoal/85">{address}</address>
      {note && <p className="mt-1 text-sm font-medium text-emerald">{note}</p>}
      <div className="mt-3 -ml-3">
        <CopyButton text={address} />
      </div>
    </div>
  )
}

function BookingForm() {
  const { t, lang } = useLocale()
  const copy = t.contact.booking
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(copy.servicesList[0])
  const [location, setLocation] = useState('dhaka')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const locText = copy.locations[location]
    const message = lang === 'bn'
      ? `আসসালামু আলাইকুম, আমি ধানসিঁড়ি গার্ডেন থেকে পরামর্শ ও সাইট ভিজিট বুক করতে চাই।

• নাম: ${name || 'অনুসন্ধানকারী'}
• ফোন: ${phone || 'উপরে দেওয়া হয়নি'}
• কাঙ্ক্ষিত সেবা: ${service}
• এলাকা/লোকেশন: ${locText}
• বিবরণ/চাহিদা: ${notes || 'প্রাথমিক পরিদর্শন প্রয়োজন'}`
      : `Hello, I would like to book a consultation & site visit with Dhanshiri Garden:

• Name: ${name || 'Prospective Client'}
• Phone: ${phone || 'Not provided'}
• Preferred Service: ${service}
• Location: ${locText}
• Details/Notes: ${notes || 'Initial site survey required'}`

    window.open(getCustomWhatsAppLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="rounded-[2.5rem] bg-white/95 p-6 shadow-lift sm:p-8">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-mint text-emerald">
          <Calendar className="size-5" aria-hidden="true" />
        </span>
        <div>
          <span className="rounded-full bg-bloom/20 px-2.5 py-0.5 text-xs font-bold text-forest">
            {copy.badge}
          </span>
          <h3 className="font-display text-xl font-bold text-forest">{copy.title}</h3>
        </div>
      </div>
      <p className="mt-2 text-sm text-charcoal/75 leading-relaxed">{copy.sub}</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 text-left">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
              {copy.nameLabel} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.namePlaceholder}
              className="w-full rounded-xl border border-forest/20 bg-cream/50 px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
              {copy.phoneLabel} *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={copy.phonePlaceholder}
              className="w-full rounded-xl border border-forest/20 bg-cream/50 px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
              {copy.serviceLabel}
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-xl border border-forest/20 bg-cream/50 px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
            >
              {copy.servicesList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
              {copy.locationLabel}
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-forest/20 bg-cream/50 px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
            >
              <option value="dhaka">{copy.locations.dhaka}</option>
              <option value="naogaon">{copy.locations.naogaon}</option>
              <option value="other">{copy.locations.other}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
            {copy.notesLabel}
          </label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={copy.notesPlaceholder}
            className="w-full resize-none rounded-xl border border-forest/20 bg-cream/50 px-3.5 py-2 text-sm text-charcoal outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
          />
        </div>

        <Button type="submit" size="lg" icon={MessageCircle} className="mt-2 w-full justify-center shadow-soft">
          {copy.submit}
        </Button>
      </form>
    </div>
  )
}

export default function Contact() {
  const { t, lang } = useLocale()
  const copy = t.contact
  const company = site.social.company
  const socials = [
    { key: 'facebook', Icon: FacebookIcon, url: company.facebook, label: t.about.founder.facebook },
    { key: 'instagram', Icon: InstagramIcon, url: company.instagram, label: t.about.founder.instagram },
    { key: 'youtube', Icon: YoutubeIcon, url: company.youtube, label: t.about.founder.youtube },
  ].filter((item) => item.url)

  return (
    <Section id="contact" compact className="pb-32 md:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.75rem] glass-green-strong p-7 shadow-lift sm:p-12 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-grid opacity-60" />
          <PlanTree className="pointer-events-none absolute -right-16 -top-16 size-72 text-forest/[0.09]" />
          <LeafDoodle className="pointer-events-none absolute bottom-6 right-8 hidden size-20 rotate-12 animate-sway text-emerald sm:block" />
          <ScissorsDoodle className="pointer-events-none absolute right-40 top-10 hidden size-14 -rotate-12 animate-float text-forest md:block" style={{ '--r': '-12deg' }} />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Header & Direct Channels */}
            <div className="lg:col-span-5">
              <span className="mb-5 inline-flex -rotate-1 items-center gap-2 rounded-full bg-bloom-soft px-3.5 py-1.5 text-sm font-semibold text-forest ring-1 ring-bloom/35">
                <Sprout className="size-4 text-bloom" aria-hidden="true" />
                {copy.eyebrow}
              </span>
              <h2 className="text-[clamp(1.9rem,4.2vw,3.3rem)]">{copy.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-body text-charcoal/75 sm:text-lg">{copy.sub}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={getWhatsAppLink(null, null, lang)} size="lg" icon={MessageCircle}>
                  {t.actions.whatsapp}
                </Button>
                <Button href={`tel:${site.phones[0].tel}`} variant="white" size="lg" icon={Phone}>
                  {t.actions.callNow}
                </Button>
              </div>

              {/* Direct Phone Numbers list */}
              <ul className="mt-8 grid gap-3">
                {site.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="group flex items-center gap-4 rounded-2xl bg-white/75 px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest text-white">
                        <Phone className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <span className="block font-display text-base font-bold text-forest">{phone.number}</span>
                        <span className="block text-xs text-charcoal/65">{phone.label[lang]}</span>
                      </div>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-center gap-4 rounded-2xl bg-white/75 px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest text-white">
                      <Mail className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block font-display text-base font-bold text-forest">{site.email}</span>
                      <span className="block text-xs text-charcoal/65">{copy.email}</span>
                    </div>
                  </a>
                </li>
              </ul>

              {socials.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-forest/75">{copy.follow}</p>
                  <ul className="flex items-center gap-3">
                    {socials.map(({ key, Icon, url, label }) => (
                      <li key={key}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="grid size-11 place-items-center rounded-full bg-white/80 text-forest transition hover:bg-forest hover:text-white"
                        >
                          <Icon size={20} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7">
              <BookingForm />
            </div>
          </div>
        </div>

        {/* Office & Nursery Addresses */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          <Office
            icon={MapPin}
            title={copy.corporate}
            address={copy.dhakaAddress}
          />
          <Office
            icon={Sprout}
            title={copy.nursery}
            address={copy.naogaonAddress}
            note={copy.nurseryNote}
          />
        </div>
      </Container>
    </Section>
  )
}
