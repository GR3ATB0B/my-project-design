import type { Task, TaskAgent, TaskPriority } from '../types'

interface TaskCardProps {
  task: Task
  agent?: TaskAgent
  onClick?: () => void
  onDragStart?: (e: React.DragEvent) => void
}

const priorityConfig: Record<TaskPriority, { label: string; bg: string; text: string }> = {
  high: {
    label: 'High',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-600 dark:text-rose-400',
  },
  medium: {
    label: 'Med',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    text: 'text-sky-600 dark:text-sky-400',
  },
  low: {
    label: 'Low',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-500 dark:text-slate-400',
  },
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)

  if (diffMins < 1) return 'now'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function TaskCard({ task, agent, onClick, onDragStart }: TaskCardProps) {
  const priority = priorityConfig[task.priority]
  const initials = agent?.name.slice(0, 2).toUpperCase() || '??'

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 cursor-pointer transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-sm active:shadow-none active:scale-[0.98]"
    >
      {/* Title */}
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug mb-1.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
        {task.title}
      </p>

      {/* Description preview */}
      {task.description && (
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-2 mb-2.5">
          {task.description}
        </p>
      )}

      {/* Bottom row: agent + priority + time */}
      <div className="flex items-center gap-2">
        {/* Agent */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
            style={{ backgroundColor: agent?.avatarColor || '#94a3b8' }}
          >
            {initials}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {agent?.name || 'Unassigned'}
          </span>
        </div>

        <div className="flex-1" />

        {/* Priority */}
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${priority.bg} ${priority.text}`}>
          {priority.label}
        </span>

        {/* Timestamp */}
        <span
          className="text-[10px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {formatTime(task.updatedAt)}
        </span>
      </div>
    </div>
  )
}
