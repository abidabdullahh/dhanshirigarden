import { useRef } from 'react'

/**
 * Accessible pill tabs (roving focus, arrow keys, Home/End). The caller renders the panel with
 * role="tabpanel", id=`${idPrefix}-panel` and aria-labelledby=`${idPrefix}-tab-${value}`.
 */
export default function Tabs({ tabs, value, onChange, label, idPrefix, className = '', scroll = false }) {
  const refs = useRef([])

  const move = (index) => {
    const next = (index + tabs.length) % tabs.length
    onChange(next)
    refs.current[next]?.focus()
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      move(value + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      move(value - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      move(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      move(tabs.length - 1)
    }
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`flex gap-2 ${scroll ? 'no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0' : 'flex-wrap'} ${className}`}
    >
      {tabs.map((tab, index) => {
        const selected = index === value
        return (
          <button
            key={tab.id ?? tab.label}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${index}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(index)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-[0.95rem] font-semibold transition-colors duration-200 ${
              selected ? 'bg-forest text-white shadow-soft' : 'glass-white text-forest/80 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
