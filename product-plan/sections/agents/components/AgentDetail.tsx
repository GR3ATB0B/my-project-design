import { useState } from 'react'
import { ArrowLeft, Play, Square, RotateCcw, CheckCircle2, Send, Brain, AlertTriangle } from 'lucide-react'
import type { Agent, ActivityEventType, Connection, Skill, ActivityEvent } from '../types'

interface AgentDetailProps {
  agent: Agent
  onBack?: () => void
  onStart?: () => void
  onStop?: () => void
  onRestart?: () => void
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

type Tab = 'activity' | 'connections' | 'skills'

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

function formatUptime(seconds: number): string {
  if (seconds === 0) return 'Offline'
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  if (days > 0) return `${days}d ${hours}h`
  return `${hours}h`
}

function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`
  if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(0)}K`
  return tokens.toString()
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

function ConnectionRow({ connection }: { connection: Connection }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="text-base">{serviceIcons[connection.service] || '🔗'}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{connection.service}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{connection.channel}</p>
      </div>
      <span
        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
          connection.status === 'connected'
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
            : connection.status === 'error'
              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
        }`}
      >
        {connection.status}
      </span>
    </div>
  )
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
        <span className="text-violet-500 dark:text-violet-400 text-xs font-bold">
          {skill.name.charAt(0)}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{skill.name}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{skill.description}</p>
      </div>
    </div>
  )
}

export function AgentDetail({ agent, onBack, onStart, onStop, onRestart }: AgentDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('activity')
  const isOnline = agent.status === 'online'
  const initials = agent.name.slice(0, 2).toUpperCase()

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'activity', label: 'Activity', count: agent.activity.length },
    { key: 'connections', label: 'Connections', count: agent.connections.length },
    { key: 'skills', label: 'Skills', count: agent.skills.length },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        All Agents
      </button>

      {/* Agent header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
          style={{ backgroundColor: agent.avatarColor }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {agent.name}
            </h1>
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
            <span className="text-xs text-slate-400 dark:text-slate-500 capitalize">
              {agent.status}
            </span>
          </div>
          {agent.currentTask && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {agent.currentTask}
            </p>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isOnline ? (
            <>
              <button
                onClick={onStop}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Square size={12} />
                Stop
              </button>
              <button
                onClick={onRestart}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors"
              >
                <RotateCcw size={12} />
                Restart
              </button>
            </>
          ) : (
            <button
              onClick={onStart}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
            >
              <Play size={12} />
              Start
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 py-4 px-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Uptime</p>
          <p
            className="text-lg font-light text-slate-700 dark:text-slate-300 tabular-nums"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {formatUptime(agent.stats.uptimeSeconds)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Tokens</p>
          <p
            className="text-lg font-light text-slate-700 dark:text-slate-300 tabular-nums"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {formatTokens(agent.stats.totalTokensUsed)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Completed</p>
          <p
            className="text-lg font-light text-emerald-600 dark:text-emerald-400 tabular-nums"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {agent.stats.tasksCompleted}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Cost</p>
          <p
            className="text-lg font-light text-slate-700 dark:text-slate-300 tabular-nums"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            ${agent.stats.totalCost.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-slate-200 dark:border-slate-800 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
            <span
              className="ml-1.5 text-[11px] tabular-nums text-slate-400 dark:text-slate-500"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'activity' && (
          agent.activity.length > 0 ? (
            <div className="space-y-0.5">
              {agent.activity.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500 italic py-8 text-center">
              No activity recorded
            </p>
          )
        )}

        {activeTab === 'connections' && (
          <div>
            {agent.connections.map((conn) => (
              <ConnectionRow key={conn.id} connection={conn} />
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            {agent.skills.map((skill) => (
              <SkillRow key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
