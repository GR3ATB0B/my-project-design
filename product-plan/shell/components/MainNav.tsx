import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
  isActive?: boolean
  badge?: string | number
}

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleClick = (href: string) => {
    onNavigate?.(href)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        {items.map((item) => (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            className={`
              relative px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2
              ${
                item.isActive
                  ? 'text-sky-600 dark:text-sky-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            {item.icon}
            {item.label}
            {item.badge != null && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-medium rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                {item.badge}
              </span>
            )}
            {item.isActive && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg z-50">
          <nav className="flex flex-col p-2">
            {items.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`
                  flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors
                  ${
                    item.isActive
                      ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                {item.icon}
                {item.label}
                {item.badge != null && (
                  <span className="ml-auto px-1.5 py-0.5 text-xs font-medium rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
