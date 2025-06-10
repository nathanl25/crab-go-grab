import React from 'react';
import JoinForm from '../Forms/JoinForm';
import classes from './JoinSection.module.scss';
import { useWebSocketContext } from '../../context/WebSocketContext';

const JoinSection: React.FC = () => {
  const { connect } = useWebSocketContext();

  return (
    <section className={classes.joinSection}>
      <div className={classes.formWrapper}>
        <h1 className={classes.title}>Join Game</h1>
        <JoinForm />
      </div>
    </section>
  );
};

export default JoinSection;
