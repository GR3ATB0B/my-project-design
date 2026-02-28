# Settings — UI Behavior Tests

## User Flow Tests

### Navigate Between Settings Categories

**Success Path:**

1. Render the Settings component with general, connections, and privacy data
2. Verify a sidebar navigation is visible with three category buttons:
   - "General" with a settings (gear) icon
   - "Connections" with a plug icon
   - "Privacy" with a shield icon
3. "General" is active by default (sky-50 background with sky-600 text in light mode)
4. Click "Connections" — the sidebar active state moves to "Connections" and the content panel switches to the Connections view
5. Click "Privacy" — the sidebar active state moves to "Privacy" and the content panel switches to the Privacy view
6. Click "General" — the sidebar returns to "General" and the content panel shows General settings again

**Failure Paths:**

- Clicking the already-active category does not cause errors or re-render issues

### Update General Settings

**Success Path:**

1. Navigate to the "General" category (default)
2. Verify the section heading "General" is visible with subtitle "Agent defaults and appearance preferences."
3. Verify form fields render with current values:
   - "Agent Name Prefix" text input showing "Agent"
   - "Default Priority" dropdown showing "Medium" (value `medium`)
   - "Timezone" dropdown showing "America/New York" (value `America/New_York`)
   - "Theme" segmented control with "system" selected (sky-500 background, white text)
   - "Language" dropdown showing "English" (value `en`)
4. A helper text below the prefix field reads: 'Default prefix when creating new agents (e.g. "Agent-1", "Agent-2")'
5. Change "Agent Name Prefix" to "Bot"
6. Change "Default Priority" to "High"
7. Change "Timezone" to "Europe/London"
8. Change "Language" to "Deutsch" (value `de`)
9. Click the "Save Changes" button
10. Verify `onSaveGeneral` was called with:
    ```json
    {
      "agentNamePrefix": "Bot",
      "defaultPriority": "high",
      "timezone": "Europe/London",
      "theme": "system",
      "language": "de"
    }
    ```

**Failure Paths:**

- When `onSaveGeneral` is not provided, clicking "Save Changes" does not throw an error

### Toggle Theme Preference

**Success Path:**

1. Navigate to General settings
2. The theme segmented control shows three options: "light", "dark", "system"
3. "system" is currently selected (sky-500 background with white text)
4. Click "light" — it gains the active styling (sky-500 background) and "system" returns to inactive styling (slate-50 background with slate text)
5. Click "dark" — it gains the active styling and "light" returns to inactive
6. Click "Save Changes" — verify the saved settings include `theme: "dark"`

**Failure Paths:**

- Clicking the already-selected theme option has no visual effect (stays selected)

### Toggle Connection Services

**Success Path:**

1. Navigate to the "Connections" category
2. Verify the section heading "Connections" is visible with subtitle "Connect or disconnect external services and chat apps."
3. Verify a list of 10 connection services renders, each showing:
   - A service icon emoji
   - Service name (e.g., "Slack", "Gmail", "GitHub")
   - Service description text
   - A toggle switch button
4. Connected services ("Slack", "Gmail", "GitHub", "Linear", "Notion") show their toggle in the ON state (sky-500 background, knob shifted right)
5. Disconnected services ("Google Calendar", "WhatsApp", "Telegram", "Spotify", "PagerDuty") show their toggle in the OFF state (slate-200 background, knob shifted left)
6. Click the toggle for "Google Calendar" (currently disconnected)
7. Verify `onToggleConnection` was called with `("svc-google-calendar", true)`
8. Click the toggle for "Slack" (currently connected)
9. Verify `onToggleConnection` was called with `("svc-slack", false)`

**Failure Paths:**

- When `onToggleConnection` is not provided, clicking a toggle does not throw an error

### Update Privacy Settings

**Success Path:**

1. Navigate to the "Privacy" category
2. Verify the section heading "Privacy" is visible with subtitle "Control how your data is collected, stored, and used."
3. Verify three toggle rows render:
   - "Data Collection" with description "Allow OpenClaw to collect anonymous usage data to improve the product. No personal data or conversation content is included." — toggle ON (sky-500)
   - "Memory Persistence" with description "Allow agents to save learned preferences and facts to memory. Disabling this means agents start fresh each session." — toggle ON (sky-500)
   - "Sandboxed Mode" with description "Restrict agents from making external API calls or accessing connected services. Useful for testing or sensitive environments." — toggle OFF (slate-200)
4. Click the "Data Collection" toggle to turn it OFF
5. Click the "Sandboxed Mode" toggle to turn it ON
6. Click the "Save Changes" button
7. Verify `onSavePrivacy` was called with:
    ```json
    {
      "dataCollection": false,
      "memoryPersistence": true,
      "sandboxedMode": true
    }
    ```

**Failure Paths:**

- When `onSavePrivacy` is not provided, clicking "Save Changes" does not throw an error

---

## Empty State Tests

### No Connection Services

1. Render the Settings component with an empty `connections` array
2. Navigate to the "Connections" category
3. The heading and subtitle still render
4. No service rows are shown (empty list)

---

## Component Interaction Tests

### General Form Field Types

1. "Agent Name Prefix" is a standard text `<input>` with `type="text"`, max-width constrained
2. "Default Priority" is a native `<select>` with three options: "Low", "Medium", "High"
3. "Timezone" is a native `<select>` with 12 timezone options (e.g., "America/New York", "America/Chicago", "America/Denver", "America/Los Angeles", "America/Anchorage", "Pacific/Honolulu", "Europe/London", "Europe/Paris", "Europe/Berlin", "Asia/Tokyo", "Asia/Shanghai", "Australia/Sydney")
4. "Theme" is a segmented control built from three `<button>` elements inside a bordered container
5. "Language" is a native `<select>` with 6 options: "English", "Espanol", "Francais", "Deutsch", Japanese characters, "Portugues"

### Theme Segmented Control Styling

1. The active option uses `bg-sky-500 text-white` styling
2. Inactive options use `bg-slate-50 text-slate-600` (dark: `bg-slate-900 text-slate-400`) with hover styling
3. Options are capitalized text labels: "light", "dark", "system"
4. The control is wrapped in a container with rounded-lg border

### Connection Toggle Switch Styling

1. A connected (ON) toggle has `bg-sky-500` background with the white knob positioned at `left: 22px`
2. A disconnected (OFF) toggle has `bg-slate-200` (dark: `bg-slate-700`) background with the white knob positioned at `left: 3px`
3. The toggle switch is 40px wide and 22px tall with rounded-full corners
4. The knob is 16px by 16px with a white background and subtle shadow

### Privacy Toggle Row Layout

1. Each toggle row has a label (medium text) and description (smaller text) on the left
2. The toggle switch is on the right, vertically aligned near the top of the row
3. Rows are separated by a bottom border (slate-100 in light mode, slate-800 in dark mode)
4. The last row has no bottom border

### Save Button Styling

1. Both the General and Privacy sections have a "Save Changes" button
2. The button uses `bg-sky-500 hover:bg-sky-600 text-white` styling
3. The button text is "Save Changes" with medium font weight

### Sidebar Active State Indicator

1. The active category button uses `bg-sky-50 text-sky-600` (dark: `bg-sky-900/20 text-sky-400`)
2. Inactive buttons use `text-slate-500` (dark: `text-slate-400`) with hover styling
3. Each button shows an icon (15px, stroke-width 1.5) followed by the category label text

---

## Edge Cases

- **Rapid category switching**: Click "General", then immediately "Connections", then "Privacy" — each content panel renders correctly without stale state
- **Long service description**: Render a connection service with a very long description — verify it truncates with ellipsis
- **Long agent name prefix**: Type a very long prefix into the "Agent Name Prefix" field — verify the input field has a max-width constraint and text does not overflow
- **All connections toggled ON**: Render with all connections connected — verify all toggles display in ON state
- **All connections toggled OFF**: Render with all connections disconnected — verify all toggles display in OFF state
- **All privacy toggles OFF**: Render with all privacy settings set to `false` — verify all three toggles show OFF state
- **All privacy toggles ON**: Render with all privacy settings set to `true` — verify all three toggles show ON state
- **Save without changes**: Click "Save Changes" without modifying any form fields — `onSaveGeneral` is still called with the original values (no dirty-checking)

---

## Accessibility Checks

- Sidebar navigation buttons are keyboard accessible and activatable via Enter/Space
- Form inputs ("Agent Name Prefix") have visible labels above them in uppercase text
- Native `<select>` elements for "Default Priority", "Timezone", and "Language" are fully keyboard navigable
- Theme segmented control buttons are standard `<button>` elements, keyboard accessible
- Connection toggle switches are `<button>` elements, keyboard focusable and activatable
- Privacy toggle switches are `<button>` elements, keyboard focusable and activatable
- Toggle switches should communicate their ON/OFF state to assistive technology (consider `aria-pressed` or `role="switch"` with `aria-checked`)
- All form fields have visible text labels — labels are not hidden or placeholder-only
- The "Save Changes" button is a standard clickable button element
- Description text for each privacy toggle provides sufficient context for the setting's purpose
- The sidebar collapses to a horizontal tab bar on mobile — verify buttons remain accessible and do not get cut off
- Color is not the only means of conveying toggle state — the knob position provides a secondary visual cue

### Responsive Sidebar Behavior

**Success Path:**

1. Render the Settings component at a wide viewport (sm breakpoint and above)
2. The sidebar renders as a vertical navigation on the left side with a right border
3. The content area fills the remaining space to the right
4. Resize to a narrow viewport (below sm breakpoint)
5. The sidebar collapses to a horizontal tab bar at the top with a bottom border
6. The layout shifts to a stacked column arrangement
7. The horizontal tabs are scrollable horizontally if needed (overflow-x-auto)
8. All three category buttons remain visible and clickable

---

## Sample Test Data

```json
{
  "general": {
    "agentNamePrefix": "Agent",
    "defaultPriority": "medium",
    "timezone": "America/New_York",
    "theme": "system",
    "language": "en"
  },
  "connections": [
    { "id": "svc-slack", "service": "Slack", "description": "Send and receive messages in Slack channels and DMs", "connected": true },
    { "id": "svc-gmail", "service": "Gmail", "description": "Read, draft, and send emails through your Gmail account", "connected": true },
    { "id": "svc-github", "service": "GitHub", "description": "Monitor repos, review pull requests, and manage issues", "connected": true },
    { "id": "svc-google-calendar", "service": "Google Calendar", "description": "Read and create calendar events across your Google accounts", "connected": false },
    { "id": "svc-linear", "service": "Linear", "description": "Sync sprint progress and manage project tracking", "connected": true },
    { "id": "svc-notion", "service": "Notion", "description": "Read and write pages in your Notion workspaces", "connected": true },
    { "id": "svc-whatsapp", "service": "WhatsApp", "description": "Send and receive messages via WhatsApp Business", "connected": false },
    { "id": "svc-telegram", "service": "Telegram", "description": "Communicate through Telegram bots and channels", "connected": false },
    { "id": "svc-spotify", "service": "Spotify", "description": "Create and manage playlists, control playback", "connected": false },
    { "id": "svc-pagerduty", "service": "PagerDuty", "description": "Receive and triage infrastructure alerts and incidents", "connected": false }
  ],
  "privacy": {
    "dataCollection": true,
    "memoryPersistence": true,
    "sandboxedMode": false
  }
}
```
