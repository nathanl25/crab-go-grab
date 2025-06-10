import React from 'react';
import { useWebSocketContext } from '../../context/WebSocketContext';
import classes from './MessageLog.module.scss';

const MessageLog: React.FC = () => {
  const { messages } = useWebSocketContext();

  return (
    <div className={classes.messageLog}>
      {messages.map((message, index) => (
        <div key={index} className={classes.message}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessageLog;
