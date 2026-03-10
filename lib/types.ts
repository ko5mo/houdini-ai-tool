export type Intent = "mask" | "growth" | "wobble" | "color" | "twist" | "organic";
export type WrangleClass = "points" | "primitives" | "detail" | "vertices";
export type ParameterType = "float" | "int" | "bool";
export type ParameterValue = number | boolean;

export interface Parameter {
  name: string;
  type: ParameterType;
  default: ParameterValue;
  min: number;
  max: number;
  step?: number;
  label: string;
  help?: string;
}

export interface VexResult {
  intent: Intent;
  output_attribute: string;
  vex_code: string;
  parameters: Parameter[];
  class: WrangleClass;
  explanation: string;
  assumptions: string;
  source: "model" | "heuristic";
}

export type ParamMap = Record<string, ParameterValue>;

