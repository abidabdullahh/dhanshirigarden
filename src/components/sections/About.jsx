import { Mail, MessageCircle, Phone, Sprout, Users } from 'lucide-react'
import { site } from '../../data/site'
import { useLocale } from '../../lib/locale'
import { teamPhoto } from '../../lib/teamPhotos'
import { getWhatsAppLink } from '../../lib/whatsapp'
import Button from '../ui/Button'
import { CompassDoodle, LeafDoodle, SproutDoodle, TrowelDoodle } from '../ui/Doodles'
import { socialIcons } from '../ui/socialIcons'
import { Container, Section, SectionHeading } from '../ui/Section'

const SOCIAL_KEYS = ['facebook', 'instagram', 'linkedin', 'youtube']
const teamMeta = {
  horticulturist: { Doodle: SproutDoodle, photo: 'horticulturist', tone: 'from-mint to-bright/40' },
  architect: { Doodle: CompassDoodle, photo: 'architect', tone: 'from-[#e6eef2] to-[#c9dbe6]' },
  nurserymen: { Doodle: TrowelDoodle, photo: 'nurserymen', tone: 'from-bloom-soft to-bloom/30' },
}

function FounderPortrait() {
  const { t } = useLocale()
  const copy = t.about.founder
  const src = teamPhoto('amir-ali')

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      <div aria-hidden="true" className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-bright/30" />
      <div className="relative h-full overflow-hidden bg-mint shadow-lift ring-8 ring-white leaf-a">
        {src ? (
          <img src={src} alt={copy.photoAlt} className="h-full w-full object-cover" />
        ) : (
          <div className="relative grid h-full w-full place-items-center bg-linear-to-br from-mint via-white to-bright/40">
            <svg viewBox="0 0 120 150" className="absolute bottom-0 h-[78%] w-auto text-forest/[0.14]" aria-hidden="true">
              <circle cx="60" cy="44" r="26" fill="currentColor" />
              <path d="M8 150c0-34 22-56 52-56s52 22 52 56z" fill="currentColor" />
            </svg>
            <SproutDoodle className="absolute right-[12%] top-[14%] size-16 animate-sway text-emerald" />
            <p className="absolute inset-x-6 bottom-6 rounded-full glass-white px-4 py-2 text-center text-sm font-semibold text-forest">
              {copy.photoNote}
            </p>
          </div>
        )}
      </div>
      <span className="absolute -bottom-3 -left-3 -rotate-6 rounded-2xl bg-bloom px-4 py-2 font-display text-base font-bold text-charcoal shadow-soft sm:-left-5">
        {copy.sticker}
      </span>
      <LeafDoodle className="absolute -right-4 -top-5 size-14 rotate-12 animate-float text-emerald" style={{ '--r': '12deg' }} />
      <TrowelDoodle className="absolute -bottom-5 right-6 size-14 text-forest" />
    </div>
  )
}

function SocialRow() {
  const { t } = useLocale()
  const copy = t.about.founder
  const links = site.social.founder
  const dev = import.meta.env.DEV

  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {SOCIAL_KEYS.map((key) => {
        const Icon = socialIcons[key]
        const url = links[key]
        if (!url && !dev) return null
        return (
          <li key={key}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy[key]} — ${copy.name}`}
                className="grid size-11 place-items-center rounded-full glass-green text-forest transition duration-200 hover:-translate-y-0.5 hover:bg-forest hover:text-white"
              >
                <Icon size={20} />
              </a>
            ) : (
              <span
                title="DEV only: add this URL in src/data/site.js (hidden on the live site until set)"
                className="grid size-11 place-items-center rounded-full border-2 border-dashed border-forest/30 text-forest/40"
              >
                <Icon size={20} />
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function TeamCard({ memberKey }) {
  const { t, lang } = useLocale()
  const member = t.about.team.members[memberKey]
  const meta = teamMeta[memberKey]
  const src = teamPhoto(meta.photo)
  const Doodle = meta.Doodle

  return (
    <article className="group relative flex flex-col rounded-[2rem] glass-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className={`relative mb-6 aspect-[5/4] w-full overflow-hidden bg-linear-to-br ${meta.tone} leaf-a`}>
        {src ? (
          <img src={src} alt={member.role} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Doodle className="size-28 text-forest transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" strokeWidth={2.2} />
          </div>
        )}
      </div>
      <h3 className="text-[1.35rem]">{member.role}</h3>
      <p
        lang={lang === 'bn' ? 'en' : 'bn'}
        style={{ fontFamily: lang === 'bn' ? 'var(--font-body-en)' : 'var(--font-body-bn)' }}
        className="mt-0.5 text-sm font-medium text-emerald"
      >
        {member.roleEn}
      </p>
      <p className="mt-3 text-[0.95rem] leading-body text-charcoal/75">{member.desc}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
        {member.skills.map((skill) => (
          <li key={skill} className="rounded-full bg-mint px-3 py-1 text-[0.82rem] font-semibold text-forest">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function About() {
  const { t, lang } = useLocale()
  const copy = t.about
  const founder = copy.founder
  const phone = site.phones[0]

  return (
    <Section id="about">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-mint/45 to-transparent" />
      <div aria-hidden="true" className="absolute -left-20 top-40 -z-10 size-96 rounded-full bg-bright/25 blur-3xl" />
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} icon={Users} title={copy.title} />

        <div className="relative grid gap-12 rounded-[2.75rem] glass-white p-6 shadow-lift sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
          <div className="lg:col-span-5">
            <FounderPortrait />
          </div>

          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-sm font-semibold text-emerald">
              <Sprout className="size-4" aria-hidden="true" />
              {founder.role}
            </p>
            <h3 className="mt-4 text-[clamp(2rem,4.4vw,3.3rem)]">{founder.name}</h3>

            <ul className="mt-5 flex flex-wrap gap-2">
              {founder.creds.map((cred) => (
                <li key={cred} className="rounded-full glass-green px-3.5 py-1.5 text-sm font-semibold text-forest">
                  {cred}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-4 text-base leading-body text-charcoal/80 sm:text-[1.05rem]">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 border-t border-dashed border-forest/20 pt-6">
              <p className="mb-3 font-display text-base font-semibold text-forest">{founder.connect}</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Button href={getWhatsAppLink(null, null, lang)} icon={MessageCircle}>
                  {founder.whatsapp}
                </Button>
                <Button href={`tel:${phone.tel}`} variant="glass" icon={Phone}>
                  {founder.call}
                </Button>
                <Button href={`mailto:${site.email}`} variant="outline" icon={Mail}>
                  {founder.email}
                </Button>
              </div>
              <div className="mt-4">
                <SocialRow />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <div className="mb-8 max-w-2xl">
            <h3 className="text-2xl sm:text-[2rem]">{copy.team.title}</h3>
            <p className="mt-2 text-base leading-body text-charcoal/70">{copy.team.sub}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
            {Object.keys(copy.team.members).map((key) => (
              <TeamCard key={key} memberKey={key} />
            ))}
          </div>
          <p className="mt-6 text-center text-[0.9rem] text-charcoal/65">{copy.team.footnote}</p>
        </div>
      </Container>
    </Section>
  )
}
