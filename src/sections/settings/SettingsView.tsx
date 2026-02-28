import data from '@/../product/sections/settings/data.json'
import { Settings } from './components/Settings'

export default function SettingsView() {
  return (
    <Settings
      general={data.general}
      connections={data.connections}
      privacy={data.privacy}
      onSaveGeneral={(settings) => console.log('Save general:', settings)}
      onToggleConnection={(serviceId, connected) => console.log('Toggle connection:', serviceId, connected)}
      onSavePrivacy={(settings) => console.log('Save privacy:', settings)}
    />
  )
}
