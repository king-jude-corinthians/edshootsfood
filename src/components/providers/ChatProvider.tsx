"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface ChatContextType {
  isOpen: boolean;
  openChat: (prefill?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  prefillMessage: string | null;
  clearPrefill: () => void;
}

const ChatContext = createContext<ChatContextType>({
  isOpen: false,
  openChat: () => {},
  closeChat: () => {},
  toggleChat: () => {},
  prefillMessage: null,
  clearPrefill: () => {},
});

export function useChat() {
  return useContext(ChatContext);
}

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState<string | null>(null);

  const openChat = useCallback((prefill?: string) => {
    if (prefill) setPrefillMessage(prefill);
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const clearPrefill = useCallback(() => {
    setPrefillMessage(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{ isOpen, openChat, closeChat, toggleChat, prefillMessage, clearPrefill }}
    >
      {children}
    </ChatContext.Provider>
  );
}
