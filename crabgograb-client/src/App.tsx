import React, { useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import MessageForm from './components/Forms/MessageForm';
import MessageLog from './components/MessageLog/MessageLog';
import JoinForm from './components/Forms/JoinForm';
import RollSelector from './components/RollSelector/RollSelector';

const App: React.FC = () => {
  // const [selection, setSelection] = useState<number>(0);
  const {
    connected,
    isRolling,
    connect,
    disconnect,
    sendMessage,
    rollDice,
    messages,
    setPlayerSelection,
    playerSelection,
    notifySelection,
  } = useWebSocket();

  const updateSelection = (selection: number) => {
    // setPlayerSelection(selection);
    setPlayerSelection(selection);
    notifySelection(selection);
  };

  return (
    <div className="container" id="main-content">
      <JoinForm
        connected={connected}
        onConnect={connect}
        onDisconnect={disconnect}
      />
      <div className="row">
        <div className="col-md-12">
          {connected && <MessageLog messages={messages} />}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {connected && (
            <RollSelector
              isRolling={isRolling}
              rollNumber={rollDice}
              changeSelection={updateSelection}
              currentSelection={playerSelection}
            />
          )}
        </div>
        <div className="col-md-6">
          {connected && <MessageForm onSend={sendMessage} />}
        </div>
      </div>
    </div>
  );
};

export default App;
