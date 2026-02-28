# OpenClaw HQ — Complete Implementation Instructions

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

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

# OpenClaw HQ — Product Overview

## Summary

OpenClaw HQ is the local command center for your OpenClaw AI assistant. It gives you full visibility and control over your agents, tasks, token usage, and persistent memory — all from a single, clean dashboard running on your machine.

## Problems & Solutions

1. **No visibility into agent activity** — HQ provides a real-time dashboard with activity feeds, agent status, and task progress at a glance.
2. **Task management scattered across chat apps** — HQ consolidates everything into a customizable kanban board with user-defined statuses and columns.
3. **No way to track token costs** — HQ surfaces usage analytics and cost breakdowns by agent and model.
4. **Agent memory is a black box** — HQ opens up the memory layer so you can view, edit, and delete stored knowledge.
5. **Managing skills and integrations is manual** — HQ provides a clean interface to browse skills, manage integrations, and connect services.

## Planned Sections

1. **Dashboard** — Home overview with live agent activity, recent tasks, token usage summary, and quick-action shortcuts
2. **Agents** — Browse and manage running agent instances, view status, connected apps, and configure skills/plugins
3. **Tasks** — Fully customizable kanban board for tracking all agent tasks with drag-and-drop, filtering, and detail views
4. **Tokens** — Usage analytics and cost tracking across LLM providers (not yet designed)
5. **Memory** — Browse, search, edit, and delete persistent agent memory entries (not yet designed)
6. **Settings** — Configure agent behavior, manage connected chat apps, and control privacy/sandboxing options

## Product Entities

- **Agent** — A running instance of the OpenClaw AI assistant with name, status, connected channels, and configuration
- **Task** — A unit of work assigned to or created by an agent with customizable status, priority, and activity history
- **TaskColumn** — A user-defined column on the kanban board representing a workflow stage
- **Skill** — A plugin or integration that extends an agent's capabilities
- **UsageRecord** — A log entry tracking token consumption tied to an agent and LLM model
- **Memory** — A persistent knowledge entry stored by the agent
- **Connection** — A linked external service or chat app for agent communication

## Design System

**Colors:**
- Primary: sky — buttons, links, active states
- Secondary: violet — tags, badges, avatar fallbacks
- Neutral: slate — backgrounds, text, borders
- Accents: emerald (success/online), amber (warning/attention), rose (error/high priority)

**Typography:**
- Heading: Inter (semi-bold to bold)
- Body: Inter (regular to medium)
- Mono: Fira Code (stats, timestamps, code)

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell (top navigation bar)
2. **Dashboard** — Read-only home view with stat cards and agent activity feed
3. **Agents** — Agent card grid with detail view, activity, connections, skills, and quick actions
4. **Tasks** — Kanban board with drag-and-drop, task creation, filtering, and slide-over detail panel
5. **Settings** — Sidebar-navigated settings with General, Connections, and Privacy categories

Each milestone has a dedicated instruction document in `instructions/`.

---

# Milestone 1: Shell

## Prerequisites

None. This is the first milestone.

## Goal

Set up the design tokens (colors, typography) and the application shell (top navigation bar, user menu) that wraps every section of OpenClaw HQ.

## What to Implement

### 1. Design Tokens

Install the design tokens so all subsequent milestones inherit the correct palette and fonts.

Reference the following files in `product-plan/design-system/`:

| File | Purpose |
|------|---------|
| `tokens.css` | CSS custom properties for colors and font families |
| `tailwind-colors.md` | Tailwind utility class usage guide for primary, secondary, neutral, and accent colors |
| `fonts.md` | Google Fonts import snippet and weight guidance |

**Colors:**
- **Primary:** `sky` — buttons, links, active states
- **Secondary:** `violet` — tags, badges, avatar fallbacks
- **Neutral:** `slate` — backgrounds, text, borders
- **Accents:** `emerald` (success/online), `amber` (warning/attention), `rose` (error/high priority)

**Fonts:**
- **Heading:** Inter (semi-bold to bold)
- **Body:** Inter (regular to medium)
- **Mono:** Fira Code (stats, timestamps, code)

Add the Google Fonts `<link>` tags from `fonts.md` to your HTML `<head>`, and apply the CSS custom properties from `tokens.css` to your root stylesheet.

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` into your project:

| Component | Role |
|-----------|------|
| `AppShell.tsx` | Root layout — top navigation bar with content area below |
| `MainNav.tsx` | Horizontal navigation links with active state indicator |
| `UserMenu.tsx` | Avatar/initials dropdown with profile info and logout |

**Navigation items to wire up:**

| Label | Route |
|-------|-------|
| Dashboard | `/` |
| Agents | `/agents` |
| Tasks | `/tasks` |
| Tokens | `/tokens` |
| Memory | `/memory` |
| Settings | `/settings` |

**UserMenu props:**
- `name` (string) — the current user's display name
- `avatarUrl` (string, optional) — URL to the user's avatar image; falls back to initials
- `onLogout` (callback) — fired when the user clicks "Log out"

Wire up the navigation items to your router. The active nav item should use `sky-500` with a bottom border indicator. On mobile, nav links collapse behind a hamburger menu.

## Files to Reference

| File | Location |
|------|----------|
| Design tokens CSS | `product-plan/design-system/tokens.css` |
| Tailwind color guide | `product-plan/design-system/tailwind-colors.md` |
| Font configuration | `product-plan/design-system/fonts.md` |
| AppShell component | `product-plan/shell/components/AppShell.tsx` |
| MainNav component | `product-plan/shell/components/MainNav.tsx` |
| UserMenu component | `product-plan/shell/components/UserMenu.tsx` |
| Component index | `product-plan/shell/components/index.ts` |

## Done When

- [ ] Design tokens (colors, fonts) are applied globally
- [ ] Google Fonts (Inter, Fira Code) load correctly
- [ ] AppShell renders a top navigation bar with content area below
- [ ] All six navigation links are visible and route to the correct paths
- [ ] Active navigation item shows a sky-500 bottom border indicator
- [ ] UserMenu displays user name and avatar (or initials fallback)
- [ ] UserMenu dropdown opens on click with a logout action
- [ ] `onLogout` callback fires when "Log out" is clicked
- [ ] Navigation collapses to a hamburger menu on mobile viewports
- [ ] Light and dark mode are supported across the shell

---

# Milestone 2: Dashboard

## Prerequisites

Milestone 1 (Shell) complete — design tokens applied, application shell rendering with navigation.

## Goal

Implement the Dashboard — a read-only home view that gives users an at-a-glance summary of their OpenClaw system with stat cards and an agent activity feed.

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

---

# Milestone 3: Agents

## Prerequisites

Milestones 1-2 complete — design tokens applied, shell rendering, Dashboard wired up.

## Goal

Implement agent management with a card grid for browsing all agents and a detail view for inspecting an individual agent's profile, activity, connections, skills, and stats, with controls to start, stop, and restart agents.

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

---

# Milestone 4: Tasks

## Prerequisites

Milestones 1-3 complete — design tokens applied, shell rendering, Dashboard and Agents section wired up.

## Goal

Implement a kanban board for task tracking with four columns (To Do, Doing, Failed, Done), drag-and-drop between columns, task creation, a slide-over detail panel, and filtering by agent and priority.

## Overview

The Tasks section is a fully interactive kanban board where users track all agent work. Tasks are organized across four columns representing workflow stages. Users can drag and drop cards between columns to update status, create new tasks with title, description, agent assignment, and priority, and click into a slide-over panel for full task details and editing. A filter bar above the board allows narrowing by agent and priority.

## Key Functionality

- Four-column kanban layout: To Do, Doing, Failed, Done — each with a header showing column name and task count
- Task cards displaying title, description preview, assigned agent (name and avatar), priority badge (color-coded), and timestamp
- Drag-and-drop to move cards between columns with visual drop indicators
- "New Task" button that opens a form with fields for title, description, agent assignment (dropdown), and priority selector
- Slide-over panel on the right when a task card is clicked, showing full details and edit controls
- Filter bar above the board with agent dropdown and priority dropdown
- Columns scroll vertically when they have many cards; board scrolls horizontally on smaller screens
- Responsive: columns stack vertically on mobile with collapsible sections

## Components Provided

| Component | Location | Purpose |
|-----------|----------|---------|
| `TaskBoard` | `product-plan/sections/tasks/components/TaskBoard.tsx` | Root section component — renders the kanban board layout with filter bar |
| `KanbanColumn` | `product-plan/sections/tasks/components/KanbanColumn.tsx` | Individual column with header and card list |
| `TaskCard` | `product-plan/sections/tasks/components/TaskCard.tsx` | Draggable task card within a column |
| `TaskSlideOver` | `product-plan/sections/tasks/components/TaskSlideOver.tsx` | Right-side panel for viewing and editing task details |
| `NewTaskForm` | `product-plan/sections/tasks/components/NewTaskForm.tsx` | Form for creating a new task |

## Props Reference

### Key Interface Summaries

**`Task`** — a unit of work on the kanban board:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique task identifier |
| `title` | `string` | Task title |
| `description` | `string` | Full task description |
| `columnId` | `string` | ID of the column this task belongs to |
| `agentId` | `string` | ID of the assigned agent |
| `priority` | `'low' \| 'medium' \| 'high'` | Priority level |
| `createdAt` | `string` | ISO timestamp of creation |
| `updatedAt` | `string` | ISO timestamp of last update |
| `activity` | `TaskActivity[]` | Change log (each with `id`, `type`, `description`, `from`, `to`, `timestamp`) |

**`TaskColumn`** — a column on the kanban board:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique column identifier |
| `name` | `string` | Column display name (e.g., "To Do", "Doing") |
| `order` | `number` | Sort order for column positioning |

**`TaskAgent`** — lightweight agent reference for assignment and display:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Agent identifier |
| `name` | `string` | Agent display name |
| `avatarColor` | `string` | Tailwind color for avatar background |

### Callback Props

| Prop | Signature | When It Fires |
|------|-----------|---------------|
| `onTaskMove` | `(taskId: string, targetColumnId: string) => void` | User drags a task to a different column |
| `onTaskCreate` | `(task: { title, description, agentId, priority, columnId }) => void` | User submits the new task form |
| `onTaskUpdate` | `(taskId: string, updates: Partial<Pick<Task, 'title' \| 'description' \| 'agentId' \| 'priority'>>) => void` | User edits a task's details in the slide-over |
| `onTaskSelect` | `(taskId: string) => void` | User clicks a task card to view details |
| `onTaskDeselect` | `() => void` | User closes the slide-over panel |

Wire `onTaskMove` to persist the column change. Wire `onTaskCreate` and `onTaskUpdate` to your backend. The slide-over panel open/close state can be managed via `onTaskSelect`/`onTaskDeselect` or internally.

## Expected User Flows

### View kanban board
User navigates to `/tasks` and sees four columns laid out horizontally. Each column header shows the column name and a count of tasks in that column. Task cards are displayed within their respective columns.

### Drag-and-drop task
User grabs a task card and drags it from one column to another (e.g., from "To Do" to "Doing"). A visual drop indicator shows where the card will land. On drop, `onTaskMove` fires and the card appears in the new column.

### Create new task
User clicks the "New Task" button. A form appears with fields for title (text), description (textarea), agent assignment (dropdown populated from the `agents` array), and priority (low/medium/high selector). On submit, `onTaskCreate` fires and the new task appears in the designated column.

### View/edit task details
User clicks a task card. A slide-over panel opens from the right showing the full task title, description, assigned agent, priority, timestamps, and activity history. The user can edit title, description, agent, and priority. On save, `onTaskUpdate` fires. Closing the panel fires `onTaskDeselect`.

### Filter tasks
User uses the filter bar above the board to narrow tasks by agent (dropdown) and/or priority (dropdown). Only matching tasks are shown; columns update their counts accordingly.

## Empty States

- **No tasks at all:** Display the four columns with a centered message like "No tasks yet" and a prominent "New Task" button.
- **Empty column:** Show the column header with its count at zero and a subtle "No tasks" placeholder in the card area.
- **No agents available for assignment:** If no agents exist, the agent dropdown in the new task form should show a "No agents available" message.
- **No filter results:** If filters exclude all tasks, show a message like "No tasks match your filters" with a link to clear filters.

## Files to Reference

| File | Location |
|------|----------|
| TaskBoard component | `product-plan/sections/tasks/components/TaskBoard.tsx` |
| KanbanColumn component | `product-plan/sections/tasks/components/KanbanColumn.tsx` |
| TaskCard component | `product-plan/sections/tasks/components/TaskCard.tsx` |
| TaskSlideOver component | `product-plan/sections/tasks/components/TaskSlideOver.tsx` |
| NewTaskForm component | `product-plan/sections/tasks/components/NewTaskForm.tsx` |
| Component index | `product-plan/sections/tasks/components/index.ts` |
| TypeScript interfaces | `product-plan/sections/tasks/types.ts` |
| Sample data | `product-plan/sections/tasks/sample-data.json` |

## Done When

- [ ] Tasks section renders inside the application shell at the `/tasks` route
- [ ] Four kanban columns display with correct names and task counts
- [ ] Task cards show title, description preview, assigned agent, priority badge, and timestamp
- [ ] Priority badges are color-coded (low, medium, high)
- [ ] Drag-and-drop moves cards between columns and fires `onTaskMove`
- [ ] "New Task" form opens, validates input, and fires `onTaskCreate` on submit
- [ ] Clicking a task card opens the slide-over panel with full details
- [ ] Task details can be edited in the slide-over and `onTaskUpdate` fires on save
- [ ] Closing the slide-over fires `onTaskDeselect`
- [ ] Filter bar filters tasks by agent and priority
- [ ] Board scrolls horizontally on smaller screens; columns stack on mobile
- [ ] Empty states display for no tasks, empty columns, and no filter results
- [ ] Light and dark mode are supported

---

# Milestone 5: Settings

## Prerequisites

Milestones 1-4 complete — design tokens applied, shell rendering, Dashboard, Agents, and Tasks sections wired up.

## Goal

Implement the Settings page with a left sidebar for navigating between three categories (General, Connections, Privacy), each with its own form controls and save behavior.

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
