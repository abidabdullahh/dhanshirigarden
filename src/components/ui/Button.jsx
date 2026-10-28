const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-6 py-3.5 text-base',
}

const variants = {
  primary:
    'bg-gradient-to-r from-forest via-emerald to-forest text-white shadow-soft hover:shadow-lift border border-emerald-400/30 backdrop-blur-md',
  bright: 'bg-bright text-forest shadow-soft hover:bg-[#6cc59b]',
  sun: 'glass-amber text-charcoal shadow-soft hover:brightness-105',
  white: 'bg-white/90 backdrop-blur-md text-forest border border-white shadow-soft hover:bg-white hover:shadow-lift',
  glass: 'glass-card text-forest hover:bg-white/90 hover:text-emerald hover:border-emerald-300 shadow-soft',
  'glass-emerald': 'glass-emerald hover:brightness-110 shadow-lift',
  outline: 'border border-forest/25 bg-white/40 backdrop-blur-md text-forest hover:border-forest hover:bg-forest hover:text-white',
}

/** Link-styled-as-button when `href` is given, otherwise a real <button>. */
export default function Button({ href, variant = 'primary', size = 'md', icon: Icon, className = '', children, ...rest }) {
  const classes = `${base} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`
  const content = (
    <>
      {Icon && (
        <Icon
          className="size-[1.15em] shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </>
  )

  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
