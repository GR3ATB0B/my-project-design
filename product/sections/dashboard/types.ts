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

/** Props for the Dashboard section */
export interface DashboardProps {
  stats: DashboardStats
  agentActivities: AgentActivity[]
  /** Called when user clicks an agent's activity group */
  onAgentClick?: (agentId: string) => void
}
