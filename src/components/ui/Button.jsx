const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-[0.95rem]',
  lg: 'px-7 py-4 text-base',
}

const variants = {
  primary: 'bg-forest text-white shadow-soft hover:bg-emerald hover:shadow-lift',
  bright: 'bg-bright text-forest shadow-soft hover:bg-[#6cc59b]',
  sun: 'bg-bloom text-charcoal shadow-soft hover:bg-[#e3a73c]',
  white: 'bg-white text-forest shadow-soft hover:bg-mint',
  glass: 'glass-green text-forest hover:bg-bright/25',
  outline: 'border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-white',
}

/** Link-styled-as-button when `href` is given, otherwise a real <button>. */
export default function Button({ href, variant = 'primary', size = 'md', icon: Icon, className = '', children, ...rest }) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`
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
