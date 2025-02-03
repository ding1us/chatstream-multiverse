import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChatColumn } from "./ChatContainer";
import { MODEL_CONFIGS } from "./ModelSelector";

interface ModelSettingsProps {
  settings: ChatColumn;
  onUpdate: (updates: Partial<ChatColumn>) => void;
  onClose: () => void;
}

const ModelSettings = ({ settings, onUpdate, onClose }: ModelSettingsProps) => {
  const modelConfig = MODEL_CONFIGS[settings.model as keyof typeof MODEL_CONFIGS];

  return (
    <Card className="absolute top-16 right-4 w-80 z-10">
      <CardHeader>
        <CardTitle className="text-lg">Model Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={settings.apiKey}
            onChange={(e) => onUpdate({ apiKey: e.target.value })}
            placeholder="Enter your API key"
          />
        </div>

        {modelConfig?.systemPrompt && (
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={settings.systemPrompt}
              onChange={(e) => onUpdate({ systemPrompt: e.target.value })}
              placeholder="Enter system prompt"
              className="min-h-[100px]"
            />
          </div>
        )}

        {modelConfig?.temperature && (
          <div className="space-y-2">
            <Label>Temperature: {settings.temperature}</Label>
            <Slider
              value={[settings.temperature]}
              min={modelConfig.temperature.min}
              max={modelConfig.temperature.max}
              step={0.1}
              onValueChange={(value) => onUpdate({ temperature: value[0] })}
            />
          </div>
        )}

        {modelConfig?.maxTokens && (
          <div className="space-y-2">
            <Label>Max Tokens: {settings.maxTokens}</Label>
            <Slider
              value={[settings.maxTokens]}
              min={modelConfig.maxTokens.min}
              max={modelConfig.maxTokens.max}
              step={100}
              onValueChange={(value) => onUpdate({ maxTokens: value[0] })}
            />
          </div>
        )}

        {modelConfig?.topP && (
          <div className="space-y-2">
            <Label>Top P: {settings.topP}</Label>
            <Slider
              value={[settings.topP]}
              min={modelConfig.topP.min}
              max={modelConfig.topP.max}
              step={0.1}
              onValueChange={(value) => onUpdate({ topP: value[0] })}
            />
          </div>
        )}

        {modelConfig?.frequencyPenalty && (
          <div className="space-y-2">
            <Label>Frequency Penalty: {settings.frequencyPenalty}</Label>
            <Slider
              value={[settings.frequencyPenalty]}
              min={modelConfig.frequencyPenalty.min}
              max={modelConfig.frequencyPenalty.max}
              step={0.1}
              onValueChange={(value) => onUpdate({ frequencyPenalty: value[0] })}
            />
          </div>
        )}

        {modelConfig?.presencePenalty && (
          <div className="space-y-2">
            <Label>Presence Penalty: {settings.presencePenalty}</Label>
            <Slider
              value={[settings.presencePenalty]}
              min={modelConfig.presencePenalty.min}
              max={modelConfig.presencePenalty.max}
              step={0.1}
              onValueChange={(value) => onUpdate({ presencePenalty: value[0] })}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="syncInputs">Sync Inputs</Label>
          <Switch
            id="syncInputs"
            checked={settings.syncInputs}
            onCheckedChange={(checked) => onUpdate({ syncInputs: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSettings;