import data from '@/../product/sections/agents/data.json'
import { Agents } from './components/Agents'

export default function AgentsView() {
  return (
    <Agents
      agents={data.agents}
      onAgentClick={(agentId) => console.log('View agent:', agentId)}
      onBackToList={() => console.log('Back to agent list')}
      onStartAgent={(agentId) => console.log('Start agent:', agentId)}
      onStopAgent={(agentId) => console.log('Stop agent:', agentId)}
      onRestartAgent={(agentId) => console.log('Restart agent:', agentId)}
    />
  )
}
