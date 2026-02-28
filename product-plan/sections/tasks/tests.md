# Tasks — UI Behavior Tests

## User Flow Tests

### View Kanban Board with Columns

**Success Path:**

1. Render the TaskBoard component with 4 columns and 12 tasks
2. Verify four columns render in order: "To Do", "Doing", "Failed", "Done"
3. Each column header displays:
   - A colored status dot (slate for To Do, sky for Doing, rose for Failed, emerald for Done)
   - The column name in uppercase text
   - A task count in monospace font on the right side
4. Verify task counts match filtered tasks per column:
   - "To Do" shows `2`
   - "Doing" shows `3`
   - "Failed" shows `1`
   - "Done" shows `6`
5. Each task card within a column displays:
   - Task title text
   - Description preview (truncated to 2 lines if long)
   - Assigned agent avatar (initials in a colored circle) and agent name
   - Priority badge with correct color:
     - "high" shows "High" label with rose background and rose text
     - "medium" shows "Med" label with sky background and sky text
     - "low" shows "Low" label with slate background and slate text
   - Relative timestamp for `updatedAt`

**Failure Paths:**

- When `columns` is an empty array, no columns render
- When `tasks` is an empty array, all columns render but each shows "No tasks" placeholder

### Drag and Drop Task Between Columns

**Success Path:**

1. Render the TaskBoard with an `onTaskMove` callback
2. Begin dragging task "Research restaurant options for Friday dinner" (task-1) from "Doing" column
3. The drag event sets `text/plain` data to `"task-1"`
4. Drag over the "Done" column — the column displays a visual drop indicator (ring highlight and background color change)
5. Drop the task on the "Done" column
6. Verify `onTaskMove` was called with `("task-1", "col-done")`
7. The drop indicator styling is removed from the target column

**Failure Paths:**

- Dragging a task over its current column and dropping it still fires `onTaskMove` with the same column ID (no-op handling is the consumer's responsibility)
- When `onTaskMove` is not provided, dropping a task does not throw an error
- Dragging a task and then leaving a column (drag leave) removes the drop indicator

### Create a New Task

**Success Path:**

1. Render the TaskBoard with an `onTaskCreate` callback
2. Click the "New Task" button in the toolbar
3. Verify a modal dialog appears with the heading "New Task"
4. The modal contains form fields:
   - "Title" text input with placeholder "What needs to be done?" and autofocus
   - "Description" textarea with placeholder "Optional details..."
   - "Agent" dropdown pre-filled with the first agent in the list
   - "Priority" selector with three buttons: "Low", "Medium", "High" — "Medium" selected by default
5. Type "Deploy staging environment" into the Title field
6. Type "Set up the staging deployment pipeline" into the Description field
7. Select agent "Atlas" from the Agent dropdown
8. Click "High" priority button — verify it gains a visual selection indicator (ring styling)
9. Click the "Create Task" submit button
10. Verify `onTaskCreate` was called with:
    ```json
    {
      "title": "Deploy staging environment",
      "description": "Set up the staging deployment pipeline",
      "agentId": "agent-2",
      "priority": "high",
      "columnId": "col-todo"
    }
    ```
11. Verify the modal closes after submission

**Failure Paths:**

- Submit with an empty Title field — the "Create Task" button is visually disabled (`disabled` attribute) with muted styling, and form submission is prevented
- Submit with only whitespace in the Title field — same behavior, `onTaskCreate` is not called
- Click "Cancel" button — the modal closes, `onTaskCreate` is not called
- Click the backdrop overlay — the modal closes via `onCancel`

### Open Task Slide-Over Panel

**Success Path:**

1. Render the TaskBoard with tasks and an `onTaskSelect` callback
2. Click the task card for "Research restaurant options for Friday dinner"
3. Verify `onTaskSelect` was called with `"task-1"`
4. A slide-over panel appears on the right side of the screen with:
   - A backdrop overlay covering the rest of the page
   - The priority badge "High" in rose color in the panel header
   - The assigned agent avatar and name "Hermes" in the header
   - An edit (pencil) icon button and a close (X) icon button in the header
5. The panel body shows:
   - Task title "Research restaurant options for Friday dinner" as a heading
   - Full description text
   - A meta section with "Created" and "Updated" timestamps
   - An "Activity" section heading
   - Activity log entries:
     - A status change entry showing "To Do" with an arrow to "Doing" with a sky-colored icon
     - A "Task created" entry with a slate-colored plus icon
     - Each entry has a relative timestamp

**Failure Paths:**

- When `onTaskSelect` is not provided, clicking a card still opens the slide-over (internal state)

### Edit Task in Slide-Over

**Success Path:**

1. Open the slide-over for a task
2. Click the edit (pencil) icon button
3. The panel body switches to edit mode with:
   - "Title" input pre-filled with the current task title
   - "Description" textarea pre-filled with the current description
   - "Agent" dropdown pre-filled with the current agent
   - "Priority" selector with the current priority visually selected (ring indicator)
4. Change the title to "Updated task title"
5. Select a different agent from the dropdown
6. Click the "Low" priority button
7. Click the "Save" button
8. Verify `onTaskUpdate` was called with `("task-1", { title: "Updated task title", description: ..., agentId: ..., priority: "low" })`
9. The panel switches back to read mode displaying the updated values

**Failure Paths:**

- Click "Cancel" during edit mode — fields reset to original values, panel returns to read mode, `onTaskUpdate` is not called

### Close Task Slide-Over

**Success Path:**

1. Open the slide-over panel for a task
2. Click the close (X) button in the panel header
3. Verify the slide-over closes and `onTaskDeselect` is called
4. Alternatively, click the backdrop overlay — same behavior

**Failure Paths:**

- When `onTaskDeselect` is not provided, clicking close or backdrop still closes the panel (internal state reset)

### Filter Tasks by Agent

**Success Path:**

1. Render the TaskBoard with tasks assigned to multiple agents
2. Click the "Filter" button in the toolbar to reveal filter dropdowns
3. The agent filter dropdown shows "All agents" as the default option, plus one option per agent
4. Select "Hermes" from the agent dropdown
5. Verify only tasks assigned to "Hermes" (agent-1) are visible in the columns
6. Column task counts update to reflect filtered results
7. The "Filter" button shows an active indicator (sky-colored styling with a dot)
8. A "Clear" button with an X icon appears next to the filter button

**Failure Paths:**

- Selecting "All agents" re-shows all tasks (no filtering by agent)

### Filter Tasks by Priority

**Success Path:**

1. Open the filter dropdowns
2. Select "High" from the priority dropdown
3. Verify only high-priority tasks are visible across all columns
4. Column counts update to show only high-priority task counts

**Failure Paths:**

- Selecting "All priorities" re-shows all tasks (no filtering by priority)

### Clear All Filters

**Success Path:**

1. Apply an agent filter and a priority filter
2. Click the "Clear" button
3. Verify both filter dropdowns reset to their default "All" options
4. All tasks are visible again in the columns
5. The "Clear" button disappears
6. The "Filter" button returns to its default styling (no active indicator)

**Failure Paths:**

- Clicking "Clear" when no filters are active — button is not visible (only shown when `hasActiveFilters` is true)

---

## Empty State Tests

### Empty Column

1. Render the TaskBoard where one column has no tasks (e.g., "Failed" with 0 tasks)
2. Verify the column still renders with its header and a count of `0`
3. The column body shows "No tasks" placeholder text in italic, centered within a 20px-height area
4. The column remains a valid drop target for drag-and-drop

### All Columns Empty

1. Render the TaskBoard with columns but an empty `tasks` array
2. All four columns render with headers showing `0` counts
3. Each column shows the "No tasks" placeholder

### No Description on Task

1. Render a task with an empty `description` string
2. On the task card, no description preview text renders (description area is omitted)
3. In the slide-over read mode, "No description" is shown in italic placeholder text

---

## Component Interaction Tests

### Priority Badge Color Mapping

1. Render a task card with `priority: "high"` — badge shows "High" text, rose-50 background (dark: rose-900/20), rose-600 text (dark: rose-400)
2. Render a task card with `priority: "medium"` — badge shows "Med" text, sky-50 background (dark: sky-900/20), sky-600 text (dark: sky-400)
3. Render a task card with `priority: "low"` — badge shows "Low" text, slate-100 background (dark: slate-800), slate-500 text (dark: slate-400)

### Task Card Drag Behavior

1. Render a task card with `draggable` attribute set to `true`
2. Initiate a drag — verify `onDragStart` is called and the `dataTransfer` contains the task ID as `text/plain`
3. The card has cursor-pointer styling and a scale-down effect on active (mousedown)

### Column Drop Zone Indicators

1. Drag a task over the "Done" column — verify the column gains a ring indicator (ring-2 ring-sky-300) and a tinted background
2. Drag the task out of the column — verify the indicator is removed
3. Drop the task — verify the indicator is removed and `onTaskDrop` fires

### Slide-Over Activity Entry Types

1. Open the slide-over for a task with activity entries
2. A `created` activity shows a plus icon in slate color with the description text
3. A `status_change` activity shows an arrow icon in sky color with "From" arrow "To" text (e.g., "To Do" with arrow "Doing")
4. An `edited` activity shows a pencil icon in violet color with the description text
5. Each activity entry shows a relative timestamp on the right

### New Task Form Priority Selector

1. Open the New Task form
2. "Medium" is selected by default with visual ring indicator
3. Click "High" — it gains the ring indicator and "Medium" loses it
4. Click "Low" — it gains the ring indicator and "High" loses it
5. The selected priority button uses its priority-specific color (rose for High, sky for Medium, slate for Low)

---

## Edge Cases

- **Combined agent and priority filters**: Apply agent filter "Hermes" AND priority filter "high" — only tasks matching both criteria are shown
- **Long task title**: Render a card with a very long title — verify it wraps within the card without overflow
- **Long description on card**: Description preview is clamped to 2 lines with overflow hidden
- **Unassigned agent**: Render a task card where the `agentId` does not match any agent in the `agents` array — card shows "??" initials with a slate fallback avatar color and "Unassigned" text
- **Many tasks in one column**: Render a column with 30+ tasks — verify the column scrolls vertically
- **Board horizontal scroll**: On narrow viewports, verify the board scrolls horizontally to reveal all columns
- **Columns sorted by order**: Render columns with non-sequential `order` values — verify they render in ascending order
- **Create Task sets columnId to first column**: When creating a task, verify the `columnId` is set to the first column's ID (sorted by order)
- **Task with no activity**: Open the slide-over for a task with an empty `activity` array — the Activity section renders with no entries

---

## Accessibility Checks

- Task cards are focusable and activatable via keyboard (click handler on a div with `cursor-pointer`)
- The "New Task" button is a standard button element, keyboard accessible
- The modal has a backdrop that can be clicked to dismiss; keyboard users can use the "Cancel" button or the X button
- The close (X) button in the slide-over is keyboard accessible
- The edit pencil button is keyboard accessible
- Filter dropdowns are native `<select>` elements, fully keyboard navigable
- Priority selector buttons in the form are keyboard accessible `<button>` elements
- The submit button is disabled when the title is empty, with `disabled` attribute set
- Column headers use heading-level elements for semantic structure
- Drag-and-drop has no keyboard alternative by default — this should be noted as a limitation requiring additional ARIA attributes for full accessibility
- All form fields have visible labels ("Title", "Description", "Agent", "Priority") in uppercase text

---

## Sample Test Data

```json
{
  "columns": [
    { "id": "col-todo", "name": "To Do", "order": 0 },
    { "id": "col-doing", "name": "Doing", "order": 1 },
    { "id": "col-failed", "name": "Failed", "order": 2 },
    { "id": "col-done", "name": "Done", "order": 3 }
  ],
  "agents": [
    { "id": "agent-1", "name": "Hermes", "avatarColor": "#6366f1" },
    { "id": "agent-2", "name": "Atlas", "avatarColor": "#f59e0b" },
    { "id": "agent-3", "name": "Echo", "avatarColor": "#8b5cf6" },
    { "id": "agent-4", "name": "Nova", "avatarColor": "#ec4899" }
  ],
  "tasks": [
    {
      "id": "task-1",
      "title": "Research restaurant options for Friday dinner",
      "description": "Find 3-5 highly rated Italian restaurants in Manhattan near Midtown, check availability for 4 people at 7:30pm, and compare prices.",
      "columnId": "col-doing",
      "agentId": "agent-1",
      "priority": "high",
      "createdAt": "2026-02-27T08:00:00Z",
      "updatedAt": "2026-02-27T09:16:00Z",
      "activity": [
        { "id": "act-1", "type": "status_change", "from": "To Do", "to": "Doing", "timestamp": "2026-02-27T09:16:00Z" },
        { "id": "act-2", "type": "created", "description": "Task created", "timestamp": "2026-02-27T08:00:00Z" }
      ]
    },
    {
      "id": "task-6",
      "title": "Re-authenticate Google Calendar connection",
      "description": "The OAuth token for Atlas's Google Calendar integration has expired.",
      "columnId": "col-failed",
      "agentId": "agent-2",
      "priority": "high",
      "createdAt": "2026-02-27T08:20:00Z",
      "updatedAt": "2026-02-27T08:20:00Z",
      "activity": [
        { "id": "act-13", "type": "status_change", "from": "Doing", "to": "Failed", "timestamp": "2026-02-27T08:20:00Z" },
        { "id": "act-14", "type": "created", "description": "Task auto-created from connection error", "timestamp": "2026-02-27T08:20:00Z" }
      ]
    },
    {
      "id": "task-9",
      "title": "Set up morning briefing automation",
      "description": "Configure Echo to send a daily Telegram message at 7:30am with weather, calendar events, and top news headlines.",
      "columnId": "col-todo",
      "agentId": "agent-3",
      "priority": "medium",
      "createdAt": "2026-02-27T07:00:00Z",
      "updatedAt": "2026-02-27T07:00:00Z",
      "activity": [
        { "id": "act-20", "type": "created", "description": "Task created", "timestamp": "2026-02-27T07:00:00Z" }
      ]
    },
    {
      "id": "task-12",
      "title": "Book conference room for Monday sync",
      "description": "",
      "columnId": "col-done",
      "agentId": "agent-1",
      "priority": "low",
      "createdAt": "2026-02-26T16:00:00Z",
      "updatedAt": "2026-02-26T17:45:00Z",
      "activity": [
        { "id": "act-24", "type": "status_change", "from": "Doing", "to": "Done", "timestamp": "2026-02-26T17:45:00Z" },
        { "id": "act-25", "type": "created", "description": "Task created", "timestamp": "2026-02-26T16:00:00Z" }
      ]
    }
  ]
}
```
