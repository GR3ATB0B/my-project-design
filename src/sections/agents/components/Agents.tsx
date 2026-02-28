import { useState } from 'react'
import type { AgentsProps } from '@/../product/sections/agents/types'
import { AgentCard } from './AgentCard'
import { AgentDetail } from './AgentDetail'

export function Agents({
  agents,
  onAgentClick,
  onBackToList,
  onStartAgent,
  onStopAgent,
  onRestartAgent,
}: AgentsProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const selectedAgent = agents.find((a) => a.id === selectedAgentId)

  const handleAgentClick = (agentId: string) => {
    setSelectedAgentId(agentId)
    onAgentClick?.(agentId)
  }

  const handleBack = () => {
    setSelectedAgentId(null)
    onBackToList?.()
  }

  if (selectedAgent) {
    return (
      <AgentDetail
        agent={selectedAgent}
        onBack={handleBack}
        onStart={() => onStartAgent?.(selectedAgent.id)}
        onStop={() => onStopAgent?.(selectedAgent.id)}
        onRestart={() => onRestartAgent?.(selectedAgent.id)}
      />
    )
  }

  const onlineAgents = agents.filter((a) => a.status === 'online')
  const offlineAgents = agents.filter((a) => a.status === 'offline')

  return (
    <div className="max-w-3xl mx-auto">
      {/* Online agents */}
      {onlineAgents.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Online
            <span
              className="ml-1.5 tabular-nums"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {onlineAgents.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {onlineAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => handleAgentClick(agent.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Offline agents */}
      {offlineAgents.length > 0 && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Offline
            <span
              className="ml-1.5 tabular-nums"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {offlineAgents.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {offlineAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => handleAgentClick(agent.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
