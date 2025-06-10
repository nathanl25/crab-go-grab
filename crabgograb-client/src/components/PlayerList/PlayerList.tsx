import React from 'react';
import { useEffect } from 'react';
import classes from './PlayerList.module.scss';

// interface Player {
//   id: string;
//   name: string;
//   isActive?: boolean;
// }

interface PlayerListProps {
  players: string[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  useEffect(() => {
    // This effect could be used to handle any side effects related to player list updates
    // For example, logging the players or fetching additional data
    console.log('Player list updated:', players);
  }, [players]);

  return (
    <div className={classes.playerList}>
      <h2 className={classes.title}>Players</h2>
      <ul className={classes.list}>
        {players.map((player, id) => (
          <li
            key={id}
            // className={`${classes.player} ${player.isActive ? classes.active : ''}`}
          >
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PlayerList;
