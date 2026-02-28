# Agents Specification

## Overview
A management view for browsing all agent instances as status cards, with a detail view for each agent showing its full profile — activity history, connected apps, enabled skills, uptime, token usage, and task history. Users can start, stop, and restart agents directly from the detail view.

## User Flows
- Browse all agents as cards showing name, avatar, status (online/offline), connected apps, and current task
- Click an agent card to open its full detail view
- View agent detail profile: activity log, connected apps/services, enabled skills/plugins, uptime, token usage summary, and recent task history
- Start, stop, or restart an agent from the detail view via quick action buttons
- Navigate back to the agent list from the detail view

## UI Requirements
- Grid of agent cards, each showing: agent name, avatar/initials, online/offline status badge, list of connected app icons, and current task (if any)
- Clicking a card opens a detail view with tabbed or sectioned layout for activity, connections, skills, and stats
- Quick action buttons (start, stop, restart) prominently placed in the detail view header
- Activity section shows a chronological log of recent events with type icons and timestamps
- Connections section lists linked chat apps and services with status indicators
- Skills section lists enabled plugins with brief descriptions
- Stats area shows uptime duration, total tokens used, and task counts (completed, in progress)
- Responsive: card grid collapses to single column on mobile, detail sections stack vertically
- Light and dark mode support

## Configuration
- shell: true
