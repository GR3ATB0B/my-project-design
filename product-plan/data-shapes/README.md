# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

- **DashboardStats** — Aggregated counts for stat cards (used in: dashboard)
- **ActivityEvent** — A single event in an activity feed (used in: dashboard, agents)
- **AgentActivity** — An agent's recent activity group (used in: dashboard)
- **Agent** — A running AI assistant instance with status, connections, skills, stats (used in: agents)
- **Connection** — A linked external service or chat app (used in: agents, settings)
- **Skill** — A plugin that extends agent capabilities (used in: agents)
- **AgentStats** — Aggregated metrics for an agent (used in: agents)
- **Task** — A unit of work on the kanban board (used in: tasks)
- **TaskColumn** — A kanban board column (used in: tasks)
- **TaskAgent** — Lightweight agent reference for task assignment (used in: tasks)
- **TaskActivity** — A log entry for task changes (used in: tasks)
- **GeneralSettings** — User preferences for agent defaults and appearance (used in: settings)
- **ConnectionService** — An external service with connect/disconnect state (used in: settings)
- **PrivacySettings** — Toggle-based privacy controls (used in: settings)

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/dashboard/types.ts`
- `sections/agents/types.ts`
- `sections/tasks/types.ts`
- `sections/settings/types.ts`

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
