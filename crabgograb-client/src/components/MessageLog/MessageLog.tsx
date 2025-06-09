import React, { useRef, useEffect } from 'react';
import classes from './MessageLog.module.scss';

interface MessageLogProps {
  messages: string[];
}

const MessageLog: React.FC<MessageLogProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={classes.chatContainer}>
      <div className={classes.messageList}>
        {messages.map((message, index) => (
          <div key={index} className={classes.messageItem}>
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageLog;
