import {
  LayoutDashboard,
  Bot,
  KanbanSquare,
  Coins,
  Brain,
  Settings,
} from 'lucide-react'
import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={16} />, isActive: true },
    { label: 'Agents', href: '/agents', icon: <Bot size={16} /> },
    { label: 'Tasks', href: '/tasks', icon: <KanbanSquare size={16} />, badge: 3 },
    { label: 'Tokens', href: '/tokens', icon: <Coins size={16} /> },
    { label: 'Memory', href: '/memory', icon: <Brain size={16} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={16} /> },
  ]

  const user = {
    name: 'Alex Morgan',
    avatarUrl: undefined,
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
    >
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Content Area
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Section content will render here.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
