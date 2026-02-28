import { Cog } from 'lucide-react'
import { MainNav, type NavigationItem } from './MainNav'
import { UserMenu } from './UserMenu'

interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: { name: string; avatarUrl?: string }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-[Inter]">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <Cog size={22} className="text-sky-500" />
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                OpenClaw<span className="text-sky-500">HQ</span>
              </span>
            </div>

            {/* Navigation */}
            <MainNav items={navigationItems} onNavigate={onNavigate} />

            {/* User menu */}
            {user && <UserMenu user={user} onLogout={onLogout} />}
          </div>
        </div>
      </header>

      {/* Content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  )
}
