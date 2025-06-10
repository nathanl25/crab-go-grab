import React from 'react';
import { useWebSocketContext } from '../../context/WebSocketContext';
import classes from './PlayerList.module.scss';

const PlayerList: React.FC = () => {
  const { players } = useWebSocketContext();

  return (
    <div className={classes.playerList}>
      <h2>Players</h2>
      <ul className={classes.list}>
        {players.map((player, index) => (
          <li key={index} className={classes.player}>
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
