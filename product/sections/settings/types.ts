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

export type SettingsCategory = 'general' | 'connections' | 'privacy'

/** Props for the Settings section */
export interface SettingsProps {
  general: GeneralSettings
  connections: ConnectionService[]
  privacy: PrivacySettings
  /** Called when user saves general settings */
  onSaveGeneral?: (settings: GeneralSettings) => void
  /** Called when user toggles a connection on or off */
  onToggleConnection?: (serviceId: string, connected: boolean) => void
  /** Called when user saves privacy settings */
  onSavePrivacy?: (settings: PrivacySettings) => void
}
