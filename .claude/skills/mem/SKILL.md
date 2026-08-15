# Memory Skill (`/mem`)

This skill provides Claude with persistent, hierarchical memory stored in `~/.claude/memory/`.

## Structure

- `~/.claude/memory/core.md` — always-loaded summaries with pointers to topic files
- `~/.claude/memory/me.md` — user profile (always loaded)
- `~/.claude/memory/topics/<topic>.md` — detailed entries by subject
- `~/.claude/memory/projects/<project>.md` — project-specific knowledge

## Automatic Operations

**Load** (session start): Read user profile and core memory, return context summary.

**Save** (after learning): Categorize observations, append timestamped entries to topic files, update core.md summaries.

**Recall** (when needed): Search core.md for pointers, load matching topic files, return relevant entries.

## User Commands

- `/mem show` — Display memory structure and file contents
- `/mem forget <topic>` — Remove a topic file and related core.md entries

## When to save automatically

- User says "remember this" or similar
- Non-trivial problem solved
- User preference or workflow discovered
- Project-specific insight learned
- Same pattern repeats across sessions

## When to recall automatically

- Starting unfamiliar work in this project
- Troubleshooting a recurring issue
- User asks "do you remember…"
- Past context would clearly improve the response

## Design principles

- Background agents only — never block the primary task
- Plain markdown files — user-editable at any time
- Categorical organization — no unstructured dumps
- Timestamped entries in each topic file
