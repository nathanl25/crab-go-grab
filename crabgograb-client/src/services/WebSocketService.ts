import { Client } from '@stomp/stompjs';

// A factory function to create a WebSocket service
export const createWebSocketService = (
  onMessageReceived: (message: string) => void,
  onConnectionChange: (connected: boolean) => void,
  onRollOutcome: (outcome: string) => void
) => {
  // Create a STOMP client

  let initialName: string | null = null;

  const client = new Client({
    brokerURL: 'ws://localhost:8080/crabgograb/websocket',
    onConnect: (frame) => {
      onConnectionChange(true);
      console.log('Connected: ' + frame);
      client.subscribe('/game/lobby', (greeting) => {
        const message = JSON.parse(greeting.body).content;
        console.log('Received message: ' + message);
        onMessageReceived(message);
      });
      // This only publishes when the client is connected
      if (initialName) {
        client.publish({
          destination: '/app/greet',
          body: JSON.stringify({ name: initialName }),
        });
      }
      client.subscribe('/game/outcome', (outcome) => {
        const message = JSON.parse(outcome.body).content;
        // console.log('Received outcome: ' + message);
        onRollOutcome(message);
      });
    },
    onWebSocketError: (error) => {
      console.error('Error with websocket', error);
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
    onDisconnect: () => {
      onConnectionChange(false);
    },
  });

  return {
    connect: (name: string) => {
      initialName = name;
      client.activate();
    },
    disconnect: () => {
      client.deactivate();
      onConnectionChange(false);
    },
    sendMessage: (content: string) => {
      // console.log(content);
      client.publish({
        destination: '/app/chat',
        body: JSON.stringify({
          name: initialName,
          content: content,
        }),
      });
    },
    broadcastSelection: (content: string) => {
      console.log(content);
      client.publish({
        destination: '/app/select',
        body: JSON.stringify({
          name: initialName,
          content: content,
        }),
      });
    },
    isConnected: () => {
      return client.connected;
    },
    rollDice: () => {
      console.log('Rolling dice');
      client.publish({
        destination: '/app/roll',
        body: JSON.stringify({ name: initialName }),
      });
    },
  };
};

export type WebSocketService = ReturnType<typeof createWebSocketService>;
