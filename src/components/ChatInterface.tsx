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
  ChevronDown,
} from "lucide-react";
import { ChatColumn } from "./ChatContainer";
import ModelSettings from "./ModelSettings";
import { useChat } from "ai/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define all available models
const AVAILABLE_MODELS = [
  // OpenAI Models
  "gpt-4-turbo-preview",
  "gpt-4",
  "gpt-3.5-turbo",
  // Anthropic Models
  "claude-3-opus",
  "claude-3-sonnet",
  "claude-2.1",
  "claude-2",
  "claude-instant",
  // Google Models
  "gemini-pro",
  "gemini-pro-vision",
  // Mistral Models
  "mistral-tiny",
  "mistral-small",
  "mistral-medium",
  // Meta Models
  "llama-2-70b",
  "llama-2-13b",
  "llama-2-7b",
  // Cohere Models
  "command",
  "command-light",
  "command-nightly",
] as const;

interface ChatInterfaceProps {
  column: ChatColumn;
  onRemove: () => void;
  onUpdateSettings: (updates: Partial<ChatColumn>) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatInterface = ({
  column,
  onRemove,
  onUpdateSettings,
}: ChatInterfaceProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("message") as HTMLInputElement;
    const message = input.value.trim();
    
    if (!message) return;
    
    const userMessage: Message = { role: "user", content: message };
    setMessages(prev => [...prev, userMessage]);
    input.value = "";
    
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

  return (
    <Card className="w-[400px] min-w-[400px] flex flex-col h-full bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 font-semibold">
                {column.model}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-[300px] overflow-y-auto w-[200px]">
              {AVAILABLE_MODELS.map((model) => (
                <DropdownMenuItem
                  key={model}
                  onClick={() => onUpdateSettings({ model })}
                  className="cursor-pointer"
                >
                  {model}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
            name="message"
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