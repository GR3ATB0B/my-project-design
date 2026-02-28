# Milestone 2: Dashboard

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

Milestone 1 (Shell) complete — design tokens applied, application shell rendering with navigation.

## Goal

Implement the Dashboard — a read-only home view that gives users an at-a-glance summary of their OpenClaw system with stat cards and an agent activity feed.

---

## Overview

The Dashboard is the landing page of OpenClaw HQ. It displays a top row of stat cards showing agent and task counts, followed by a chronological activity feed grouped by agent. The view is purely informational — no forms, modals, or action buttons. Users can click an agent's activity group to navigate to that agent's detail view.

## Key Functionality

- Display stat cards for active agents count and task counts broken down by status (waiting, doing, needs attention, done)
- Show an activity feed grouped by agent, with each group displaying the agent's name, status badge, and recent events
- Each activity event shows a description, timestamp, and subtle status indicator based on event type
- Clicking an agent's activity group navigates to that agent's detail view
- Responsive layout: stat cards stack on mobile, activity feed remains a single column

## Components Provided

| Component | Location | Purpose |
|-----------|----------|---------|
| `Dashboard` | `product-plan/sections/dashboard/components/Dashboard.tsx` | Root section component — renders stat cards and activity feed |
| `StatCard` | `product-plan/sections/dashboard/components/StatCard.tsx` | Individual stat card with label and count |
| `AgentActivityGroup` | `product-plan/sections/dashboard/components/AgentActivityGroup.tsx` | Activity feed group for a single agent |

## Props Reference

### Data Props

**`DashboardStats`** — aggregated counts for the stat cards:

| Field | Type | Description |
|-------|------|-------------|
| `activeAgents` | `number` | Number of currently online agents |
| `tasksWaiting` | `number` | Tasks in the waiting/to-do column |
| `tasksDoing` | `number` | Tasks currently in progress |
| `tasksNeedsAttention` | `number` | Tasks that need attention or have failed |
| `tasksDone` | `number` | Completed tasks |

**`AgentActivity[]`** — activity feed grouped by agent:

| Field | Type | Description |
|-------|------|-------------|
| `agentId` | `string` | Unique agent identifier |
| `agentName` | `string` | Display name of the agent |
| `agentStatus` | `'online' \| 'offline'` | Current agent status |
| `events` | `ActivityEvent[]` | Array of recent events (each with `id`, `type`, `description`, `timestamp`) |

### Callback Props

| Prop | Signature | When It Fires |
|------|-----------|---------------|
| `onAgentClick` | `(agentId: string) => void` | User clicks an agent's activity group |

Wire `onAgentClick` to navigate to the agent detail view (e.g., `/agents/:agentId` or however your routing handles it).

## Expected User Flows

### View dashboard stats
User lands on the Dashboard and sees five stat cards across the top: active agents, tasks waiting, tasks doing, tasks needing attention, and tasks done. Each card displays a count with a label.

### Scan agent activity
Below the stat cards, the user sees recent activity grouped by agent. Each group shows the agent's name, an online/offline status badge, and a list of events with descriptions and timestamps.

### Navigate to agent detail
User clicks on an agent's activity group. The `onAgentClick` callback fires with the agent's ID, and the application navigates to that agent's detail view.

## Empty States

- **No agents active:** Display a message in place of the activity feed indicating there are no active agents. Stat cards should show zeroes.
- **No recent activity:** If agents exist but have no events, show the agent groups with an "No recent activity" message in each.

---

## Files to Reference

| File | Location |
|------|----------|
| Dashboard component | `product-plan/sections/dashboard/components/Dashboard.tsx` |
| StatCard component | `product-plan/sections/dashboard/components/StatCard.tsx` |
| AgentActivityGroup component | `product-plan/sections/dashboard/components/AgentActivityGroup.tsx` |
| Component index | `product-plan/sections/dashboard/components/index.ts` |
| TypeScript interfaces | `product-plan/sections/dashboard/types.ts` |
| Sample data | `product-plan/sections/dashboard/sample-data.json` |

## Done When

- [ ] Dashboard renders inside the application shell at the `/` route
- [ ] Five stat cards display with correct labels and counts
- [ ] Stat cards stack responsively on mobile viewports
- [ ] Activity feed shows events grouped by agent with name and status badge
- [ ] Each event displays a description, timestamp, and type indicator
- [ ] Clicking an agent's activity group fires `onAgentClick` and navigates to the agent detail view
- [ ] Empty state displays when no agents are active
- [ ] Empty state displays when agents have no recent activity
- [ ] Light and dark mode are supported
