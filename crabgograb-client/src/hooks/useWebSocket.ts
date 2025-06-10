import { useState, useEffect } from 'react';
import type { WebSocketService } from '../services/WebSocketService';
import { createWebSocketService } from '../services/WebSocketService';

interface UseWebSocketReturn {
  connected: boolean;
  messages: string[];
  isRolling: boolean;
  playerSelection: number;
  players: string[];
  connect: (name: string) => void;
  disconnect: () => void;
  sendMessage: (name: string) => void;
  rollDice: () => void;
  setPlayerSelection: (selection: number) => void;
  notifySelection: (selection: number) => void;
  modalOpen: boolean;
  modalMessage: string;
  closeModal: () => void;
}

export const useWebSocket = (): UseWebSocketReturn => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [service, setService] = useState<WebSocketService | null>(null);
  const [playerSelection, setPlayerSelection] = useState<number>(0);
  const [rollOutcome, setRollOutcome] = useState<string>('');
  const [isRolling, setIsRolling] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
        setPlayerSelection(0);
        setIsRolling(false);
        setPlayers([]);
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

    const handlePlayersUpdated = (players: string[]) => {
      setPlayers(players);
      console.log('Updated players:', players);
    };

    const wsService = createWebSocketService(
      handleMessageReceived,
      handleConnectionChange,
      handleRollOutcome,
      handleRollStatus,
      handlePlayersUpdated
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

    let message = '';
    if (playerSelection.toString() === rollOutcome) {
      message = 'You guessed correctly!';
    } else if (playerSelection === 0) {
      message = 'You did not select a number';
    } else {
      message = `You selected ${playerSelection} but the outcome was ${rollOutcome}`;
    }

    setModalMessage(message);
    setModalOpen(true);
    setPlayerSelection(0);
  }, [rollOutcome]);

  const connect = (name: string) => {
    if (service) {
      service.connect(name);
    }
  };

  const disconnect = () => {
    if (service) {
      service.announceDisconnect();
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
    players,
    connect,
    disconnect,
    sendMessage,
    rollDice,
    setPlayerSelection,
    notifySelection,
    modalOpen,
    modalMessage,
    closeModal: () => setModalOpen(false),
  };
};
