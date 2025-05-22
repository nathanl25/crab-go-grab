import React, { createContext, useContext, type ReactNode } from 'react';

// Currently not in use, prop drilling is used instead

interface WebSocketContextType {
  connected: boolean;
  messages: string[];
}

const WebSocketContext = createContext<WebSocketContextType>({
  connected: false,
  messages: [],
});

interface WebSocketProviderProps {
  children: ReactNode;
  value: WebSocketContextType;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  value,
}) => {
  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
