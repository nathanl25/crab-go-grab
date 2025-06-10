export type MessageType = 'ANNOUNCEMENT' | 'CHAT' | 'RESULT';
export interface IncomingMessage {
  messageType: MessageType;
  content: string;
}
