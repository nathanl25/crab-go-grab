import React from 'react';
import classes from './RollSelector.module.scss';
import Button from '../Button/Button';

interface RollSelectorProps {
  changeSelection: (selection: number) => void;
  rollNumber: () => void;
  isRolling: boolean;
  currentSelection: number;
}

const RollSelector: React.FC<RollSelectorProps> = ({
  changeSelection,
  rollNumber,
  isRolling,
  currentSelection,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.selection_group}>
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <div
            key={number}
            onClick={() => !isRolling && changeSelection(number)}
            className={`${classes.number_box} ${
              currentSelection === number ? classes.selected : ''
            } ${isRolling ? classes.disabled : ''}`}
          >
            {number}
          </div>
        ))}
      </div>
      <Button onClick={rollNumber} disabled={isRolling}>
        {isRolling ? 'Roll in Progress...' : 'Roll'}
      </Button>
    </div>
  );
};

export default RollSelector;
