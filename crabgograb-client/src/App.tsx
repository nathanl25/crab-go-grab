import React from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import GameSection from './components/GameSection/GameSection';
import JoinSection from './components/JoinSection/JoinSection';
import { Modal } from './components/Modal/Modal';

const App: React.FC = () => {
  const {
    connected,
    isRolling,
    players,
    modalOpen,
    modalMessage,
    closeModal,
    connect,
    disconnect,
    sendMessage,
    rollDice,
    messages,
    setPlayerSelection,
    playerSelection,
    notifySelection,
  } = useWebSocket();

  return (
    <main>
      {!connected ? (
        <JoinSection onConnect={connect} />
      ) : (
        <GameSection
          onDisconnect={disconnect}
          isRolling={isRolling}
          rollDice={rollDice}
          messages={messages}
          playerSelection={playerSelection}
          setPlayerSelection={setPlayerSelection}
          notifySelection={notifySelection}
          sendMessage={sendMessage}
          players={players}
        />
      )}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        message={modalMessage}
        type={modalMessage.includes('correctly') ? 'success' : 'error'}
      />
    </main>
  );
};

export default App;
