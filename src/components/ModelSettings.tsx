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
import { ChatColumn } from "./ChatContainer";

interface ModelSettingsProps {
  settings: ChatColumn;
  onUpdate: (updates: Partial<ChatColumn>) => void;
  onClose: () => void;
}

const ModelSettings = ({ settings, onUpdate, onClose }: ModelSettingsProps) => {
  return (
    <Card className="absolute top-16 right-4 w-80 z-10">
      <CardHeader>
        <CardTitle className="text-lg">Model Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={settings.model}
            onChange={(e) => onUpdate({ model: e.target.value })}
          />
        </div>
        
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

        <div className="space-y-2">
          <Label>Temperature: {settings.temperature}</Label>
          <Slider
            value={[settings.temperature]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={(value) => onUpdate({ temperature: value[0] })}
          />
        </div>

        <div className="space-y-2">
          <Label>Max Tokens: {settings.maxTokens}</Label>
          <Slider
            value={[settings.maxTokens]}
            min={100}
            max={4000}
            step={100}
            onValueChange={(value) => onUpdate({ maxTokens: value[0] })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSettings;