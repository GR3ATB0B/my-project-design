# Dashboard Specification

## Overview
A clean, read-only home view that gives you an at-a-glance summary of your OpenClaw system. Shows agent status, task counts by status, and recent activity grouped by agent. Designed to be simple, utilitarian, and easy on the eyes — no action buttons or clutter.

## User Flows
- View stat cards showing number of active agents and task counts broken down by status (waiting, doing, needs attention, done)
- Scan recent activity grouped by agent to see what each agent has been working on
- Click an agent's activity group to navigate to that agent's detail view

## UI Requirements
- Top row of minimal stat cards: active agents count, tasks waiting, tasks in progress, tasks needing attention, tasks done
- Activity feed below stats, grouped by agent name with avatar/initials
- Each activity item shows a brief description, timestamp, and subtle status indicator
- No action buttons, forms, or modals — purely informational
- Responsive: stat cards stack on mobile, activity feed remains a single column
- Light and dark mode support

## Configuration
- shell: true
