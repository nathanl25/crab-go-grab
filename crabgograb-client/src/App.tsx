import React from 'react';
import {
  WebSocketProvider,
  useWebSocketContext,
} from './context/WebSocketContext';
import GameSection from './components/GameSection/GameSection';
import JoinSection from './components/JoinSection/JoinSection';
import { Modal } from './components/Modal/Modal';

const App: React.FC = () => {
  return (
    <WebSocketProvider>
      <AppContent />
    </WebSocketProvider>
  );
};

const AppContent: React.FC = () => {
  const { connected } = useWebSocketContext();

  return (
    <main>
      {!connected ? <JoinSection /> : <GameSection />}
      <Modal />
    </main>
  );
};

export default App;
