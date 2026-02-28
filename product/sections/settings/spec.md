# Settings Specification

## Overview
A settings page with a left sidebar for navigating between three categories: General, Connections, and Privacy. Users can configure agent defaults and appearance preferences, connect or disconnect external services, and toggle privacy controls like data collection and memory persistence.

## User Flows
- Navigate between General, Connections, and Privacy settings via a left sidebar
- Update general settings: default agent name prefix, default priority level, timezone, theme preference (light/dark/system), and language
- View all available external services (Slack, Gmail, GitHub, etc.) with connect/disconnect toggles
- Toggle privacy controls: data collection, memory persistence, and sandboxed mode on or off
- Save changes to any settings category

## UI Requirements
- Left sidebar with category labels (General, Connections, Privacy) and active state indicator
- General section: form fields for agent name prefix (text input), default priority (dropdown), timezone (dropdown), theme (segmented control: light/dark/system), language (dropdown)
- Connections section: list of available services, each with service name, icon, brief description, and a connect/disconnect toggle
- Privacy section: labeled toggle switches for data collection, memory persistence, and sandboxed mode, each with a brief description of what the setting controls
- Save button at the bottom of each section
- Responsive: sidebar collapses to a horizontal tab bar on mobile
- Light and dark mode support

## Configuration
- shell: true
