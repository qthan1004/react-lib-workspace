---
name: Task Delegation & Micro-Agents
description: Protocol for Planner Agent to break down large jobs into atomic ticket files for Worker Agents in separate conversations.
---

# Task Delegation Protocol

When handling large feature requests, the Planner Agent MUST NOT attempt to execute all code directly to avoid quota/context exhaustion. Instead, it must break down the feature into Atomic Tasks for Worker Agents (in fresh chat sessions) to execute.

## 1. Planner Agent Protocol
1.  **Decompose**: Break the large system into atomic, self-contained units (e.g., 1 isolated component or 1 library).
2.  **Generate Task Files**: Create a markdown file for each atomic task inside `plan/tasks/todo/`.

### Task Ticket Format (`plan/tasks/todo/01-task-name.md`)
```markdown
# [Task Name]
- **Goal**: [Clear, specific objective]
- **Context/Files**: [Absolute paths to files to create/modify]
- **Constraints**: [Adherence to existing patterns, a11y, etc.]
- **Completion**: [Build check, UI verification, or push command]
```

## 2. Worker Agent Protocol
The Worker Agent is instantiated in a New Chat session with the prompt: "Execute task plan/tasks/todo/01-xxx.md".
1.  **Ingest Context**: Read the specified task ticket file.
2.  **Execute**: Write code following the ticket's constraints.
3.  **Complete**: Move the finished ticket using `mv plan/tasks/todo/xxx.md plan/tasks/done/xxx.md`.
4.  **Handoff**: Notify the User the task is done so they can spawn the next Worker Agent.
