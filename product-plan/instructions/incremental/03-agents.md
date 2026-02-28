# Milestone 3: Agents

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

Milestones 1-2 complete — design tokens applied, shell rendering, Dashboard wired up.

## Goal

Implement agent management with a card grid for browsing all agents and a detail view for inspecting an individual agent's profile, activity, connections, skills, and stats, with controls to start, stop, and restart agents.

---

## Overview

The Agents section is the central hub for managing running agent instances. Users land on a card grid showing all agents with their name, avatar, status, connected apps, and current task. Clicking a card opens a detail view with the agent's full profile — activity log, connections, skills, uptime, token usage, and task history. From the detail view, users can start, stop, or restart the agent.

## Key Functionality

- Display all agents as a responsive card grid with name, avatar (color-based initials fallback), online/offline status badge, connected app icons, and current task
- Click an agent card to open its detail view with sectioned layout for activity, connections, skills, and stats
- Quick action buttons (start, stop, restart) in the detail view header
- Activity section showing a chronological log with event types and timestamps
- Connections section listing linked services with status indicators (connected, disconnected, error)
- Skills section listing enabled plugins with descriptions
- Stats area showing uptime, total tokens used, total cost, tasks completed, and tasks in progress
- Navigate back to the agent list from the detail view

## Components Provided

| Component | Location | Purpose |
|-----------|----------|---------|
| `Agents` | `product-plan/sections/agents/components/Agents.tsx` | Root section component — manages list/detail view state |
| `AgentCard` | `product-plan/sections/agents/components/AgentCard.tsx` | Individual agent card in the grid |
| `AgentDetail` | `product-plan/sections/agents/components/AgentDetail.tsx` | Full agent detail view with sections and actions |

## Props Reference

### Agent Interface Summary

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique agent identifier |
| `name` | `string` | Display name |
| `status` | `'online' \| 'offline'` | Current status |
| `avatarColor` | `string` | Tailwind color for avatar background |
| `currentTask` | `string \| null` | Description of the agent's current task, or null |
| `connections` | `Connection[]` | Linked services (each with `id`, `service`, `channel`, `status`) |
| `skills` | `Skill[]` | Enabled plugins (each with `id`, `name`, `description`) |
| `activity` | `ActivityEvent[]` | Recent events (each with `id`, `type`, `description`, `timestamp`) |
| `stats` | `AgentStats` | Metrics: `uptimeSeconds`, `totalTokensUsed`, `totalCost`, `tasksCompleted`, `tasksInProgress` |

### Callback Props

| Prop | Signature | When It Fires |
|------|-----------|---------------|
| `onAgentClick` | `(agentId: string) => void` | User clicks an agent card to view details |
| `onBackToList` | `() => void` | User clicks back from detail to list view |
| `onStartAgent` | `(agentId: string) => void` | User clicks "Start" on an offline agent |
| `onStopAgent` | `(agentId: string) => void` | User clicks "Stop" on an online agent |
| `onRestartAgent` | `(agentId: string) => void` | User clicks "Restart" on an online agent |

Wire `onAgentClick` to transition from the card grid to the detail view (this can be internal component state or a route change — your choice). Wire the action callbacks to your backend to control agent lifecycle.

## Expected User Flows

### Browse agents
User navigates to `/agents` and sees a responsive grid of agent cards. Each card shows the agent's name, initials avatar with color background, an online/offline status badge, icons for connected apps, and the current task (if any).

### View agent detail
User clicks an agent card. The detail view opens, showing the agent's full profile organized into sections: activity log, connections, skills, and stats. Quick action buttons (start, stop, restart) are prominently placed in the header.

### Start/stop/restart agent
From the detail view, the user clicks one of the action buttons. The corresponding callback fires. The "Start" button should be available when the agent is offline. "Stop" and "Restart" should be available when the agent is online. After the action completes, the agent's status should update in the UI.

## Empty States

- **No agents:** Display a centered message indicating no agents are configured, with guidance on how to set one up.
- **Agent with no activity:** Show the activity section with a "No recent activity" message.
- **Agent with no connections:** Show the connections section with a "No connected services" message.
- **Agent with no skills:** Show the skills section with a "No skills enabled" message.

---

## Files to Reference

| File | Location |
|------|----------|
| Agents component | `product-plan/sections/agents/components/Agents.tsx` |
| AgentCard component | `product-plan/sections/agents/components/AgentCard.tsx` |
| AgentDetail component | `product-plan/sections/agents/components/AgentDetail.tsx` |
| Component index | `product-plan/sections/agents/components/index.ts` |
| TypeScript interfaces | `product-plan/sections/agents/types.ts` |
| Sample data | `product-plan/sections/agents/sample-data.json` |

## Done When

- [ ] Agents section renders inside the application shell at the `/agents` route
- [ ] Agent card grid displays with name, avatar, status badge, connected apps, and current task
- [ ] Card grid is responsive — collapses to a single column on mobile
- [ ] Clicking a card opens the agent detail view
- [ ] Detail view shows activity log, connections, skills, and stats sections
- [ ] Start, stop, and restart buttons are present and fire their respective callbacks
- [ ] Start button is available for offline agents; stop and restart for online agents
- [ ] "Back to list" navigation returns to the card grid
- [ ] Empty states display for no agents, no activity, no connections, and no skills
- [ ] Light and dark mode are supported
