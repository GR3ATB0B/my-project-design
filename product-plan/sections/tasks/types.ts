export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskActivityType = 'created' | 'status_change' | 'edited'

/** A column on the kanban board */
export interface TaskColumn {
  id: string
  name: string
  order: number
}

/** A lightweight agent reference for assignment and display */
export interface TaskAgent {
  id: string
  name: string
  avatarColor: string
}

/** A log entry for changes made to a task */
export interface TaskActivity {
  id: string
  type: TaskActivityType
  description?: string
  from?: string
  to?: string
  timestamp: string
}

/** A unit of work on the kanban board */
export interface Task {
  id: string
  title: string
  description: string
  columnId: string
  agentId: string
  priority: TaskPriority
  createdAt: string
  updatedAt: string
  activity: TaskActivity[]
}

/** Props for the Tasks section */
export interface TasksProps {
  columns: TaskColumn[]
  agents: TaskAgent[]
  tasks: Task[]
  /** Called when a task is dragged to a different column */
  onTaskMove?: (taskId: string, targetColumnId: string) => void
  /** Called when the user creates a new task */
  onTaskCreate?: (task: { title: string; description: string; agentId: string; priority: TaskPriority; columnId: string }) => void
  /** Called when the user updates a task's details */
  onTaskUpdate?: (taskId: string, updates: Partial<Pick<Task, 'title' | 'description' | 'agentId' | 'priority'>>) => void
  /** Called when the user clicks a task card to view details */
  onTaskSelect?: (taskId: string) => void
  /** Called when the slide-over panel is closed */
  onTaskDeselect?: () => void
}
