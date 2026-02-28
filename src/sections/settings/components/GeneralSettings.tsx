import { useState } from 'react'
import type { GeneralSettings as GeneralSettingsType, TaskPriorityDefault, ThemePreference, Language } from '@/../product/sections/settings/types'

interface GeneralSettingsProps {
  settings: GeneralSettingsType
  onSave?: (settings: GeneralSettingsType) => void
}

const timezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
]

const languages: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
  { value: 'pt', label: 'Português' },
]

export function GeneralSettings({ settings, onSave }: GeneralSettingsProps) {
  const [form, setForm] = useState(settings)

  const handleSave = () => onSave?.(form)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">General</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">Agent defaults and appearance preferences.</p>
      </div>

      {/* Agent Name Prefix */}
      <div>
        <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
          Agent Name Prefix
        </label>
        <input
          type="text"
          value={form.agentNamePrefix}
          onChange={(e) => setForm({ ...form, agentNamePrefix: e.target.value })}
          className="w-full max-w-xs px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
        />
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          Default prefix when creating new agents (e.g. "Agent-1", "Agent-2")
        </p>
      </div>

      {/* Default Priority */}
      <div>
        <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
          Default Priority
        </label>
        <select
          value={form.defaultPriority}
          onChange={(e) => setForm({ ...form, defaultPriority: e.target.value as TaskPriorityDefault })}
          className="w-full max-w-xs px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Timezone */}
      <div>
        <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
          Timezone
        </label>
        <select
          value={form.timezone}
          onChange={(e) => setForm({ ...form, timezone: e.target.value })}
          className="w-full max-w-xs px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Theme */}
      <div>
        <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
          Theme
        </label>
        <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          {(['light', 'dark', 'system'] as ThemePreference[]).map((t) => (
            <button
              key={t}
              onClick={() => setForm({ ...form, theme: t })}
              className={`px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                form.theme === t
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
          Language
        </label>
        <select
          value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value as Language })}
          className="w-full max-w-xs px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

      {/* Save */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          className="text-sm font-medium px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
