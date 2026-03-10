# Context

This repo is for a focused Houdini tool experiment.

## Team

- John: product, AI/tooling, prompt and API architecture
- Lukas: Houdini artist/TD, procedural FX, rendering, raymarching/fractals, moving into APEX
- Codex: builder, planner, drafter, creative technical partner

## Core idea

Do not build a generic "Houdini assistant" first.

Build the thinnest useful hook:

`prompt -> Houdini-ready VEX -> extracted artist controls`

The point is not just code generation.
The point is turning intent into usable setups.

## Why this direction

- easier to demo
- easier to validate with real artists
- more concrete than a broad scene-aware copilot
- directly useful even before deep Houdini integration

## Current spike

The prototype already lives in:

- `index.html`
- `styles.css`
- `app.js`
- `server.js`

Current behavior:

- user writes a prompt
- app detects a rough intent
- app generates a Houdini-flavored wrangle snippet
- app extracts likely parameters
- sliders update suggested defaults

Known intents right now:

- mask
- growth
- wobble
- color
- twist

## Working principle

Prefer building over over-planning.

If the thin loop feels useful to Lukas, keep going.
If it does not, adjust fast.

## Immediate next step

Keep the UI flow, replace the heuristic generator in `app.js` with a real model call.

Keep the output shape stable:

- prompt
- intent
- params
- VEX
- short explanation

## Longer-term direction

Possible later layers, only after the thin core proves itself:

- Houdini panel integration
- scene-aware context
- debug/explain modes
- shader/material modes
- APEX translation and rig logic assistance
