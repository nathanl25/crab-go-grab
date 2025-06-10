import { createClient } from './CoreService';
import { createMessageHandlers } from './ClientPublishers';
import { setupSubscriptions } from './ClientSubscribers';

export const createWebSocketService = (
  onMessageReceived: (message: string) => void,
  onConnectionChange: (connected: boolean) => void,
  onRollOutcome: (outcome: string) => void,
  onRollStatus: (isRolling: boolean) => void,
  onPlayerListUpdate: (playerList: string[]) => void
) => {
  let playerName: string | null = null;
  let messageHandlers: ReturnType<typeof createMessageHandlers>;
  const client = createClient(onConnectionChange);

  client.onConnect = () => {
    onConnectionChange(true);
    setupSubscriptions(client, {
      onMessageReceived,
      onRollStatus,
      onRollOutcome,
      onPlayerListUpdate,
    });
    if (playerName) {
      messageHandlers.announcePresence();
    }
  };

  const handleBeforeUnload = () => {
    if (client.connected) {
      messageHandlers.announceDisconnect();
    }
  };

  return {
    connect: (name: string) => {
      playerName = name;
      // Create message handlers with the updated name
      messageHandlers = createMessageHandlers(playerName, client);
      console.log('Connecting with name:', playerName);
      client.activate();
      window.addEventListener('beforeunload', handleBeforeUnload);
    },

    disconnect: () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      messageHandlers.announceDisconnect();
      client.deactivate();
    },

    sendMessage: (content: string) => messageHandlers.sendChatMessage(content),

    announceDisconnect: () => messageHandlers.announceDisconnect(),

    broadcastSelection: (content: string) =>
      messageHandlers.broadcastSelection(content),

    isConnected: () => client.connected,

    rollDice: () => messageHandlers.rollDice(),
  };
};

export type WebSocketService = ReturnType<typeof createWebSocketService>;
