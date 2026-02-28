# Application Shell Specification

## Overview
OpenClaw HQ uses a top navigation bar layout with a persistent header containing the product logo, horizontal navigation links, and a user menu. The shell provides a clean, modern frame for all section content.

## Navigation Structure
- Dashboard → Home overview with activity feed and stats
- Agents → Agent management and skill configuration
- Tasks → Kanban task board
- Tokens → Usage analytics and cost tracking
- Memory → Persistent memory browser
- Settings → Agent configuration and connected apps

## User Menu
Located at the far right of the top navigation bar. Displays the user's avatar (or initials fallback) and name. Clicking opens a dropdown with profile info and a logout action.

## Layout Pattern
Top navigation bar fixed to the top of the viewport. Content area fills the remaining vertical space below. The nav bar includes:
- Left: OpenClaw logo/wordmark
- Center: Navigation links with active state indicator
- Right: User menu

## Responsive Behavior
- **Desktop:** Full horizontal nav bar with all links visible. Content area is centered with max-width constraint.
- **Tablet:** Nav links may condense slightly. All items remain visible.
- **Mobile:** Nav links collapse behind a hamburger menu icon. Tapping opens a dropdown menu listing all sections. User menu remains visible.

## Design Notes
- Active nav item uses sky-500 color with a bottom border indicator
- Hover states use subtle slate background highlight
- The nav bar has a subtle bottom border for separation
- Dark mode inverts backgrounds and text colors appropriately
- Logo uses Inter font at semi-bold weight
