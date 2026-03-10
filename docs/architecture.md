# Architecture Starter

## High-Level System

The product has two halves:

1. Houdini-side plugin
2. Assistant backend

## 1. Houdini-Side Plugin

Recommended stack:

- Python Panel for the main UI shell
- PySide6 for custom interface
- `hou` Python API for scene inspection

Responsibilities:

- capture current scene context
- package selected node metadata
- send structured requests to backend
- render assistant responses
- optionally apply approved code snippets

## Houdini Data Model

The plugin should serialize scene context into small, explicit JSON payloads.

Example payload:

```json
{
  "mode": "debug",
  "context": {
    "hip_file": "creature_rig_v12.hip",
    "frame": 104,
    "selection": [
      {
        "path": "/obj/geo1/attribwrangle3",
        "category": "Sop",
        "type_name": "attribwrangle",
        "inputs": ["/obj/geo1/null2"],
        "outputs": ["/obj/geo1/blast1"],
        "errors": [],
        "warnings": [],
        "parms": {
          "class": "point",
          "snippet": "@Cd = set(1,0,0);"
        }
      }
    ]
  },
  "user_prompt": "Why is this not writing the attribute I expect?"
}
```

Keep payloads compact. Do not dump the entire scene by default.

## 2. Assistant Backend

Recommended backend shape:

- Next.js or lightweight Python service for API and session handling
- provider abstraction for LLM backends
- prompt templates per task mode
- optional retrieval layer for docs / saved examples / studio notes

Responsibilities:

- receive structured scene payloads
- build task-specific prompts
- return structured response objects
- log safe telemetry if desired

## Response Contract

Use structured responses instead of raw text blobs.

Example shape:

```json
{
  "summary": "The wrangle is running over points, but the attribute logic depends on detail-level aggregation.",
  "diagnosis": [
    "The code assumes access to a global max value that is never computed.",
    "The incoming geometry does not appear to contain the source attribute."
  ],
  "actions": [
    "Switch the wrangle to detail mode and compute the aggregate once.",
    "Verify that the upstream node creates f@curvature before this wrangle."
  ],
  "code_suggestion": "float maxv = ...;",
  "assumptions": [
    "Assumes the source attribute should exist on the incoming geometry."
  ]
}
```

This makes UI rendering much cleaner.

## Task Modes

Start with mode-specific prompting:

- `explain`
- `debug`
- `build`
- `apex`

Why this matters:

Different tasks need different tone, output shape, and reasoning depth.

## APEX-Specific Handling

APEX should not be treated as just another node graph.

The system prompt for APEX mode should force the model to explain:

- what the graph is trying to compute
- what data enters the graph
- where intermediate state is stored
- evaluation order
- which nodes are control logic vs deformation logic
- how the graph maps to animator expectations

This is where the product can become genuinely differentiated.

## Suggested Phase Plan

### Phase 1

- Python Panel UI
- local scene inspection
- API call to backend
- explain / debug / build modes

### Phase 2

- APEX-focused mode
- geometry summaries
- code apply actions
- saved notes / exports

### Phase 3

- project knowledge retrieval
- HDA-aware assistance
- team documentation features
- optional local model support

## Recommended MVP Build Order

1. Build the scene context extractor.
2. Build the response schema and prompt routing.
3. Build `Explain` mode end-to-end.
4. Add `Debug` mode.
5. Add `Snippet Builder`.
6. Add `APEX Translator`.

## Real Competitive Edge

The moat is not "we call a model from Houdini".

The moat is:

- better scene packaging
- better task framing
- explicit graph logic explanations
- trustable, production-shaped outputs
