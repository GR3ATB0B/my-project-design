# Dashboard

## Visual Reference

See `screenshot.png` in this directory for the current design.

## Overview

A clean, read-only home view that gives you an at-a-glance summary of your OpenClaw system. Shows agent status, task counts by status, and recent activity grouped by agent. Designed to be simple, utilitarian, and easy on the eyes — no action buttons or clutter.

## User Flows

- View stat cards showing number of active agents and task counts broken down by status (waiting, doing, needs attention, done)
- Scan recent activity grouped by agent to see what each agent has been working on
- Click an agent's activity group to navigate to that agent's detail view

## Design Decisions

- **Stat cards**: Minimal top row of cards showing active agents count, tasks waiting, tasks in progress, tasks needing attention, and tasks done. Numbers rendered in Fira Code for a utilitarian, monospaced look.
- **Activity feed**: Grouped by agent with each group showing the agent's name and avatar/initials. A left-border accent color distinguishes each agent's group at a glance.
- **Event type icons**: Each activity item displays a subtle icon corresponding to its event type (task_completed, task_started, message_sent, memory_saved, needs_attention) alongside a brief description and timestamp.
- **Read-only**: No action buttons, forms, or modals — purely informational. The only interaction is clicking an agent group to navigate to that agent's detail view.

## Data Shapes

These types define what the components expect as props. See `types.ts` for full definitions.

| Type | Description | Derived From |
|------|-------------|--------------|
| `DashboardStats` | Aggregated counts for the stat cards (activeAgents, tasksWaiting, tasksDoing, tasksNeedsAttention, tasksDone) | Global entities: Agent, Task |
| `ActivityEvent` | A single event in an agent's activity feed with id, type, description, and timestamp | Global entities: Agent, Task |
| `AgentActivity` | An agent's recent activity group containing agentId, agentName, agentStatus, and an array of events | Global entities: Agent, Task |

## Components

| Component | File | Description |
|-----------|------|-------------|
| `Dashboard` | `Dashboard.tsx` | Top-level section component. Renders stat cards row and activity feed. Accepts `DashboardProps`. |
| `StatCard` | `StatCard.tsx` | A single stat card displaying a label and numeric value. Uses Fira Code for the number. |
| `AgentActivityGroup` | `AgentActivityGroup.tsx` | A grouped block of activity events for one agent, with avatar, name, status badge, and event list. Left-border accent color per agent. |

## Callback Props

| Prop | Trigger | Signature |
|------|---------|-----------|
| `onAgentClick` | User clicks an agent's activity group | `(agentId: string) => void` |
