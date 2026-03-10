# MVP Spec

## Product Name

Working title: `Houdini Operator`

## Core Product Thesis

The first version should win on clarity and usefulness, not on breadth.

The assistant should inspect live Houdini context and return structured, production-oriented help that is better than a generic web LLM because it can see:

- selected nodes
- node types
- parameter values
- input/output wiring
- errors and warnings
- optional geometry summaries

## MVP Features

### 1. Graph Explain

User selects one or more nodes and asks:

- "What does this setup do?"
- "Explain this network step by step."
- "Why is this solver chain built like this?"

Assistant returns:

- high-level purpose
- data flow summary
- key nodes and why they matter
- suspicious choices or fragility
- suggested cleanup or next steps

### 2. Debug This Node

User selects a node and asks:

- "Why is this failing?"
- "Why is my sim exploding?"
- "Why are my points not inheriting velocity?"

Assistant uses available metadata:

- node type
- parms
- errors
- warnings
- input node types
- optional geometry stats

Assistant returns:

- likely failure causes ranked by confidence
- exact parameters / nodes to inspect
- a minimal fix strategy
- optional replacement snippet

### 3. Snippet Builder

User asks for:

- VEX wrangles
- Python shelf snippets
- parameter expressions
- HDA callback scripts

Assistant returns:

- code
- short explanation
- assumptions
- safe usage notes

### 4. APEX Translator

User gives a rigging goal such as:

- "FK/IK blend for a tentacle"
- "secondary motion on a neck chain"
- "muscle-like jiggle on deformation controls"

Assistant returns:

- graph intent
- required inputs
- node categories involved
- evaluation order
- where state lives
- how data flows through the graph

Important:

This feature should explain APEX logic explicitly instead of pretending it is a standard SOP network.

### 5. Scene Notes / Doc Export

User can export:

- node summary
- debug note
- generated snippet
- APEX graph plan

This makes the tool useful for teams and future handoff.

## UX Shape

Inside Houdini:

- dockable Python Panel
- left rail for task modes
- main conversation pane
- context pane showing selected nodes and captured scene data
- response cards with copy / apply / save actions

Task modes:

- Explain
- Debug
- Build
- APEX

## MVP Interaction Model

The tool should not silently mutate the scene.

Instead it should support three action levels:

1. `Explain only`
2. `Generate code or graph plan`
3. `Apply suggested code to a chosen target`

This keeps trust high.

## Required Houdini Context Capture

Minimum capture:

- current selection paths
- node type names
- parameter names and values
- upstream / downstream connections
- node errors and warnings

Nice to have:

- geometry summary:
  - point count
  - prim count
  - attrib names
  - bbox
- cooked state
- playbar frame
- context category (SOP, DOP, LOP, OBJ, APEX)

## Example Jobs The MVP Must Handle

### SOP Example

`Explain why my copy-to-points setup is not orienting correctly.`

### DOP Example

`Check this vellum chain and tell me why constraints are going unstable.`

### VEX Example

`Write a detail wrangle that creates a branching mask attribute from curvature and noise.`

### APEX Example

`How would I build a tail rig with overlap and animator-friendly controls in APEX?`

## Success Criteria

The MVP is good if a Houdini user says:

- "This actually understands my scene."
- "It saved me 15-30 minutes on a real task."
- "The APEX explanation finally clicked."

## Deliberate Constraints

For v1, prefer:

- selected-node workflows
- text-first responses
- small safe code generation

Avoid for now:

- full scene embeddings
- autonomous network rewrites
- giant multi-context orchestration
