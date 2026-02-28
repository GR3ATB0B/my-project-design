# Dashboard — UI Behavior Tests

## User Flow Tests

### View Dashboard Stats

**Success Path:**

1. Render the Dashboard component with sample `stats` data
2. Verify five stat cards are visible with the following labels and values:
   - "Agents" displays `2`
   - "Waiting" displays `4`
   - "In Progress" displays `2`
   - "Attention" displays `1`
   - "Done" displays `18`
3. Each stat card renders the numeric value in a large font and the label below it in uppercase tracking-widest text
4. Each stat card displays a colored accent dot next to the value:
   - "Agents" has a sky-colored dot
   - "Waiting" has a slate-colored dot
   - "In Progress" has a sky-colored dot
   - "Attention" has an amber-colored dot
   - "Done" has an emerald-colored dot

**Failure Paths:**

- When `stats.activeAgents` is `0`, the "Agents" card displays `0` (not hidden or blank)
- When all stat values are `0`, all five cards still render with `0`

### View Agent Activity Feed

**Success Path:**

1. Render the Dashboard with `agentActivities` containing multiple agent groups
2. Verify the section heading "Recent Activity" is visible above the activity feed
3. For each agent group, verify:
   - The agent's initials are displayed in a circular avatar (first two characters, uppercased — e.g., "Hermes" shows "HE")
   - The agent's name is displayed next to the avatar
   - A status indicator dot appears: emerald for "online", slate for "offline"
   - The status label text ("online" or "offline") is displayed and capitalized
4. Each activity event within a group displays:
   - An icon corresponding to the event type:
     - `task_completed` shows a check-circle icon with emerald color
     - `task_started` shows a play icon with sky color
     - `message_sent` shows a send icon with slate color
     - `memory_saved` shows a brain icon with violet color
     - `needs_attention` shows an alert-triangle icon with amber color
   - The event `description` text
   - A relative timestamp (e.g., "5m ago", "2h ago", "just now", or a date like "Feb 26")
5. Events are rendered in the order provided within each agent group
6. A colored left border line is visible for each event row matching the event type color

**Failure Paths:**

- When `agentActivities` is an empty array, no agent groups render but the "Recent Activity" heading still appears

### Navigate to Agent Detail

**Success Path:**

1. Render the Dashboard with an `onAgentClick` callback
2. Click the agent header button for "Hermes"
3. Verify `onAgentClick` was called with `"agent-1"`
4. Click the agent header button for "Atlas"
5. Verify `onAgentClick` was called with `"agent-2"`

**Failure Paths:**

- When `onAgentClick` is not provided, clicking the agent header does not throw an error

---

## Empty State Tests

### Agent with No Activity Events

1. Render the Dashboard with an agent group whose `events` array is empty (e.g., agent "Echo")
2. Verify the agent header (initials "EC", name "Echo", status dot, and "offline" label) still renders
3. Verify the text "No recent activity" is displayed in italic below the agent header
4. No event rows are rendered for that agent group

### All Agents Have No Activity

1. Render the Dashboard where every agent group has an empty `events` array
2. All agent headers render correctly
3. Each agent group shows "No recent activity"

---

## Component Interaction Tests

### StatCard Renders Correct Accent Colors

1. Render a StatCard with `accent="sky"` — the value text uses sky-600 color (dark: sky-400) and the dot uses bg-sky-500
2. Render a StatCard with `accent="amber"` — the value text uses amber-600 color (dark: amber-400) and the dot uses bg-amber-500
3. Render a StatCard with `accent="emerald"` — the value text uses emerald-600 color (dark: emerald-400) and the dot uses bg-emerald-500
4. Render a StatCard with `accent="slate"` (default) — the value text uses slate-500 color (dark: slate-400) and the dot uses bg-slate-400

### AgentActivityGroup Click Propagation

1. Render an AgentActivityGroup with an `onAgentClick` callback
2. Click anywhere on the agent header button (avatar, name, or status area)
3. Verify the callback fires exactly once
4. Verify clicking on an individual event row does NOT fire the `onAgentClick` callback

### Activity Event Timestamp Formatting

1. Render an event with a timestamp less than 1 minute ago — displays "just now"
2. Render an event with a timestamp 5 minutes ago — displays "5m ago"
3. Render an event with a timestamp 3 hours ago — displays "3h ago"
4. Render an event with a timestamp more than 24 hours ago — displays a date string like "Feb 26"

---

## Edge Cases

- **Large stat values**: Render `stats.tasksDone` as `9999` — verify the number renders without truncation or overflow
- **Long agent name**: Render an agent with a very long name — verify the name does not overflow its container
- **Long event description**: Render an event with a very long description — verify it wraps properly within the event row
- **Single agent group**: Render with only one agent activity group — verify no divider lines appear erroneously
- **Many activity events**: Render an agent with 50+ events — verify all render and the page remains scrollable

---

## Accessibility Checks

- All stat card values are readable by screen readers (not hidden via `aria-hidden`)
- Agent header buttons are focusable and activatable via keyboard (Enter/Space)
- Activity event icons have appropriate accessible names or are decorative (`aria-hidden="true"`)
- Color is not the only means of conveying status — text labels ("online"/"offline") accompany the status dots
- Timestamps are in text form, readable by assistive technology
- Stat card labels provide sufficient context when read without the numeric value
- The "Recent Activity" heading establishes a clear content section for screen readers

---

## Sample Test Data

```json
{
  "stats": {
    "activeAgents": 2,
    "tasksWaiting": 4,
    "tasksDoing": 2,
    "tasksNeedsAttention": 1,
    "tasksDone": 18
  },
  "agentActivities": [
    {
      "agentId": "agent-1",
      "agentName": "Hermes",
      "agentStatus": "online",
      "events": [
        {
          "id": "evt-1",
          "type": "task_completed",
          "description": "Checked in for SFO to JFK flight on Thursday",
          "timestamp": "2026-02-27T09:14:00Z"
        },
        {
          "id": "evt-2",
          "type": "message_sent",
          "description": "Sent weekly standup summary to Slack #team channel",
          "timestamp": "2026-02-27T09:02:00Z"
        },
        {
          "id": "evt-3",
          "type": "memory_saved",
          "description": "Learned preference: prefers window seats on flights",
          "timestamp": "2026-02-27T08:45:00Z"
        }
      ]
    },
    {
      "agentId": "agent-2",
      "agentName": "Atlas",
      "agentStatus": "online",
      "events": [
        {
          "id": "evt-6",
          "type": "task_completed",
          "description": "Pulled latest GitHub notifications and created summary",
          "timestamp": "2026-02-27T08:55:00Z"
        },
        {
          "id": "evt-7",
          "type": "needs_attention",
          "description": "Cannot access Google Calendar — token expired",
          "timestamp": "2026-02-27T08:20:00Z"
        }
      ]
    },
    {
      "agentId": "agent-3",
      "agentName": "Echo",
      "agentStatus": "offline",
      "events": []
    }
  ]
}
```
