import { Client } from '@stomp/stompjs';

export type MessageCallback = (message: any) => void;

export const createClient = (onConnectionChange: (status: boolean) => void) => {
  return new Client({
    brokerURL:
      'ws://crab-go-grab-environment.eba-mxet7rx6.ap-southeast-2.elasticbeanstalk.com/crabgograb/websocket',
    onConnect: () => onConnectionChange(true),
    onDisconnect: () => onConnectionChange(false),
    onWebSocketError: (error) => console.error('WebSocket error:', error),
    onStompError: (frame) =>
      console.error('Broker error:', frame.headers['message']),
  });
};

export const publish = (client: Client, destination: string, data: any) => {
  client.publish({
    destination,
    body: JSON.stringify(data),
  });
};

export const subscribe = (
  client: Client,
  topic: string,
  callback: MessageCallback
) => {
  client.subscribe(topic, (message) => {
    callback(JSON.parse(message.body));
  });
};
