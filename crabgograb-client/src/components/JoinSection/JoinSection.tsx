import React from 'react';
import JoinForm from '../Forms/JoinForm';
import classes from './JoinSection.module.scss';

interface JoinSectionProps {
  connected?: boolean;
  onConnect: (name: string) => void;
  onDisconnect?: () => void;
}

const JoinSection: React.FC<JoinSectionProps> = ({
  connected,
  onConnect,
  onDisconnect,
}) => {
  return (
    <section className={classes.joinSection}>
      <div className={classes.formWrapper}>
        <h1 className={classes.title}>Join Game</h1>
        <JoinForm
          connected={connected}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
        />
      </div>
    </section>
  );
};

export default JoinSection;
