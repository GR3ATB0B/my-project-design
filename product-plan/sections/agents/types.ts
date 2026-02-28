export type AgentStatus = 'online' | 'offline'

export type ConnectionStatus = 'connected' | 'disconnected' | 'error'

export type ActivityEventType =
  | 'task_completed'
  | 'task_started'
  | 'message_sent'
  | 'memory_saved'
  | 'needs_attention'

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

/** A single event in an agent's activity log */
export interface ActivityEvent {
  id: string
  type: ActivityEventType
  description: string
  timestamp: string
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

/** Props for the Agents section */
export interface AgentsProps {
  agents: Agent[]
  /** Called when user clicks an agent card to view details */
  onAgentClick?: (agentId: string) => void
  /** Called when user navigates back from detail to list view */
  onBackToList?: () => void
  /** Called when user starts an agent */
  onStartAgent?: (agentId: string) => void
  /** Called when user stops an agent */
  onStopAgent?: (agentId: string) => void
  /** Called when user restarts an agent */
  onRestartAgent?: (agentId: string) => void
}
