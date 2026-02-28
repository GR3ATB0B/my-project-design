# Settings

## Visual Reference

Not yet captured. Run `/screenshot-design` to generate `screenshot.png`.

## Overview

A settings page with a left sidebar for navigating between three categories: General, Connections, and Privacy. Users can configure agent defaults and appearance preferences, connect or disconnect external services, and toggle privacy controls like data collection and memory persistence.

## User Flows

- Navigate between General, Connections, and Privacy settings via a left sidebar
- Update general settings: default agent name prefix, default priority level, timezone, theme preference (light/dark/system), and language
- View all available external services (Slack, Gmail, GitHub, etc.) with connect/disconnect toggles
- Toggle privacy controls: data collection, memory persistence, and sandboxed mode on or off
- Save changes to any settings category

## Design Decisions

- **Left sidebar navigation**: A persistent sidebar with category labels (General, Connections, Privacy) and an active state indicator. On mobile, the sidebar collapses to a horizontal tab bar for compact navigation.
- **Segmented theme control**: The theme preference (light/dark/system) is presented as a segmented control rather than a dropdown, providing a more visual and immediate selection experience.
- **Toggle switches for connections**: Each external service (Slack, Gmail, GitHub, etc.) is displayed as a row with service name, icon, brief description, and a connect/disconnect toggle switch for quick state changes.
- **Toggle switches for privacy**: Data collection, memory persistence, and sandboxed mode are each presented as labeled toggle switches with brief descriptions explaining what the setting controls.
- **Form inputs with consistent styling**: Text inputs, dropdowns, and segmented controls follow a consistent visual style — uniform border radius, padding, and focus states across all settings categories.

## Data Shapes

These types define what the components expect as props. See `types.ts` for full definitions.

| Type | Description | Derived From |
|------|-------------|--------------|
| `GeneralSettings` | User preferences including agentNamePrefix, defaultPriority, timezone, theme, and language | — |
| `ConnectionService` | An external service with id, service name, description, and connected boolean | Global entity: Connection |
| `PrivacySettings` | Toggle-based privacy controls: dataCollection, memoryPersistence, sandboxedMode | — |

## Components

| Component | File | Description |
|-----------|------|-------------|
| `Settings` | `Settings.tsx` | Top-level section component. Renders the sidebar/tab navigation and the active settings category panel. Accepts `SettingsProps`. |
| `GeneralSettings` | `GeneralSettings.tsx` | Form panel for general preferences: agent name prefix, default priority, timezone, theme segmented control, and language dropdown. Includes a save button. |
| `ConnectionsSettings` | `ConnectionsSettings.tsx` | List of available external services with connect/disconnect toggle switches for each service. |
| `PrivacySettings` | `PrivacySettings.tsx` | Toggle switches for data collection, memory persistence, and sandboxed mode, each with a descriptive label. Includes a save button. |

## Callback Props

| Prop | Trigger | Signature |
|------|---------|-----------|
| `onSaveGeneral` | User clicks save on the general settings form | `(settings: GeneralSettings) => void` |
| `onToggleConnection` | User toggles a connection on or off | `(serviceId: string, connected: boolean) => void` |
| `onSavePrivacy` | User clicks save on the privacy settings form | `(settings: PrivacySettings) => void` |
