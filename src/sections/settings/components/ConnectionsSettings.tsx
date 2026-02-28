import type { ConnectionService } from '@/../product/sections/settings/types'

interface ConnectionsSettingsProps {
  connections: ConnectionService[]
  onToggle?: (serviceId: string, connected: boolean) => void
}

const serviceIcons: Record<string, string> = {
  Slack: '💬',
  Gmail: '✉️',
  GitHub: '🐙',
  'Google Calendar': '📅',
  Linear: '📐',
  Notion: '📝',
  WhatsApp: '📱',
  Telegram: '✈️',
  Spotify: '🎵',
  PagerDuty: '🚨',
}

export function ConnectionsSettings({ connections, onToggle }: ConnectionsSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Connections</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">Connect or disconnect external services and chat apps.</p>
      </div>

      <div className="space-y-1">
        {connections.map((svc) => (
          <div
            key={svc.id}
            className="flex items-center gap-3 py-3 px-3 -mx-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span className="text-lg shrink-0">{serviceIcons[svc.service] || '🔗'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{svc.service}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{svc.description}</p>
            </div>
            <button
              onClick={() => onToggle?.(svc.id, !svc.connected)}
              className={`relative w-10 h-[22px] rounded-full transition-colors shrink-0 ${
                svc.connected
                  ? 'bg-sky-500'
                  : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  svc.connected ? 'left-[22px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
