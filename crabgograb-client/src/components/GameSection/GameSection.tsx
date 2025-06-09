import React from 'react';
import MessageForm from '../Forms/MessageForm';
import MessageLog from '../MessageLog/MessageLog';
import RollSelector from '../RollSelector/RollSelector';
import PlayerList from '../PlayerList/PlayerList';
import Button from '../Button/Button';
import classes from './GameSection.module.scss';

interface GameSectionProps {
  onDisconnect: () => void;
  isRolling: boolean;
  rollDice: () => void;
  messages: string[];
  playerSelection: number;
  setPlayerSelection: (selection: number) => void;
  notifySelection: (selection: number) => void;
  sendMessage: (message: string) => void;
  players: string[];
}

const GameSection: React.FC<GameSectionProps> = ({
  onDisconnect,
  isRolling,
  rollDice,
  messages,
  playerSelection,
  setPlayerSelection,
  notifySelection,
  sendMessage,
  players,
}) => {
  const updateSelection = (selection: number) => {
    setPlayerSelection(selection);
    notifySelection(selection);
  };

  return (
    <section className={classes.gameSection}>
      <div className={classes.header}>
        <h1 className={classes.title}>Crab Go Grab</h1>
        <div className={classes.exitButtonWrapper}>
          <Button onClick={onDisconnect} variant="delete">
            Leave Game
          </Button>
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.sidebar}>
          <PlayerList players={players} />
        </div>

        <div className={classes.mainContent}>
          <RollSelector
            isRolling={isRolling}
            rollNumber={rollDice}
            changeSelection={updateSelection}
            currentSelection={playerSelection}
          />
        </div>

        <div className={classes.chatContent}>
          <div className={classes.messageArea}>
            <MessageLog messages={messages} />
            <MessageForm onSend={sendMessage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
