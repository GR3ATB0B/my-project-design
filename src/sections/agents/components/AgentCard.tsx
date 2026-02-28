import type { Agent } from '@/../product/sections/agents/types'

interface AgentCardProps {
  agent: Agent
  onClick?: () => void
}

const serviceIcons: Record<string, string> = {
  Slack: '💬',
  Gmail: '✉️',
  WhatsApp: '📱',
  GitHub: '🐙',
  Linear: '📐',
  'Google Calendar': '📅',
  Telegram: '✈️',
  Spotify: '🎵',
  Notion: '📝',
  PagerDuty: '🚨',
  'AWS CloudWatch': '☁️',
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const initials = agent.name.slice(0, 2).toUpperCase()
  const isOnline = agent.status === 'online'
  const connectedCount = agent.connections.filter((c) => c.status === 'connected').length
  const errorCount = agent.connections.filter((c) => c.status === 'error').length

  return (
    <button
      onClick={onClick}
      className="w-full text-left group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-sm"
    >
      {/* Header row */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: agent.avatarColor }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {agent.name}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
            <span className="text-[11px] text-slate-400 dark:text-slate-500 capitalize">
              {agent.status}
            </span>
          </div>
        </div>
      </div>

      {/* Current task */}
      {agent.currentTask ? (
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
          {agent.currentTask}
        </p>
      ) : (
        <p className="text-xs text-slate-400 dark:text-slate-500 italic mb-3">
          No active task
        </p>
      )}

      {/* Connections */}
      <div className="flex items-center gap-1 flex-wrap">
        {agent.connections.slice(0, 4).map((conn) => (
          <span
            key={conn.id}
            className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-full ${
              conn.status === 'connected'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                : conn.status === 'error'
                  ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500'
            }`}
            title={`${conn.service}: ${conn.channel}`}
          >
            <span className="text-[10px]">{serviceIcons[conn.service] || '🔗'}</span>
            {conn.service}
          </span>
        ))}
        {agent.connections.length > 4 && (
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            +{agent.connections.length - 4}
          </span>
        )}
      </div>

      {/* Bottom stats row */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <span
          className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {agent.stats.tasksCompleted} done
        </span>
        {connectedCount > 0 && (
          <span
            className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {connectedCount} connected
          </span>
        )}
        {errorCount > 0 && (
          <span
            className="text-[11px] text-amber-500 dark:text-amber-400 tabular-nums"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {errorCount} error
          </span>
        )}
      </div>
    </button>
  )
}
