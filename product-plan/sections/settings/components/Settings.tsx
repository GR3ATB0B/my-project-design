import { useState } from 'react'
import { Settings as SettingsIcon, Plug, Shield } from 'lucide-react'
import type { SettingsProps, SettingsCategory } from '../types'
import { GeneralSettings } from './GeneralSettings'
import { ConnectionsSettings } from './ConnectionsSettings'
import { PrivacySettings } from './PrivacySettings'

const categories: { key: SettingsCategory; label: string; icon: typeof SettingsIcon }[] = [
  { key: 'general', label: 'General', icon: SettingsIcon },
  { key: 'connections', label: 'Connections', icon: Plug },
  { key: 'privacy', label: 'Privacy', icon: Shield },
]

export function Settings({
  general,
  connections,
  privacy,
  onSaveGeneral,
  onToggleConnection,
  onSavePrivacy,
}: SettingsProps) {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('general')

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* Sidebar — horizontal on mobile, vertical on desktop */}
        <nav className="flex sm:flex-col gap-1 sm:w-44 shrink-0 overflow-x-auto sm:overflow-visible border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-3 sm:pb-0 sm:pr-6">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Icon size={15} strokeWidth={1.5} />
                {cat.label}
              </button>
            )
          })}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeCategory === 'general' && (
            <GeneralSettings settings={general} onSave={onSaveGeneral} />
          )}
          {activeCategory === 'connections' && (
            <ConnectionsSettings connections={connections} onToggle={onToggleConnection} />
          )}
          {activeCategory === 'privacy' && (
            <PrivacySettings settings={privacy} onSave={onSavePrivacy} />
          )}
        </div>
      </div>
    </div>
  )
}
