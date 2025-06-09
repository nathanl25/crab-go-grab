import React from 'react';
import classes from './MessageLog.module.scss';

interface MessageLogProps {
  messages: string[];
}

const MessageLog: React.FC<MessageLogProps> = ({ messages }) => {
  return (
    <div className={classes.messageLog}>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default MessageLog;
