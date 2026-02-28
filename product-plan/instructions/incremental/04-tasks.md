# Milestone 4: Tasks

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

Milestones 1-3 complete — design tokens applied, shell rendering, Dashboard and Agents sections wired up.

## Goal

Implement a kanban board for task tracking with four columns (To Do, Doing, Failed, Done), drag-and-drop between columns, task creation, a slide-over detail panel, and filtering by agent and priority.

---

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

---

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
