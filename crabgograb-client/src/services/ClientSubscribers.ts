import { Client } from '@stomp/stompjs';
import { subscribe } from './CoreService.ts';

export const setupSubscriptions = (
  client: Client,
  callbacks: {
    onMessageReceived: (message: string) => void;
    onRollStatus: (isRolling: boolean) => void;
    onRollOutcome: (outcome: string) => void;
    onPlayerListUpdate: (players: string[]) => void;
  }
) => {
  subscribe(client, '/game/lobby', (data) =>
    callbacks.onMessageReceived(data.content)
  );

  subscribe(client, '/game/roll/status', (data) =>
    callbacks.onRollStatus(data.content === 'ROLL_IN_PROGRESS')
  );

  subscribe(client, '/game/roll/outcome', (data) =>
    callbacks.onRollOutcome(data.content)
  );

  subscribe(client, '/game/playerlist', (data) =>
    callbacks.onPlayerListUpdate(data)
  );
};
