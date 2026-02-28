# Agents — UI Behavior Tests

## User Flow Tests

### Browse Agent Card Grid

**Success Path:**

1. Render the Agents component with a list of 5 agents (3 online, 2 offline)
2. Verify agents are grouped under two section headings:
   - "Online" heading with a count of `3` displayed in monospace
   - "Offline" heading with a count of `2` displayed in monospace
3. Under "Online", verify 3 agent cards render in a 2-column grid (single column on mobile)
4. Under "Offline", verify 2 agent cards render in a 2-column grid
5. Each agent card displays:
   - Agent initials in a colored circular avatar (first two characters, uppercased — e.g., "Hermes" shows "HE" with background color `#6366f1`)
   - Agent name text
   - A status indicator dot: emerald for "online", slate for "offline"
   - Status label text ("online" or "offline"), capitalized
   - Current task description text, or "No active task" in italic if `currentTask` is `null`
   - Up to 4 connection service badges with service icons and names
   - If more than 4 connections, a "+N" overflow indicator
   - A bottom stats row showing "{tasksCompleted} done" and optionally "{connectedCount} connected" and "{errorCount} error"

**Failure Paths:**

- When `agents` is an empty array, neither "Online" nor "Offline" headings render
- When all agents are online, no "Offline" section renders
- When all agents are offline, no "Online" section renders

### Click Agent Card to Open Detail View

**Success Path:**

1. Render the Agents component with agents and an `onAgentClick` callback
2. Click the card for agent "Hermes"
3. Verify the list view is replaced by the detail view for "Hermes"
4. Verify `onAgentClick` was called with `"agent-1"`
5. The detail view displays:
   - A larger circular avatar with initials "HE" and background color `#6366f1`
   - Agent name "Hermes" as a heading
   - Status dot (emerald for online) and "online" label
   - Current task text "Researching restaurant options for Friday dinner in Manhattan"

**Failure Paths:**

- When `onAgentClick` is not provided, clicking a card still navigates to the detail view (internal state management)

### Detail View Tabs Switch Content

**Success Path:**

1. Open the detail view for agent "Hermes"
2. Verify three tab buttons are visible: "Activity" with count `6`, "Connections" with count `3`, "Skills" with count `3`
3. The "Activity" tab is active by default (underlined with sky color)
4. The Activity tab content shows a chronological list of events with:
   - Type-appropriate icons (check-circle, play, send, brain, alert-triangle)
   - Event description text
   - Relative timestamps
   - Colored left border lines matching event type
5. Click the "Connections" tab
6. Verify the tab becomes active and the content switches to a list of connections:
   - "Slack" with channel "#team" and a "connected" status badge in emerald
   - "Gmail" with channel "nash@example.com" and a "connected" badge
   - "WhatsApp" with channel "+1 (555) 012-3456" and a "connected" badge
7. Click the "Skills" tab
8. Verify the content switches to a list of skills:
   - "Email Manager" with description "Read, triage, draft, and send emails"
   - "Travel Booker" with description "Search flights, hotels, and restaurants and make reservations"
   - "Calendar Sync" with description "Read and create events across Google Calendar and Outlook"
9. Each skill shows the first letter of its name in a violet-styled icon square

**Failure Paths:**

- Clicking the already-active tab does not cause errors or re-render issues

### Agent Quick Actions Based on Status

**Success Path — Online Agent:**

1. Open the detail view for an online agent (e.g., "Hermes")
2. Verify two action buttons appear in the header:
   - "Stop" button with a square icon
   - "Restart" button with a rotate icon
3. The "Start" button is NOT visible
4. Click "Stop" — verify `onStopAgent` callback is called with `"agent-1"`
5. Click "Restart" — verify `onRestartAgent` callback is called with `"agent-1"`

**Success Path — Offline Agent:**

1. Open the detail view for an offline agent (e.g., "Echo")
2. Verify one action button appears in the header:
   - "Start" button with a play icon in emerald styling
3. The "Stop" and "Restart" buttons are NOT visible
4. Click "Start" — verify `onStartAgent` callback is called with `"agent-3"`

**Failure Paths:**

- When `onStartAgent`, `onStopAgent`, or `onRestartAgent` are not provided, clicking the buttons does not throw an error

### Navigate Back to Agent List

**Success Path:**

1. Open the detail view for any agent
2. Verify a back button is visible with the text "All Agents" and a left-arrow icon
3. Click the back button
4. Verify the detail view is replaced by the agent card grid (list view)
5. Verify `onBackToList` callback is called

**Failure Paths:**

- When `onBackToList` is not provided, clicking back still returns to the list view (internal state reset)

---

## Empty State Tests

### Agent with No Activity

1. Open the detail view for agent "Echo" (who has an empty `activity` array)
2. Select the "Activity" tab (default)
3. Verify the text "No activity recorded" is displayed in italic, centered, with vertical padding

### Agent with No Connections

1. Render an agent card for an agent with an empty `connections` array
2. Verify no connection badges render in the card
3. Open that agent's detail view, click "Connections" tab
4. Verify no connection rows render (empty list)

### Agent with No Skills

1. Open a detail view for an agent with an empty `skills` array
2. Click the "Skills" tab
3. Verify no skill rows render (empty list)

---

## Component Interaction Tests

### Stats Bar Displays Formatted Values

1. Open the detail view for agent "Hermes" with stats:
   - `uptimeSeconds: 259200` — displays "3d 0h" (259200 / 86400 = 3 days)
   - `totalTokensUsed: 1842500` — displays "1.8M"
   - `tasksCompleted: 47` — displays "47"
   - `totalCost: 14.73` — displays "$14.73"
2. Open the detail view for agent "Atlas" with stats:
   - `uptimeSeconds: 172800` — displays "2d 0h"
   - `totalTokensUsed: 923400` — displays "923K"
   - `tasksCompleted: 31` — displays "31"
   - `totalCost: 7.21` — displays "$7.21"
3. Open the detail view for agent "Echo" with stats:
   - `uptimeSeconds: 0` — displays "Offline"
   - `totalTokensUsed: 284100` — displays "284K"
   - `tasksCompleted: 12` — displays "12"
   - `totalCost: 2.15` — displays "$2.15"

### Connection Status Badge Colors

1. Render a connection row with `status: "connected"` — badge shows "connected" text with emerald background and text
2. Render a connection row with `status: "error"` — badge shows "error" text with amber background and text
3. Render a connection row with `status: "disconnected"` — badge shows "disconnected" text with slate background and text

### Agent Card Connection Error Count

1. Render an agent card for "Atlas" who has 1 connection with `status: "error"`
2. Verify the bottom stats row includes "1 error" text in amber color
3. Render an agent card for "Hermes" who has 0 error connections
4. Verify no error count text appears in the bottom stats row

### Tab Count Badges

1. Open detail view for "Hermes"
2. Verify "Activity" tab shows count `6` next to the label
3. Verify "Connections" tab shows count `3`
4. Verify "Skills" tab shows count `3`
5. Counts render in monospace font and slate color

---

## Edge Cases

- **Agent with many connections**: Render an agent card with 6 connections — verify only the first 4 are shown as badges and "+2" appears as overflow text
- **Long agent name**: Render an agent with a very long name — verify it truncates with ellipsis on the card view
- **Long current task text**: Render an agent card with a very long `currentTask` string — verify it is clamped to 2 lines
- **Long connection channel text**: In the detail view Connections tab, verify long channel names truncate with ellipsis
- **Token count below 1000**: Render an agent with `totalTokensUsed: 500` — verify it displays "500" (no K/M suffix)
- **Token count between 1000 and 1M**: Render an agent with `totalTokensUsed: 45000` — verify it displays "45K"
- **Cost with many decimals**: Render `totalCost: 0.10` — verify it displays "$0.10" (two decimal places)
- **Zero uptime**: Render an agent with `uptimeSeconds: 0` — verify the uptime field displays "Offline"
- **Uptime less than a day**: Render an agent with `uptimeSeconds: 7200` — verify it displays "2h" (no days prefix)

---

## Accessibility Checks

- Agent cards are focusable buttons and activatable via keyboard (Enter/Space)
- Back button in the detail view is keyboard accessible
- Tab buttons are focusable and switch content when activated via keyboard
- Status indicator dots are accompanied by text labels ("online"/"offline") so color is not the only indicator
- Connection status badges use both color and text labels ("connected", "error", "disconnected")
- Action buttons ("Start", "Stop", "Restart") have visible text labels alongside their icons
- Stat values in the stats bar have visible uppercase labels ("Uptime", "Tokens", "Completed", "Cost") above them
- Skill descriptions are readable — not truncated or hidden behind interaction
- All interactive elements have visible focus indicators

---

## Sample Test Data

```json
{
  "agents": [
    {
      "id": "agent-1",
      "name": "Hermes",
      "status": "online",
      "avatarColor": "#6366f1",
      "currentTask": "Researching restaurant options for Friday dinner in Manhattan",
      "connections": [
        { "id": "conn-1", "service": "Slack", "channel": "#team", "status": "connected" },
        { "id": "conn-2", "service": "Gmail", "channel": "nash@example.com", "status": "connected" },
        { "id": "conn-3", "service": "WhatsApp", "channel": "+1 (555) 012-3456", "status": "connected" }
      ],
      "skills": [
        { "id": "skill-1", "name": "Email Manager", "description": "Read, triage, draft, and send emails" },
        { "id": "skill-2", "name": "Travel Booker", "description": "Search flights, hotels, and restaurants and make reservations" },
        { "id": "skill-3", "name": "Calendar Sync", "description": "Read and create events across Google Calendar and Outlook" }
      ],
      "activity": [
        { "id": "evt-1", "type": "task_started", "description": "Researching restaurant options for Friday dinner in Manhattan", "timestamp": "2026-02-27T09:16:00Z" },
        { "id": "evt-2", "type": "task_completed", "description": "Checked in for SFO to JFK flight on Thursday", "timestamp": "2026-02-27T09:14:00Z" },
        { "id": "evt-3", "type": "message_sent", "description": "Sent weekly standup summary to Slack #team channel", "timestamp": "2026-02-27T09:02:00Z" },
        { "id": "evt-4", "type": "memory_saved", "description": "Learned preference: prefers window seats on flights", "timestamp": "2026-02-27T08:45:00Z" },
        { "id": "evt-5", "type": "task_completed", "description": "Organized inbox — archived 23 newsletters, flagged 3 important emails", "timestamp": "2026-02-27T07:30:00Z" },
        { "id": "evt-6", "type": "task_completed", "description": "Booked conference room for Monday morning sync", "timestamp": "2026-02-26T17:45:00Z" }
      ],
      "stats": {
        "uptimeSeconds": 259200,
        "totalTokensUsed": 1842500,
        "totalCost": 14.73,
        "tasksCompleted": 47,
        "tasksInProgress": 1
      }
    },
    {
      "id": "agent-3",
      "name": "Echo",
      "status": "offline",
      "avatarColor": "#8b5cf6",
      "currentTask": null,
      "connections": [
        { "id": "conn-7", "service": "Telegram", "channel": "@echo_bot", "status": "disconnected" },
        { "id": "conn-8", "service": "Spotify", "channel": "nash_playlist", "status": "disconnected" }
      ],
      "skills": [
        { "id": "skill-7", "name": "Music Curator", "description": "Create and manage Spotify playlists based on mood and preferences" },
        { "id": "skill-8", "name": "Daily Briefing", "description": "Compile a morning summary of news, weather, and calendar events" }
      ],
      "activity": [],
      "stats": {
        "uptimeSeconds": 0,
        "totalTokensUsed": 284100,
        "totalCost": 2.15,
        "tasksCompleted": 12,
        "tasksInProgress": 0
      }
    }
  ]
}
```
