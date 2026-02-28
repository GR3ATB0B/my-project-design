# Milestone 5: Settings

**Provide alongside:** `product-overview.md`

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Prerequisites

Milestones 1-4 complete — design tokens applied, shell rendering, Dashboard, Agents, and Tasks sections wired up.

## Goal

Implement the Settings page with a left sidebar for navigating between three categories (General, Connections, Privacy), each with its own form controls and save behavior.

---

## Overview

The Settings section provides a centralized place for users to configure their OpenClaw HQ instance. A left sidebar lets users switch between three categories: General (agent defaults, appearance, locale), Connections (external service toggles), and Privacy (data collection and sandboxing controls). Each category has its own form with a save action. The sidebar collapses to a horizontal tab bar on mobile.

## Key Functionality

- Left sidebar navigation with three categories: General, Connections, Privacy
- Active category highlighted with a visual indicator
- General settings: agent name prefix (text input), default priority (dropdown: low/medium/high), timezone (dropdown), theme preference (segmented control: light/dark/system), and language (dropdown)
- Connections settings: list of external services with name, description, and connect/disconnect toggle for each
- Privacy settings: labeled toggle switches for data collection, memory persistence, and sandboxed mode, each with a description of what the setting controls
- Save button at the bottom of each category's form
- Responsive: sidebar collapses to a horizontal tab bar on mobile

## Components Provided

| Component | Location | Purpose |
|-----------|----------|---------|
| `Settings` | `product-plan/sections/settings/components/Settings.tsx` | Root section component — sidebar layout with category switching |
| `GeneralSettings` | `product-plan/sections/settings/components/GeneralSettings.tsx` | General preferences form |
| `ConnectionsSettings` | `product-plan/sections/settings/components/ConnectionsSettings.tsx` | External service connection toggles |
| `PrivacySettings` | `product-plan/sections/settings/components/PrivacySettings.tsx` | Privacy toggle switches |

## Props Reference

### Key Interface Summaries

**`GeneralSettings`** — user preferences for agent defaults and appearance:

| Field | Type | Description |
|-------|------|-------------|
| `agentNamePrefix` | `string` | Default prefix for new agent names |
| `defaultPriority` | `'low' \| 'medium' \| 'high'` | Default priority for new tasks |
| `timezone` | `string` | User's timezone (e.g., "America/New_York") |
| `theme` | `'light' \| 'dark' \| 'system'` | Theme preference |
| `language` | `'en' \| 'es' \| 'fr' \| 'de' \| 'ja' \| 'pt'` | Interface language |

**`ConnectionService`** — an external service that can be toggled:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique service identifier |
| `service` | `string` | Service name (e.g., "Slack", "Gmail", "GitHub") |
| `description` | `string` | Brief description of the service |
| `connected` | `boolean` | Whether the service is currently connected |

**`PrivacySettings`** — toggle-based privacy controls:

| Field | Type | Description |
|-------|------|-------------|
| `dataCollection` | `boolean` | Whether anonymous usage data is collected |
| `memoryPersistence` | `boolean` | Whether the agent retains learned preferences across sessions |
| `sandboxedMode` | `boolean` | Whether the agent runs in a restricted sandbox environment |

### Callback Props

| Prop | Signature | When It Fires |
|------|-----------|---------------|
| `onSaveGeneral` | `(settings: GeneralSettings) => void` | User clicks "Save" on the General settings form |
| `onToggleConnection` | `(serviceId: string, connected: boolean) => void` | User toggles a service connection on or off |
| `onSavePrivacy` | `(settings: PrivacySettings) => void` | User clicks "Save" on the Privacy settings form |

Wire `onSaveGeneral` and `onSavePrivacy` to persist the full settings object. Wire `onToggleConnection` to toggle the individual service — it fires immediately on toggle, not on a form save.

## Expected User Flows

### Navigate settings categories
User navigates to `/settings` and sees the left sidebar with three categories. The first category (General) is active by default. Clicking a category in the sidebar switches the main content area to that category's form.

### Update general preferences
User edits fields in the General form — changes the agent name prefix, selects a default priority, picks a timezone, toggles the theme segmented control, and chooses a language. Clicking "Save" fires `onSaveGeneral` with the complete `GeneralSettings` object.

### Toggle connections
User switches to the Connections category. A list of services is displayed, each with its name, description, and a toggle switch. Flipping a toggle immediately fires `onToggleConnection` with the service ID and new connected state.

### Update privacy settings
User switches to the Privacy category. Three labeled toggles are displayed (data collection, memory persistence, sandboxed mode), each with a description explaining what it controls. The user adjusts the toggles and clicks "Save", which fires `onSavePrivacy` with the complete `PrivacySettings` object.

## Empty States

Settings always has defaults — there are no empty states for this section. General settings should load with sensible defaults (e.g., system theme, English language, medium priority). Connections should always show the list of available services regardless of whether any are connected. Privacy toggles should always be visible with their current state.

---

## Files to Reference

| File | Location |
|------|----------|
| Settings component | `product-plan/sections/settings/components/Settings.tsx` |
| GeneralSettings component | `product-plan/sections/settings/components/GeneralSettings.tsx` |
| ConnectionsSettings component | `product-plan/sections/settings/components/ConnectionsSettings.tsx` |
| PrivacySettings component | `product-plan/sections/settings/components/PrivacySettings.tsx` |
| Component index | `product-plan/sections/settings/components/index.ts` |
| TypeScript interfaces | `product-plan/sections/settings/types.ts` |
| Sample data | `product-plan/sections/settings/sample-data.json` |

## Done When

- [ ] Settings section renders inside the application shell at the `/settings` route
- [ ] Left sidebar shows General, Connections, and Privacy categories with active indicator
- [ ] Sidebar collapses to a horizontal tab bar on mobile
- [ ] General form displays all five fields (agent name prefix, default priority, timezone, theme, language)
- [ ] Theme preference uses a segmented control (light/dark/system)
- [ ] Clicking "Save" on General fires `onSaveGeneral` with the complete settings object
- [ ] Connections list displays all available services with name, description, and toggle
- [ ] Toggling a connection fires `onToggleConnection` immediately with service ID and new state
- [ ] Privacy form displays three labeled toggles with descriptions
- [ ] Clicking "Save" on Privacy fires `onSavePrivacy` with the complete settings object
- [ ] Settings load with sensible defaults when no saved preferences exist
- [ ] Light and dark mode are supported
