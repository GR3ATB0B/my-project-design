# Tasks Specification

## Overview
A kanban board for tracking all agent tasks with four columns: To Do, Doing, Failed, and Done. Users can drag and drop tasks between columns, create new tasks with title, description, agent assignment, and priority, and click into a slide-over panel for full task details.

## User Flows
- View all tasks organized across four kanban columns: To Do, Doing, Failed, Done
- Drag and drop task cards between columns to update their status
- Create a new task via a form with title, description, agent assignment, and priority
- Click a task card to open a slide-over panel with full details, activity history, and edit options
- Filter the board by agent and/or priority level
- Edit task details (title, description, agent, priority) from the slide-over panel

## UI Requirements
- Four-column kanban layout with column headers showing column name and task count
- Task cards display title, short description preview, assigned agent (name/avatar), priority badge, and timestamp
- Drag-and-drop interaction to move cards between columns with visual drop indicators
- "New Task" button that opens an inline form or modal with fields: title, description, agent dropdown, priority selector
- Slide-over panel on the right side when a task card is clicked, showing full task details and edit controls
- Filter bar above the board with agent dropdown and priority dropdown
- Priority levels: low, medium, high — shown as color-coded badges on cards
- Columns scroll vertically when they have many cards; board scrolls horizontally on smaller screens
- Responsive: columns stack vertically on mobile with collapsible sections
- Light and dark mode support

## Configuration
- shell: true
