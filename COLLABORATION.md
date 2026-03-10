# Collaboration

This repo is shared between John and Lukas.

## Roles

- John drives product direction, AI/tooling, API wiring, and repo integration.
- Lukas tests usefulness from the Houdini side, validates the generated VEX in real wrangles, and pushes the tool toward artist-usable outputs.
- Codex should act as a shared builder and maintain continuity across both of your sessions.

## Working rule

Keep the project state explicit in the repo, not only in chat.

When Codex changes direction, scope, UI behavior, or generation logic, it should also update the relevant context files in the repo:

- `CONTEXT.md` for the shared product direction
- `README.md` for current setup and usage
- this file for collaboration workflow if the process changes

## Lukas handoff

When Lukas opens the repo for the first time and starts talking to Codex, the first instruction should be something close to:

`Read CONTEXT.md and COLLABORATION.md first, then inspect the app and help me test whether the generated VEX is actually useful in Houdini. Be concrete and production-minded.`

That gives the agent the right frame before it starts changing things.

## Recommended feedback loop

1. Lukas pulls or forks the repo and tests prompts inside Houdini.
2. Lukas gives Codex direct feedback:
   - what pasted cleanly
   - what failed in a wrangle
   - which controls felt useful
   - which outputs felt fake, generic, or not artist-friendly
3. Codex updates code and also refreshes repo context where needed.
4. Lukas commits his changes.
5. John pulls the changes back here and continues from the updated repo state.

## Commit hygiene

- Prefer small commits tied to a single useful improvement.
- If a Codex session changes behavior, explain the why in the commit message, not only the what.
- Preserve the thin core loop:
  - prompt in
  - VEX out
  - artist controls extracted

## Current validation target

Success means Lukas can paste generated code into a Houdini Attribute Wrangle and either:

- it works immediately, or
- it fails in a way that gives a very clear next fix

The fastest path is still the right one:
test in Houdini, tighten the output, commit, repeat.
