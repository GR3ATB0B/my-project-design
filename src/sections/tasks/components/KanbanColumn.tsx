import { useState } from 'react'
import type { Task, TaskAgent, TaskColumn as TaskColumnType } from '@/../product/sections/tasks/types'
import { TaskCard } from './TaskCard'

interface KanbanColumnProps {
  column: TaskColumnType
  tasks: Task[]
  agents: TaskAgent[]
  onTaskClick?: (taskId: string) => void
  onTaskDrop?: (taskId: string) => void
  onDragStart?: (taskId: string) => void
}

const columnAccent: Record<string, { dot: string; dropBg: string }> = {
  'col-todo': { dot: 'bg-slate-400', dropBg: 'bg-slate-50 dark:bg-slate-800/50' },
  'col-doing': { dot: 'bg-sky-500', dropBg: 'bg-sky-50/50 dark:bg-sky-900/10' },
  'col-failed': { dot: 'bg-rose-500', dropBg: 'bg-rose-50/50 dark:bg-rose-900/10' },
  'col-done': { dot: 'bg-emerald-500', dropBg: 'bg-emerald-50/50 dark:bg-emerald-900/10' },
}

export function KanbanColumn({ column, tasks, agents, onTaskClick, onTaskDrop, onDragStart }: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false)
  const accent = columnAccent[column.id] || columnAccent['col-todo']

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDragLeave = () => {
    setIsOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(false)
    const taskId = e.dataTransfer.getData('text/plain')
    if (taskId) {
      onTaskDrop?.(taskId)
    }
  }

  return (
    <div
      className={`flex flex-col min-w-[280px] w-[280px] shrink-0 rounded-xl transition-colors ${
        isOver
          ? `${accent.dropBg} ring-2 ring-sky-300 dark:ring-sky-600 ring-inset`
          : 'bg-slate-50/50 dark:bg-slate-800/30'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 px-3 py-3">
        <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {column.name}
        </h3>
        <span
          className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums ml-auto"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2 min-h-[120px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            agent={agents.find((a) => a.id === task.agentId)}
            onClick={() => onTaskClick?.(task.id)}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', task.id)
              onDragStart?.(task.id)
            }}
          />
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-20 text-xs text-slate-400 dark:text-slate-500 italic">
            No tasks
          </div>
        )}
      </div>
    </div>
  )
}
