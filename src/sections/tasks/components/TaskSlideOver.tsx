import { useState } from 'react'
import { X, CheckCircle2, ArrowRightLeft, Pencil, Plus } from 'lucide-react'
import type { Task, TaskAgent, TaskPriority, TaskActivityType } from '@/../product/sections/tasks/types'

interface TaskSlideOverProps {
  task: Task
  agents: TaskAgent[]
  onClose?: () => void
  onUpdate?: (updates: Partial<Pick<Task, 'title' | 'description' | 'agentId' | 'priority'>>) => void
}

const priorityConfig: Record<TaskPriority, { label: string; bg: string; text: string }> = {
  high: { label: 'High', bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400' },
  medium: { label: 'Medium', bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-600 dark:text-sky-400' },
  low: { label: 'Low', bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-500 dark:text-slate-400' },
}

const activityConfig: Record<TaskActivityType, { icon: typeof CheckCircle2; color: string }> = {
  created: { icon: Plus, color: 'text-slate-400 dark:text-slate-500' },
  status_change: { icon: ArrowRightLeft, color: 'text-sky-500 dark:text-sky-400' },
  edited: { icon: Pencil, color: 'text-violet-500 dark:text-violet-400' },
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

export function TaskSlideOver({ task, agents, onClose, onUpdate }: TaskSlideOverProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description)
  const [editAgentId, setEditAgentId] = useState(task.agentId)
  const [editPriority, setEditPriority] = useState<TaskPriority>(task.priority)

  const agent = agents.find((a) => a.id === task.agentId)
  const priority = priorityConfig[task.priority]

  const handleSave = () => {
    onUpdate?.({
      title: editTitle,
      description: editDesc,
      agentId: editAgentId,
      priority: editPriority,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDesc(task.description)
    setEditAgentId(task.agentId)
    setEditPriority(task.priority)
    setIsEditing(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 z-50 flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${priority.bg} ${priority.text}`}>
              {priority.label}
            </span>
            {agent && (
              <div className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ backgroundColor: agent.avatarColor }}
                >
                  {agent.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{agent.name}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Pencil size={14} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {isEditing ? (
            <div className="space-y-4">
              {/* Edit title */}
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
                />
              </div>

              {/* Edit description */}
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                  Description
                </label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 resize-none"
                />
              </div>

              {/* Edit agent */}
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                  Agent
                </label>
                <select
                  value={editAgentId}
                  onChange={(e) => setEditAgentId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
                >
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              {/* Edit priority */}
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                  Priority
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => {
                    const pc = priorityConfig[p]
                    const isSelected = editPriority === p
                    return (
                      <button
                        key={p}
                        onClick={() => setEditPriority(p)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                          isSelected
                            ? `${pc.bg} ${pc.text} ring-2 ring-offset-1 ring-offset-white dark:ring-offset-slate-950 ring-sky-400`
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {pc.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Save / Cancel */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 text-sm font-medium px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="text-sm font-medium px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Title */}
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {task.title}
              </h2>

              {/* Description */}
              {task.description ? (
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {task.description}
                </p>
              ) : (
                <p className="text-sm text-slate-400 dark:text-slate-500 italic mb-6">
                  No description
                </p>
              )}

              {/* Meta row */}
              <div className="grid grid-cols-2 gap-4 mb-6 py-4 px-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Created</p>
                  <p
                    className="text-xs text-slate-600 dark:text-slate-300 tabular-nums"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {formatTime(task.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Updated</p>
                  <p
                    className="text-xs text-slate-600 dark:text-slate-300 tabular-nums"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {formatTime(task.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Activity */}
              <h3 className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Activity
              </h3>
              <div className="space-y-0">
                {task.activity.map((act) => {
                  const config = activityConfig[act.type]
                  const Icon = config.icon
                  const label =
                    act.type === 'status_change'
                      ? `${act.from} → ${act.to}`
                      : act.description || act.type

                  return (
                    <div key={act.id} className="flex items-start gap-2.5 py-2">
                      <Icon size={12} className={`${config.color} mt-0.5 shrink-0`} />
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex-1">{label}</p>
                      <span
                        className="text-[10px] text-slate-400 dark:text-slate-500 tabular-nums shrink-0"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {formatTime(act.timestamp)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
