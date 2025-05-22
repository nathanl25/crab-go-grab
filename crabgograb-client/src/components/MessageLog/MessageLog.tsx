import React from 'react';
// import { useWebSocketContext } from '../../context/WebSocketContext';

// Todo - use WebSocketContext instead of prop drilling

interface MessageLogProps {
  messages: string[];
}

const MessageLog: React.FC<MessageLogProps> = ({ messages }) => {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Greetings</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td>{message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MessageLog;
