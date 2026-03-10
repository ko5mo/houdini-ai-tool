export interface ModelOption {
  id: string;
  label: string;
  note: string;
}

export const RECOMMENDED_MODEL_OPTIONS: ModelOption[] = [
  {
    id: "qwen-coder",
    label: "Qwen3 Coder 30B",
    note: "Best first pick for structured VEX and JSON output.",
  },
  {
    id: "gemini-fast",
    label: "Gemini 2.5 Flash Lite",
    note: "Fast general backup when code-only output still needs good instruction following.",
  },
  {
    id: "openai-fast",
    label: "GPT-5 Nano",
    note: "Stable lightweight fallback for clean schema-following.",
  },
  {
    id: "mistral",
    label: "Mistral Small 3.2",
    note: "Cheap last generalist fallback.",
  },
  {
    id: "nova-fast",
    label: "Amazon Nova Micro",
    note: "Very fast experimental option for quick prompt poking.",
  },
  {
    id: "step-3.5-flash",
    label: "Step 3.5 Flash",
    note: "Cheap alpha option if you want to compare behavior.",
  },
];

export const DEFAULT_MODEL_ID = RECOMMENDED_MODEL_OPTIONS[0].id;

export function buildModelChain(preferredModel?: string) {
  const preferred = preferredModel?.trim();
  const envPreferred = process.env.POLLEN_MODEL?.trim();
  const envFallbacks = (process.env.POLLEN_FALLBACK_MODELS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const recommendedIds = RECOMMENDED_MODEL_OPTIONS.map((model) => model.id);

  return [...new Set([preferred, envPreferred, ...envFallbacks, ...recommendedIds].filter((value): value is string => Boolean(value)))];
}

