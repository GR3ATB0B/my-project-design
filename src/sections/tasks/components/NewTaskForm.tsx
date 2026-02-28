import { useState } from 'react'
import { X } from 'lucide-react'
import type { TaskAgent, TaskPriority } from '@/../product/sections/tasks/types'

interface NewTaskFormProps {
  agents: TaskAgent[]
  defaultColumnId: string
  onSubmit?: (task: { title: string; description: string; agentId: string; priority: TaskPriority; columnId: string }) => void
  onCancel?: () => void
}

const priorityConfig: Record<TaskPriority, { label: string; bg: string; text: string }> = {
  high: { label: 'High', bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400' },
  medium: { label: 'Medium', bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-600 dark:text-sky-400' },
  low: { label: 'Low', bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-500 dark:text-slate-400' },
}

export function NewTaskForm({ agents, defaultColumnId, onSubmit, onCancel }: NewTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [agentId, setAgentId] = useState(agents[0]?.id || '')
  const [priority, setPriority] = useState<TaskPriority>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit?.({
      title: title.trim(),
      description: description.trim(),
      agentId,
      priority,
      columnId: defaultColumnId,
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40" onClick={onCancel} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl w-full max-w-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">New Task</h2>
            <button
              type="button"
              onClick={onCancel}
              className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Fields */}
          <div className="px-5 py-4 space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                autoFocus
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional details..."
                rows={3}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                  Agent
                </label>
                <select
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
                >
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
                  Priority
                </label>
                <div className="flex gap-1.5">
                  {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => {
                    const pc = priorityConfig[p]
                    const isSelected = priority === p
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg transition-all ${
                          isSelected
                            ? `${pc.bg} ${pc.text} ring-1 ring-sky-400/50`
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {pc.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 text-sm font-medium px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:dark:bg-slate-800 disabled:text-slate-400 text-white rounded-lg transition-colors"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="text-sm font-medium px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
