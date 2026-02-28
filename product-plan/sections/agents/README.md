# Agents

## Visual Reference

Not yet captured. Run `/screenshot-design` to generate `screenshot.png`.

## Overview

A management view for browsing all agent instances as status cards, with a detail view for each agent showing its full profile — activity history, connected apps, enabled skills, uptime, token usage, and task history. Users can start, stop, and restart agents directly from the detail view.

## User Flows

- Browse all agents as cards showing name, avatar, status (online/offline), connected apps, and current task
- Click an agent card to open its full detail view
- View agent detail profile: activity log, connected apps/services, enabled skills/plugins, uptime, token usage summary, and recent task history
- Start, stop, or restart an agent from the detail view via quick action buttons
- Navigate back to the agent list from the detail view

## Design Decisions

- **Card grid**: Agent cards are displayed in a responsive grid, split into two groups — Online agents listed first, Offline agents below. Each card shows name, avatar/initials, status badge, connected app icons, and current task.
- **Detail view with tabs**: Clicking a card opens a detail view with a tabbed layout containing three tabs: Activity (chronological event log), Connections (linked services with status indicators), and Skills (enabled plugins with descriptions).
- **Stats bar**: The detail view header includes a stats bar showing uptime, total tokens used, total cost, tasks completed, and tasks in progress. Numbers rendered in Fira Code for consistency with the dashboard stat cards.
- **Quick action buttons**: Start, stop, and restart buttons are prominently placed in the detail view header, allowing direct agent management without navigating away.

## Data Shapes

These types define what the components expect as props. See `types.ts` for full definitions.

| Type | Description | Derived From |
|------|-------------|--------------|
| `Agent` | A running AI assistant instance with id, name, status, avatarColor, currentTask, connections, skills, activity, and stats | Global entity: Agent |
| `Connection` | A linked external service or chat app with id, service, channel, and status | Global entity: Connection |
| `Skill` | A plugin that extends agent capabilities with id, name, and description | Global entity: Agent |
| `ActivityEvent` | A single event in an agent's activity log with id, type, description, and timestamp | Global entities: Agent, Task |
| `AgentStats` | Aggregated metrics: uptimeSeconds, totalTokensUsed, totalCost, tasksCompleted, tasksInProgress | Global entity: Agent |

## Components

| Component | File | Description |
|-----------|------|-------------|
| `Agents` | `Agents.tsx` | Top-level section component. Manages list vs. detail view state. Renders the card grid or detail view based on selection. Accepts `AgentsProps`. |
| `AgentCard` | `AgentCard.tsx` | A single agent card for the grid view showing avatar, name, status badge, connected apps, and current task. |
| `AgentDetail` | `AgentDetail.tsx` | Full detail view for a selected agent with tabbed layout (Activity, Connections, Skills), stats bar, and quick action buttons. |

## Callback Props

| Prop | Trigger | Signature |
|------|---------|-----------|
| `onAgentClick` | User clicks an agent card to view details | `(agentId: string) => void` |
| `onBackToList` | User navigates back from detail to list view | `() => void` |
| `onStartAgent` | User clicks the start button in the detail view | `(agentId: string) => void` |
| `onStopAgent` | User clicks the stop button in the detail view | `(agentId: string) => void` |
| `onRestartAgent` | User clicks the restart button in the detail view | `(agentId: string) => void` |
