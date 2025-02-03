import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define all available models and their supported parameters
export const MODEL_CONFIGS = {
  // OpenAI Models
  "gpt-4-turbo-preview": {
    temperature: { min: 0, max: 2, default: 0.7 },
    maxTokens: { min: 1, max: 4096, default: 1000 },
    topP: { min: 0, max: 1, default: 1 },
    frequencyPenalty: { min: -2, max: 2, default: 0 },
    presencePenalty: { min: -2, max: 2, default: 0 },
    systemPrompt: true,
  },
  "gpt-4": {
    temperature: { min: 0, max: 2, default: 0.7 },
    maxTokens: { min: 1, max: 8192, default: 1000 },
    topP: { min: 0, max: 1, default: 1 },
    frequencyPenalty: { min: -2, max: 2, default: 0 },
    presencePenalty: { min: -2, max: 2, default: 0 },
    systemPrompt: true,
  },
  "gpt-3.5-turbo": {
    temperature: { min: 0, max: 2, default: 0.7 },
    maxTokens: { min: 1, max: 4096, default: 1000 },
    topP: { min: 0, max: 1, default: 1 },
    frequencyPenalty: { min: -2, max: 2, default: 0 },
    presencePenalty: { min: -2, max: 2, default: 0 },
    systemPrompt: true,
  },
  // Anthropic Models
  "claude-3-opus": {
    temperature: { min: 0, max: 1, default: 0.7 },
    maxTokens: { min: 1, max: 4096, default: 1000 },
    topP: { min: 0, max: 1, default: 1 },
    systemPrompt: true,
  },
  "claude-3-sonnet": {
    temperature: { min: 0, max: 1, default: 0.7 },
    maxTokens: { min: 1, max: 4096, default: 1000 },
    topP: { min: 0, max: 1, default: 1 },
    systemPrompt: true,
  },
  // Add configurations for other models...
} as const;

export const AVAILABLE_MODELS = Object.keys(MODEL_CONFIGS);

interface ModelSelectorProps {
  currentModel: string;
  onModelSelect: (model: string) => void;
}

const ModelSelector = ({ currentModel, onModelSelect }: ModelSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 font-semibold">
          {currentModel}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[300px] overflow-y-auto w-[200px]">
        {AVAILABLE_MODELS.map((model) => (
          <DropdownMenuItem
            key={model}
            onClick={() => onModelSelect(model)}
            className="cursor-pointer"
          >
            {model}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelSelector;