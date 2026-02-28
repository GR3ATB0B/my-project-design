# Data Shape

## Entities

### Agent
A running instance of the OpenClaw AI assistant, with a name, status, connected chat channels, and configuration.

### Task
A unit of work assigned to or created by an agent, with a customizable status, priority, and history of activity.

### TaskColumn
A user-defined column on the kanban board representing a workflow stage (e.g., Waiting, Doing, Needs Attention, Done).

### Skill
A plugin or integration that extends an agent's capabilities — such as Gmail, GitHub, Spotify, or a custom user-built skill.

### UsageRecord
A log entry tracking token consumption for a specific request or session, tied to an agent and LLM model with associated cost.

### Memory
A persistent knowledge entry stored by the agent — a learned preference, fact, or context that personalizes its behavior over time.

### Connection
A linked external service or chat app (WhatsApp, Telegram, Slack, etc.) through which the agent communicates and receives tasks.

## Relationships

- Agent has many Task
- Agent has many Skill
- Agent has many UsageRecord
- Agent has many Memory
- Agent has many Connection
- Task belongs to Agent
- Task belongs to TaskColumn
- TaskColumn has many Task
- Skill belongs to Agent
- UsageRecord belongs to Agent
- Memory belongs to Agent
- Connection belongs to Agent
