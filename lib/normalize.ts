import { generateHeuristicResult } from "@/lib/heuristic";
import type { Intent, Parameter, ParameterType, VexResult, WrangleClass } from "@/lib/types";
import { detectOutputAttribute, extractVexBody, prettyLabel } from "@/lib/utils";

function normalizeIntent(value: unknown, prompt: string): Intent {
  const normalized = String(value || "").trim().toLowerCase();
  const allowed: Intent[] = ["mask", "growth", "wobble", "color", "twist", "organic"];

  if (allowed.includes(normalized as Intent)) {
    return normalized as Intent;
  }

  return generateHeuristicResult(prompt).intent;
}

function normalizeClass(value: unknown, prompt: string): WrangleClass {
  const normalized = String(value || "").trim().toLowerCase();
  const allowed: WrangleClass[] = ["points", "primitives", "detail", "vertices"];

  if (allowed.includes(normalized as WrangleClass)) {
    return normalized as WrangleClass;
  }

  return generateHeuristicResult(prompt).class;
}

function normalizeParameterType(value: unknown): ParameterType {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized === "bool" || normalized === "int") {
    return normalized;
  }

  return "float";
}

function normalizeParam(raw: unknown, index: number): Parameter {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const type = normalizeParameterType(source.type);
  const fallbackName = `control_${index + 1}`;
  const name =
    String(source.name || fallbackName)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "") || fallbackName;

  const min = Number.isFinite(Number(source.min)) ? Number(source.min) : type === "int" ? 0 : 0;
  const max = Number.isFinite(Number(source.max)) ? Number(source.max) : type === "int" ? 10 : 1;
  const step = type === "int" ? 1 : Number.isFinite(Number(source.step)) && Number(source.step) > 0 ? Number(source.step) : 0.01;
  const baseDefault =
    type === "bool"
      ? Boolean(source.default)
      : Number.isFinite(Number(source.default))
        ? Number(source.default)
        : min;

  return {
    name,
    type,
    default: type === "bool" ? baseDefault : Math.min(Math.max(Number(baseDefault), min), max),
    min,
    max,
    step,
    label: String(source.label || prettyLabel(name)),
    help: String(source.help || ""),
  };
}

function normalizeParameters(value: unknown, fallback: Parameter[]) {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map(normalizeParam);
}

function normalizeText(value: unknown, fallback: string) {
  const normalized = String(value || "").trim();
  return normalized || fallback;
}

export function normalizeModelResult(raw: unknown, prompt: string): VexResult {
  const fallback = generateHeuristicResult(prompt);
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const parameters = normalizeParameters(source.parameters ?? source.params, fallback.parameters);
  const rawCode = normalizeText(source.vex_code ?? source.code, fallback.vex_code);
  const vexCode = extractVexBody(rawCode);
  const intent = normalizeIntent(source.intent, prompt);
  const wrangleClass = normalizeClass(source.class, prompt);
  const outputAttribute = normalizeText(source.output_attribute, detectOutputAttribute(vexCode));

  return {
    intent,
    output_attribute: outputAttribute,
    vex_code: vexCode,
    parameters,
    class: wrangleClass,
    explanation: normalizeText(source.explanation, fallback.explanation),
    assumptions: normalizeText(source.assumptions, "Model output normalized for Houdini 20.5 Attribute Wrangle usage."),
    source: "model",
  };
}

