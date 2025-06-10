import React from 'react';
import MessageForm from '../Forms/MessageForm';
import MessageLog from '../MessageLog/MessageLog';
import RollSelector from '../RollSelector/RollSelector';
import PlayerList from '../PlayerList/PlayerList';
import Button from '../Button/Button';
import { useWebSocketContext } from '../../context/WebSocketContext';
import classes from './GameSection.module.scss';

const GameSection: React.FC = () => {
  const { disconnect } = useWebSocketContext();

  return (
    <section className={classes.gameSection}>
      <div className={classes.header}>
        <h1 className={classes.title}>Crab Go Grab</h1>
        <div className={classes.exitButtonWrapper}>
          <Button onClick={disconnect} variant="delete">
            Leave Game
          </Button>
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.sidebar}>
          <PlayerList />
        </div>

        <div className={classes.mainContent}>
          <RollSelector />
        </div>

        <div className={classes.chatContent}>
          <div className={classes.messageArea}>
            <MessageLog />
            <MessageForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
