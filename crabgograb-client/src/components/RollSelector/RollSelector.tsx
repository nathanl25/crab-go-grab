import React from 'react';
import classes from './RollSelector.module.scss';
import Button from '../Button/Button';
import { useWebSocketContext } from '../../context/WebSocketContext';

interface RollSelectorProps {
  changeSelection: (selection: number) => void;
  rollNumber: () => void;
  isRolling: boolean;
  currentSelection: number;
}

const RollSelector: React.FC = () => {
  // const {}
  const wbContext = useWebSocketContext();
  const {
    setPlayerSelection,
    notifySelection,
    rollDice,
    isRolling,
    playerSelection,
  } = wbContext;
  const updateSelection = (selection: number) => {
    if (!isRolling) {
      setPlayerSelection(selection);
      notifySelection(selection);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.selection_group}>
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <div
            key={number}
            onClick={() => !isRolling && updateSelection(number)}
            className={`${classes.number_box} ${
              playerSelection === number ? classes.selected : ''
            } ${isRolling ? classes.disabled : ''}`}
          >
            {number}
          </div>
        ))}
      </div>
      <Button onClick={rollDice} disabled={isRolling}>
        {isRolling ? 'Roll in Progress...' : 'Roll'}
      </Button>
    </div>
  );
};

export default RollSelector;
