# Tasks

## Visual Reference

Not yet captured. Run `/screenshot-design` to generate `screenshot.png`.

## Overview

A kanban board for tracking all agent tasks with four columns: To Do, Doing, Failed, and Done. Users can drag and drop tasks between columns, create new tasks with title, description, agent assignment, and priority, and click into a slide-over panel for full task details.

## User Flows

- View all tasks organized across four kanban columns: To Do, Doing, Failed, Done
- Drag and drop task cards between columns to update their status
- Create a new task via a form with title, description, agent assignment, and priority
- Click a task card to open a slide-over panel with full details, activity history, and edit options
- Filter the board by agent and/or priority level
- Edit task details (title, description, agent, priority) from the slide-over panel

## Design Decisions

- **Four-column kanban**: Columns for To Do, Doing, Failed, and Done with headers showing column name and task count. Uses HTML5 drag-and-drop for moving cards between columns with visual drop indicators.
- **Color-coded priority badges**: Priority levels are displayed as colored badges on each card — `rose` for high, `sky` for medium, `slate` for low — providing immediate visual priority scanning.
- **Filter bar**: A filter bar above the board with agent dropdown and priority dropdown allows narrowing the visible tasks without changing the underlying data.
- **Slide-over panel**: Clicking a task card opens a right-side slide-over panel showing full task details, activity history, and an edit mode for updating title, description, agent assignment, and priority.
- **Modal form for new tasks**: A "New Task" button opens a modal form with fields for title, description, agent dropdown, priority selector, and column assignment.

## Data Shapes

These types define what the components expect as props. See `types.ts` for full definitions.

| Type | Description | Derived From |
|------|-------------|--------------|
| `Task` | A unit of work on the kanban board with id, title, description, columnId, agentId, priority, timestamps, and activity log | Global entity: Task |
| `TaskColumn` | A kanban board column with id, name, and display order | Global entity: Task |
| `TaskAgent` | Lightweight agent reference for assignment display with id, name, and avatarColor | Global entities: Agent, Task |
| `TaskActivity` | A log entry for task changes with id, type, optional description, from/to values, and timestamp | Global entity: Task |

## Components

| Component | File | Description |
|-----------|------|-------------|
| `TaskBoard` | `TaskBoard.tsx` | Top-level section component. Renders the filter bar, kanban columns, and manages slide-over/modal state. Accepts `TasksProps`. |
| `KanbanColumn` | `KanbanColumn.tsx` | A single kanban column with header (name + count), drop zone, and vertically scrollable list of task cards. |
| `TaskCard` | `TaskCard.tsx` | A draggable card displaying task title, description preview, assigned agent, priority badge, and timestamp. |
| `TaskSlideOver` | `TaskSlideOver.tsx` | Right-side panel showing full task details, activity history, and edit mode with save/cancel controls. |
| `NewTaskForm` | `NewTaskForm.tsx` | Modal form for creating a new task with fields for title, description, agent dropdown, priority selector, and column assignment. |

## Callback Props

| Prop | Trigger | Signature |
|------|---------|-----------|
| `onTaskMove` | User drags a task card to a different column | `(taskId: string, targetColumnId: string) => void` |
| `onTaskCreate` | User submits the new task form | `(task: { title: string; description: string; agentId: string; priority: TaskPriority; columnId: string }) => void` |
| `onTaskUpdate` | User saves edits in the slide-over panel | `(taskId: string, updates: Partial<Pick<Task, 'title' \| 'description' \| 'agentId' \| 'priority'>>) => void` |
| `onTaskSelect` | User clicks a task card to view details | `(taskId: string) => void` |
| `onTaskDeselect` | User closes the slide-over panel | `() => void` |
