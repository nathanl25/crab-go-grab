import { Client } from '@stomp/stompjs';

// A factory function to create a WebSocket service
export const createWebSocketService = (
  onMessageReceived: (message: string) => void,
  onConnectionChange: (connected: boolean) => void,
  onRollOutcome: (outcome: string) => void,
  onRollStatus: (isRolling: boolean) => void,
  onPlayerListUpdate: (playerList: string[]) => void
) => {
  // Create a STOMP client

  let initialName: string | null = null;

  const client = new Client({
    brokerURL: 'ws://localhost:8080/crabgograb/websocket',
    onConnect: (frame) => {
      onConnectionChange(true);
      console.log('Connected: ' + frame);

      // General lobby messages
      client.subscribe('/game/lobby', (greeting) => {
        const message = JSON.parse(greeting.body);

        onMessageReceived(message.content);
      });

      if (initialName) {
        // Notify the server of the initial name
        console.log('Joining with name:', initialName);
        client.publish({
          destination: '/app/greet',
          body: JSON.stringify({ name: initialName }),
        });
      }

      // Roll-specific subscriptions
      client.subscribe('/game/roll/status', (message) => {
        const status = JSON.parse(message.body);
        onRollStatus(status.content === 'ROLL_IN_PROGRESS');
      });

      // Roll results
      client.subscribe('/game/roll/outcome', (outcome) => {
        const message = JSON.parse(outcome.body);
        onRollOutcome(message.content);
      });

      client.subscribe('/game/playerlist', (playerList) => {
        const players = JSON.parse(playerList.body);
        console.log('Updated player list:', players);
        onPlayerListUpdate(players);
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

  // Create the handler function outside
  const handleBeforeUnload = () => {
    if (client.connected) {
      client.publish({
        destination: '/app/leave',
        body: JSON.stringify({ name: initialName }),
      });
    }
  };

  return {
    connect: (name: string) => {
      initialName = name;
      client.activate();

      // Add beforeunload event listener using the reference
      window.addEventListener('beforeunload', handleBeforeUnload);
    },
    disconnect: () => {
      // Remove the event listener using the same reference
      window.removeEventListener('beforeunload', handleBeforeUnload);

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
    announceDisconnect: () => {
      console.log('Announcing disconnect');
      client.publish({
        destination: '/app/leave',
        body: JSON.stringify({ name: initialName }),
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
