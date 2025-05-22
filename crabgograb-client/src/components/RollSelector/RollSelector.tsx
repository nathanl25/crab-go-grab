import React from 'react';
import classes from './RollSelector.module.scss';
import Button from '../Button/Button';
// import { useWebSocketContext } from '../../context/WebSocketContext';

// Todo - use WebSocketContext instead of prop drilling

interface RollSelectorProps {
  //   messages: string[];
  //   selection: number;
  changeSelection: (selection: number) => void;
  rollNumber: () => void;
}

const RollSelector: React.FC<RollSelectorProps> = ({
  //   selection,
  changeSelection,
  rollNumber,
}) => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.selection_group}>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <Button key={number} onClick={() => changeSelection(number)}>
              {number}
            </Button>
          ))}
        </div>
        <Button onClick={rollNumber}>Roll</Button>
      </div>
    </>
  );
};

export default RollSelector;
