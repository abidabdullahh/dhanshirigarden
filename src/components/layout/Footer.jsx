import { useLocale } from '../../lib/locale'
import { Container } from '../ui/Section'
import Logo from '../ui/Logo'

const links = [
  ['services', 'services'],
  ['projects', 'projects'],
  ['gallery', 'gallery'],
  ['plant-doctor', 'plantDoctor'],
  ['care-plans', 'carePlans'],
  ['blog', 'blog'],
  ['about', 'about'],
  ['contact', 'contact'],
]

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t, n } = useLocale()
  return (
    <footer className="relative border-t border-forest/10 bg-mint/50 pb-28 pt-12 md:pb-12">
      <Container className="grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-body text-charcoal/65">{t.meta.description}</p>
        </div>
        <nav aria-label={t.brand.name} className="md:col-span-7">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            {links.map(([id, key]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-[0.95rem] font-semibold text-forest/80 transition-colors hover:text-forest">
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="mt-10 flex flex-col gap-2 border-t border-dashed border-forest/15 pt-6 text-[0.82rem] leading-snug text-charcoal/60 md:flex-row md:items-center md:justify-between">
        <p>
          © {n(YEAR)} {t.brand.name}. {t.footer.rights}.
        </p>
        <p className="md:text-right">
          {t.footer.photoCredit} · {t.footer.fontCredit}
        </p>
      </Container>
    </footer>
  )
}
