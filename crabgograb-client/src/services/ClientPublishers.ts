import { Client } from '@stomp/stompjs';
import { publish } from './CoreService.ts';

export const createMessageHandlers = (playerName: string, client: Client) => ({
  sendChatMessage: (content: string) =>
    publish(client, '/app/chat', { name: playerName, content }),

  announcePresence: () => publish(client, '/app/greet', { name: playerName }),

  announceDisconnect: () => publish(client, '/app/leave', { name: playerName }),

  broadcastSelection: (selection: string) =>
    publish(client, '/app/select', { name: playerName, content: selection }),

  rollDice: () => publish(client, '/app/roll', { name: playerName }),
});
