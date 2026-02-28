import { useState, useMemo } from 'react'
import { Plus, Filter, X } from 'lucide-react'
import type { TasksProps, TaskPriority } from '@/../product/sections/tasks/types'
import { KanbanColumn } from './KanbanColumn'
import { TaskSlideOver } from './TaskSlideOver'
import { NewTaskForm } from './NewTaskForm'

export function TaskBoard({
  columns,
  agents,
  tasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskSelect,
  onTaskDeselect,
}: TasksProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [showNewTask, setShowNewTask] = useState(false)
  const [filterAgent, setFilterAgent] = useState<string>('')
  const [filterPriority, setFilterPriority] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  const sortedColumns = useMemo(
    () => [...columns].sort((a, b) => a.order - b.order),
    [columns]
  )

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filterAgent && t.agentId !== filterAgent) return false
      if (filterPriority && t.priority !== filterPriority) return false
      return true
    })
  }, [tasks, filterAgent, filterPriority])

  const selectedTask = tasks.find((t) => t.id === selectedTaskId)
  const hasActiveFilters = filterAgent || filterPriority

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId)
    onTaskSelect?.(taskId)
  }

  const handleCloseSlideOver = () => {
    setSelectedTaskId(null)
    onTaskDeselect?.()
  }

  const handleClearFilters = () => {
    setFilterAgent('')
    setFilterPriority('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4 shrink-0 flex-wrap">
        <button
          onClick={() => setShowNewTask(true)}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
        >
          <Plus size={14} />
          New Task
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            hasActiveFilters
              ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Filter size={12} />
          Filter
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X size={12} />
            Clear
          </button>
        )}

        {/* Filter dropdowns */}
        {showFilters && (
          <div className="flex items-center gap-2 ml-auto">
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
            >
              <option value="">All agents</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
            >
              <option value="">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        )}
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-3 h-full min-h-[400px]">
          {sortedColumns.map((col) => {
            const columnTasks = filteredTasks.filter((t) => t.columnId === col.id)
            return (
              <KanbanColumn
                key={col.id}
                column={col}
                tasks={columnTasks}
                agents={agents}
                onTaskClick={handleTaskClick}
                onTaskDrop={(taskId) => onTaskMove?.(taskId, col.id)}
                onDragStart={() => {}}
              />
            )
          })}
        </div>
      </div>

      {/* Slide-over */}
      {selectedTask && (
        <TaskSlideOver
          task={selectedTask}
          agents={agents}
          onClose={handleCloseSlideOver}
          onUpdate={(updates) => onTaskUpdate?.(selectedTask.id, updates)}
        />
      )}

      {/* New task modal */}
      {showNewTask && (
        <NewTaskForm
          agents={agents}
          defaultColumnId={sortedColumns[0]?.id || ''}
          onSubmit={(task) => {
            onTaskCreate?.(task)
            setShowNewTask(false)
          }}
          onCancel={() => setShowNewTask(false)}
        />
      )}
    </div>
  )
}
