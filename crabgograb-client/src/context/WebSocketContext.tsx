import React, { createContext, useContext } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

type WebSocketContextType = ReturnType<typeof useWebSocket>;

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const webSocketState = useWebSocket();

  return (
    <WebSocketContext.Provider value={webSocketState}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      'useWebSocketContext must be used within WebSocketProvider'
    );
  }
  return context;
};
