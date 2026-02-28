import data from '@/../product/sections/dashboard/data.json'
import { Dashboard } from './components/Dashboard'

export default function DashboardView() {
  return (
    <Dashboard
      stats={data.stats}
      agentActivities={data.agentActivities}
      onAgentClick={(agentId) => console.log('Navigate to agent:', agentId)}
    />
  )
}
