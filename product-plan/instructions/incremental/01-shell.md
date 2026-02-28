# Milestone 1: Shell

**Provide alongside:** `product-overview.md`

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Prerequisites

None. This is the first milestone.

## Goal

Set up the design tokens (colors, typography) and the application shell (top navigation bar, user menu) that wraps every section of OpenClaw HQ.

---

## What to Implement

### 1. Design Tokens

Install the design tokens so all subsequent milestones inherit the correct palette and fonts.

Reference the following files in `product-plan/design-system/`:

| File | Purpose |
|------|---------|
| `tokens.css` | CSS custom properties for colors and font families |
| `tailwind-colors.md` | Tailwind utility class usage guide for primary, secondary, neutral, and accent colors |
| `fonts.md` | Google Fonts import snippet and weight guidance |

**Colors:**
- **Primary:** `sky` — buttons, links, active states
- **Secondary:** `violet` — tags, badges, avatar fallbacks
- **Neutral:** `slate` — backgrounds, text, borders
- **Accents:** `emerald` (success/online), `amber` (warning/attention), `rose` (error/high priority)

**Fonts:**
- **Heading:** Inter (semi-bold to bold)
- **Body:** Inter (regular to medium)
- **Mono:** Fira Code (stats, timestamps, code)

Add the Google Fonts `<link>` tags from `fonts.md` to your HTML `<head>`, and apply the CSS custom properties from `tokens.css` to your root stylesheet.

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` into your project:

| Component | Role |
|-----------|------|
| `AppShell.tsx` | Root layout — top navigation bar with content area below |
| `MainNav.tsx` | Horizontal navigation links with active state indicator |
| `UserMenu.tsx` | Avatar/initials dropdown with profile info and logout |

**Navigation items to wire up:**

| Label | Route |
|-------|-------|
| Dashboard | `/` |
| Agents | `/agents` |
| Tasks | `/tasks` |
| Tokens | `/tokens` |
| Memory | `/memory` |
| Settings | `/settings` |

**UserMenu props:**
- `name` (string) — the current user's display name
- `avatarUrl` (string, optional) — URL to the user's avatar image; falls back to initials
- `onLogout` (callback) — fired when the user clicks "Log out"

Wire up the navigation items to your router. The active nav item should use `sky-500` with a bottom border indicator. On mobile, nav links collapse behind a hamburger menu.

---

## Files to Reference

| File | Location |
|------|----------|
| Design tokens CSS | `product-plan/design-system/tokens.css` |
| Tailwind color guide | `product-plan/design-system/tailwind-colors.md` |
| Font configuration | `product-plan/design-system/fonts.md` |
| AppShell component | `product-plan/shell/components/AppShell.tsx` |
| MainNav component | `product-plan/shell/components/MainNav.tsx` |
| UserMenu component | `product-plan/shell/components/UserMenu.tsx` |
| Component index | `product-plan/shell/components/index.ts` |

## Done When

- [ ] Design tokens (colors, fonts) are applied globally
- [ ] Google Fonts (Inter, Fira Code) load correctly
- [ ] AppShell renders a top navigation bar with content area below
- [ ] All six navigation links are visible and route to the correct paths
- [ ] Active navigation item shows a sky-500 bottom border indicator
- [ ] UserMenu displays user name and avatar (or initials fallback)
- [ ] UserMenu dropdown opens on click with a logout action
- [ ] `onLogout` callback fires when "Log out" is clicked
- [ ] Navigation collapses to a hamburger menu on mobile viewports
- [ ] Light and dark mode are supported across the shell
