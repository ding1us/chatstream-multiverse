import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ChatInterface from "./ChatInterface";
import { nanoid } from "nanoid";

export type ChatColumn = {
  id: string;
  model: string;
  apiKey: string;
  temperature: number;
  maxTokens: number;
};

const ChatContainer = () => {
  const [chatColumns, setChatColumns] = useState<ChatColumn[]>([
    {
      id: nanoid(),
      model: "gpt-3.5-turbo",
      apiKey: "",
      temperature: 0.7,
      maxTokens: 1000,
    },
  ]);

  const addChatColumn = () => {
    setChatColumns((prev) => [
      ...prev,
      {
        id: nanoid(),
        model: "gpt-3.5-turbo",
        apiKey: "",
        temperature: 0.7,
        maxTokens: 1000,
      },
    ]);
  };

  const removeChatColumn = (id: string) => {
    setChatColumns((prev) => prev.filter((col) => col.id !== id));
  };

  const updateColumnSettings = (id: string, updates: Partial<ChatColumn>) => {
    setChatColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, ...updates } : col))
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 flex overflow-x-auto p-4 gap-4">
        {chatColumns.map((column) => (
          <ChatInterface
            key={column.id}
            column={column}
            onRemove={() => removeChatColumn(column.id)}
            onUpdateSettings={(updates) => updateColumnSettings(column.id, updates)}
          />
        ))}
        <Button
          variant="outline"
          className="h-full min-w-[300px] flex flex-col items-center justify-center gap-2"
          onClick={addChatColumn}
        >
          <PlusCircle className="h-8 w-8" />
          Add Chat Column
        </Button>
      </div>
    </div>
  );
};

export default ChatContainer;