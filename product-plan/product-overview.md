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
- Primary: sky
- Secondary: violet
- Neutral: slate

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: Fira Code

## Implementation Sequence

Build this product in milestones:

1. **Shell** — Set up design tokens and application shell (top navigation bar)
2. **Dashboard** — Read-only home view with stat cards and agent activity feed
3. **Agents** — Agent card grid with detail view, activity, connections, skills, and quick actions
4. **Tasks** — Kanban board with drag-and-drop, task creation, filtering, and slide-over detail panel
5. **Settings** — Sidebar-navigated settings with General, Connections, and Privacy categories

Each milestone has a dedicated instruction document in `instructions/`.
