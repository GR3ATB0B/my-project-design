import { useState } from 'react'
import type { PrivacySettings as PrivacySettingsType } from '@/../product/sections/settings/types'

interface PrivacySettingsProps {
  settings: PrivacySettingsType
  onSave?: (settings: PrivacySettingsType) => void
}

interface ToggleRowProps {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-[22px] rounded-full transition-colors shrink-0 mt-0.5 ${
          checked
            ? 'bg-sky-500'
            : 'bg-slate-200 dark:bg-slate-700'
        }`}
      >
        <span
          className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'left-[22px]' : 'left-[3px]'
          }`}
        />
      </button>
    </div>
  )
}

export function PrivacySettings({ settings, onSave }: PrivacySettingsProps) {
  const [form, setForm] = useState(settings)

  const handleSave = () => onSave?.(form)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Privacy</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">Control how your data is collected, stored, and used.</p>
      </div>

      <div>
        <ToggleRow
          label="Data Collection"
          description="Allow OpenClaw to collect anonymous usage data to improve the product. No personal data or conversation content is included."
          checked={form.dataCollection}
          onChange={(v) => setForm({ ...form, dataCollection: v })}
        />
        <ToggleRow
          label="Memory Persistence"
          description="Allow agents to save learned preferences and facts to memory. Disabling this means agents start fresh each session."
          checked={form.memoryPersistence}
          onChange={(v) => setForm({ ...form, memoryPersistence: v })}
        />
        <ToggleRow
          label="Sandboxed Mode"
          description="Restrict agents from making external API calls or accessing connected services. Useful for testing or sensitive environments."
          checked={form.sandboxedMode}
          onChange={(v) => setForm({ ...form, sandboxedMode: v })}
        />
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
