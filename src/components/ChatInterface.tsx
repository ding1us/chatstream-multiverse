import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Settings,
  Trash2,
  Send,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { ChatColumn } from "./ChatContainer";
import ModelSettings from "./ModelSettings";
import ModelSelector from "./ModelSelector";
import { useChat } from "ai/react";

interface ChatInterfaceProps {
  column: ChatColumn;
  onRemove: () => void;
  onUpdateSettings: (updates: Partial<ChatColumn>) => void;
  syncedInput: string;
  onSyncedInputChange: (value: string) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatInterface = ({
  column,
  onRemove,
  onUpdateSettings,
  syncedInput,
  onSyncedInputChange,
}: ChatInterfaceProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [localInput, setLocalInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = column.syncInputs ? syncedInput : localInput;
    
    if (!message) return;
    
    const userMessage: Message = { role: "user", content: message };
    setMessages(prev => [...prev, userMessage]);
    
    if (column.syncInputs) {
      onSyncedInputChange("");
    } else {
      setLocalInput("");
    }
    
    setIsLoading(true);
    
    try {
      const assistantMessage: Message = {
        role: "assistant",
        content: "This is a placeholder response. Implement AI integration here.",
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleInputChange = (value: string) => {
    if (column.syncInputs) {
      onSyncedInputChange(value);
    } else {
      setLocalInput(value);
    }
  };

  return (
    <Card className="w-[400px] min-w-[400px] flex flex-col h-full bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-2">
          <ModelSelector
            currentModel={column.model}
            onModelSelect={(model) => onUpdateSettings({ model })}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {showSettings && (
        <ModelSettings
          settings={column}
          onUpdate={onUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={column.syncInputs ? syncedInput : localInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;