"use client";

import { Sparkles } from "lucide-react";
import { PollenKeyPanel } from "@/components/PollenKeyPanel";
import { DEFAULT_MODEL_ID, RECOMMENDED_MODEL_OPTIONS } from "@/lib/model-options";
import type { VexResult } from "@/lib/types";
import { prettyClass, prettyLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PromptPanelProps {
  prompt: string;
  loading: boolean;
  result: VexResult | null;
  examples: string[];
  selectedModel: string;
  onModelChange: (value: string) => void;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  onExampleClick: (value: string) => void;
}

export function PromptPanel({
  prompt,
  loading,
  result,
  examples,
  selectedModel,
  onModelChange,
  onPromptChange,
  onSubmit,
  onExampleClick,
}: PromptPanelProps) {
  const activeModel =
    RECOMMENDED_MODEL_OPTIONS.find((model) => model.id === selectedModel) ??
    RECOMMENDED_MODEL_OPTIONS.find((model) => model.id === DEFAULT_MODEL_ID) ??
    RECOMMENDED_MODEL_OPTIONS[0];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Prompt</CardTitle>
            <CardDescription>Describe the effect or behavior you want in Houdini.</CardDescription>
          </div>
          <Button onClick={onSubmit} disabled={loading || !prompt.trim()}>
            <Sparkles className="h-4 w-4" />
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-96px)] flex-col gap-5">
        <textarea
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              onSubmit();
            }
          }}
          rows={4}
          spellCheck={false}
          placeholder="Build me a point wrangle that creates an organic mask over the surface using height and noise..."
          className="min-h-44 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-accent/50"
        />

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Quick prompts</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => onExampleClick(example)}
                className="rounded-full border border-zinc-700 px-3 py-1.5 text-left text-xs text-zinc-300 transition-colors hover:border-accent/40 hover:bg-zinc-800 hover:text-zinc-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Model</p>
            <span className="text-xs text-zinc-500">Recommended set</span>
          </div>
          <div className="space-y-2">
            <select
              value={selectedModel}
              onChange={(event) => onModelChange(event.target.value)}
              className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-accent/50"
            >
              {RECOMMENDED_MODEL_OPTIONS.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.label}
                </option>
              ))}
            </select>
            <p className="text-xs leading-5 text-zinc-500">{activeModel.note}</p>
          </div>
        </div>

        <Separator />

        <PollenKeyPanel />

        <Separator />

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Generation meta</p>
          {result ? (
            <div className="flex flex-wrap gap-2">
              <Badge>{prettyLabel(result.intent)}</Badge>
              <Badge variant="secondary">{prettyClass(result.class)}</Badge>
              <Badge variant="outline">{result.output_attribute}</Badge>
            </div>
          ) : (
            <p className="text-sm text-zinc-500">Generate something first.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
