// ============================================================
// Dashboard
// ============================================================

/** Aggregated counts for the stat cards */
export interface DashboardStats {
  activeAgents: number
  tasksWaiting: number
  tasksDoing: number
  tasksNeedsAttention: number
  tasksDone: number
}

export type ActivityEventType =
  | 'task_completed'
  | 'task_started'
  | 'message_sent'
  | 'memory_saved'
  | 'needs_attention'

/** A single event in an agent's activity feed */
export interface ActivityEvent {
  id: string
  type: ActivityEventType
  description: string
  timestamp: string
}

export type AgentStatus = 'online' | 'offline'

/** An agent's recent activity group */
export interface AgentActivity {
  agentId: string
  agentName: string
  agentStatus: AgentStatus
  events: ActivityEvent[]
}

// ============================================================
// Agents
// ============================================================

export type ConnectionStatus = 'connected' | 'disconnected' | 'error'

/** A linked external service or chat app */
export interface Connection {
  id: string
  service: string
  channel: string
  status: ConnectionStatus
}

/** A plugin or integration that extends an agent's capabilities */
export interface Skill {
  id: string
  name: string
  description: string
}

/** Aggregated metrics for an agent */
export interface AgentStats {
  uptimeSeconds: number
  totalTokensUsed: number
  totalCost: number
  tasksCompleted: number
  tasksInProgress: number
}

/** A running instance of the OpenClaw AI assistant */
export interface Agent {
  id: string
  name: string
  status: AgentStatus
  avatarColor: string
  currentTask: string | null
  connections: Connection[]
  skills: Skill[]
  activity: ActivityEvent[]
  stats: AgentStats
}

// ============================================================
// Tasks
// ============================================================

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

// ============================================================
// Settings
// ============================================================

export type TaskPriorityDefault = 'low' | 'medium' | 'high'

export type ThemePreference = 'light' | 'dark' | 'system'

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'pt'

/** User preferences for agent defaults and appearance */
export interface GeneralSettings {
  agentNamePrefix: string
  defaultPriority: TaskPriorityDefault
  timezone: string
  theme: ThemePreference
  language: Language
}

/** An external service that can be connected or disconnected */
export interface ConnectionService {
  id: string
  service: string
  description: string
  connected: boolean
}

/** Toggle-based privacy controls */
export interface PrivacySettings {
  dataCollection: boolean
  memoryPersistence: boolean
  sandboxedMode: boolean
}
