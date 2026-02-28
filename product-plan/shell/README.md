# Application Shell

## Overview

OpenClaw HQ uses a top navigation bar layout with a persistent header containing the product logo, horizontal navigation links, and a user menu.

## Navigation Structure

- Dashboard → Home overview with activity feed and stats
- Agents → Agent management and skill configuration
- Tasks → Kanban task board
- Tokens → Usage analytics and cost tracking
- Memory → Persistent memory browser
- Settings → Agent configuration and connected apps

## Components

- `AppShell.tsx` — Main layout wrapper with header and content area
- `MainNav.tsx` — Responsive navigation with desktop links and mobile hamburger menu
- `UserMenu.tsx` — User dropdown with avatar/initials and logout action

## Props

**AppShell:**
- `children` — Page content
- `navigationItems` — Array of nav items with label, href, isActive, optional icon/badge
- `user` — Object with name and optional avatarUrl
- `onNavigate` — Callback when user clicks a nav link
- `onLogout` — Callback when user clicks logout

## Design Notes

- Active nav item uses sky-500 color with bottom border indicator
- Hover states use subtle slate background
- Mobile: nav links collapse behind hamburger menu
- Dark mode inverts backgrounds and text colors
- Logo uses Inter font at semi-bold weight
