import type { DashboardProps } from '@/../product/sections/dashboard/types'
import { StatCard } from './StatCard'
import { AgentActivityGroup } from './AgentActivityGroup'

export function Dashboard({ stats, agentActivities, onAgentClick }: DashboardProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-2 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <StatCard label="Agents" value={stats.activeAgents} accent="sky" />
        <StatCard label="Waiting" value={stats.tasksWaiting} accent="slate" />
        <StatCard label="In Progress" value={stats.tasksDoing} accent="sky" />
        <StatCard label="Attention" value={stats.tasksNeedsAttention} accent="amber" />
        <StatCard label="Done" value={stats.tasksDone} accent="emerald" />
      </div>

      {/* Section label */}
      <h2 className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
        Recent Activity
      </h2>

      {/* Agent activity groups */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
        {agentActivities.map((agent) => (
          <AgentActivityGroup
            key={agent.agentId}
            agent={agent}
            onAgentClick={() => onAgentClick?.(agent.agentId)}
          />
        ))}
      </div>
    </div>
  )
}
