import { CheckCircle2, Play, Send, Brain, AlertTriangle } from 'lucide-react'
import type { AgentActivity, ActivityEvent, ActivityEventType } from '../types'

interface AgentActivityGroupProps {
  agent: AgentActivity
  onAgentClick?: () => void
}

const eventConfig: Record<ActivityEventType, { icon: typeof CheckCircle2; color: string; borderColor: string }> = {
  task_completed: {
    icon: CheckCircle2,
    color: 'text-emerald-500 dark:text-emerald-400',
    borderColor: 'border-l-emerald-400 dark:border-l-emerald-500',
  },
  task_started: {
    icon: Play,
    color: 'text-sky-500 dark:text-sky-400',
    borderColor: 'border-l-sky-400 dark:border-l-sky-500',
  },
  message_sent: {
    icon: Send,
    color: 'text-slate-400 dark:text-slate-500',
    borderColor: 'border-l-slate-300 dark:border-l-slate-600',
  },
  memory_saved: {
    icon: Brain,
    color: 'text-violet-500 dark:text-violet-400',
    borderColor: 'border-l-violet-400 dark:border-l-violet-500',
  },
  needs_attention: {
    icon: AlertTriangle,
    color: 'text-amber-500 dark:text-amber-400',
    borderColor: 'border-l-amber-400 dark:border-l-amber-500',
  },
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function EventRow({ event }: { event: ActivityEvent }) {
  const config = eventConfig[event.type]
  const Icon = config.icon

  return (
    <div className={`flex items-start gap-3 py-2.5 pl-4 border-l-2 ${config.borderColor}`}>
      <Icon size={14} className={`${config.color} shrink-0 mt-0.5`} />
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug flex-1 min-w-0">
        {event.description}
      </p>
      <span
        className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0 tabular-nums"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        {formatTime(event.timestamp)}
      </span>
    </div>
  )
}

export function AgentActivityGroup({ agent, onAgentClick }: AgentActivityGroupProps) {
  const initials = agent.agentName.slice(0, 2).toUpperCase()

  return (
    <div className="py-5 first:pt-0">
      {/* Agent header */}
      <button
        onClick={() => onAgentClick?.()}
        className="flex items-center gap-3 mb-3 group/agent w-full text-left"
      >
        <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold flex items-center justify-center shrink-0">
          {initials}
        </span>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover/agent:text-sky-600 dark:group-hover/agent:text-sky-400 transition-colors">
          {agent.agentName}
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            agent.agentStatus === 'online'
              ? 'bg-emerald-500'
              : 'bg-slate-300 dark:bg-slate-600'
          }`}
        />
        <span className="text-[11px] text-slate-400 dark:text-slate-500 capitalize">
          {agent.agentStatus}
        </span>
      </button>

      {/* Events */}
      {agent.events.length > 0 ? (
        <div className="ml-[44px] space-y-0.5">
          {agent.events.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="ml-[44px] text-sm text-slate-400 dark:text-slate-500 italic">
          No recent activity
        </p>
      )}
    </div>
  )
}
