import { Leaf } from 'lucide-react'

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Section({ id, className = '', compact = false, children, ...rest }) {
  return (
    <section
      id={id}
      // overflow-x-clip (not overflow-hidden) keeps decorative blobs from causing sideways scroll
      // while still letting the sticky panels inside the sections stick.
      className={`relative isolate overflow-x-clip ${compact ? 'py-16 sm:py-20 lg:py-24' : 'py-20 sm:py-24 lg:py-32'} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}

/**
 * Section title block. `split` (default) puts the title left and the lead paragraph
 * right on large screens; `center` stacks them centred (used by the closing CTA).
 */
export function SectionHeading({ eyebrow, icon: Icon = Leaf, title, sub, align = 'split', className = '', children }) {
  const centered = align === 'center'
  return (
    <div
      className={`mb-12 lg:mb-16 ${
        centered ? 'mx-auto max-w-3xl text-center' : 'grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12'
      } ${className}`}
    >
      <div className={centered ? '' : 'lg:col-span-7'}>
        {eyebrow && (
          <span className="mb-5 inline-flex -rotate-1 items-center gap-2 rounded-full bg-bloom-soft px-3.5 py-1.5 text-sm font-semibold text-forest ring-1 ring-bloom/35">
            <Icon className="size-4 text-bloom" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h2 className="text-[clamp(1.75rem,3.8vw,3rem)]">{title}</h2>
      </div>
      {sub && (
        <p className={`text-base leading-body text-charcoal/75 sm:text-lg ${centered ? 'mt-5' : 'lg:col-span-5'}`}>
          {sub}
        </p>
      )}
      {children}
    </div>
  )
}
