import { useState, useEffect } from 'react';
import {
  createWebSocketService,
  type WebSocketService,
} from '../services/WebSocketService';
import { set } from 'zod/v4';
import { pl } from 'zod/v4/locales';

interface UseWebSocketReturn {
  connected: boolean;
  messages: string[];
  isRolling: boolean;
  playerSelection: number;
  connect: (name: string) => void;
  disconnect: () => void;
  sendMessage: (name: string) => void;
  rollDice: () => void;
  setPlayerSelection: (selection: number) => void;
  notifySelection: (selection: number) => void;
}

export const useWebSocket = (): UseWebSocketReturn => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [service, setService] = useState<WebSocketService | null>(null);
  const [playerSelection, setPlayerSelection] = useState<number>(0);
  const [rollOutcome, setRollOutcome] = useState<string>('');
  const [isRolling, setIsRolling] = useState(false);

  // Initialize service only once
  useEffect(() => {
    const handleMessageReceived = (message: string) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleConnectionChange = (isConnected: boolean) => {
      setConnected(isConnected);
      if (!isConnected) {
        setMessages([]);
        setIsRolling(false);
      }
    };

    const handleRollOutcome = (outcome: string) => {
      setRollOutcome(outcome);
      console.log('Received outcome: ' + outcome);

      // setPlayerSelection(0);
      // setMessages((prevMessages) => [...prevMessages, outcome]);
    };

    const handleRollStatus = (rolling: boolean) => {
      setIsRolling(rolling);
    };

    const wsService = createWebSocketService(
      handleMessageReceived,
      handleConnectionChange,
      handleRollOutcome,
      handleRollStatus
    );
    setService(wsService);

    // Cleanup on unmount
    return () => {
      if (wsService && wsService.isConnected()) {
        wsService.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!rollOutcome) return;
    console.log(playerSelection);
    console.log(rollOutcome);
    if (playerSelection.toString() === rollOutcome) {
      // console.log('You guessed correctly!');
      alert('You guessed correctly!');
    } else if (playerSelection === 0) {
      alert('You did not select a number');
      // console.log('You guessed incorrectly.');
    } else {
      alert(
        'You selected ' +
          playerSelection +
          ' but the outcome was ' +
          rollOutcome
      );
    }
    setPlayerSelection(0);
  }, [rollOutcome]);

  const connect = (name: string) => {
    if (service) {
      service.connect(name);
    }
  };

  const disconnect = () => {
    if (service) {
      service.disconnect();
      console.log('Disconnected');
    }
  };

  const sendMessage = (chatMessage: string) => {
    if (service && connected) {
      service.sendMessage(chatMessage);
    }
  };

  const notifySelection = (selection: number) => {
    if (service && connected) {
      service.broadcastSelection(selection.toString());
    }
  };

  const rollDice = () => {
    if (service && connected) {
      service.rollDice();
    }
  };

  return {
    connected,
    messages,
    isRolling,
    playerSelection,
    connect,
    disconnect,
    sendMessage,
    rollDice,
    setPlayerSelection,
    notifySelection,
  };
};
