import React, { createContext, useContext, ReactNode } from 'react';
import { useConnection } from '../hooks/useConnection';
import { useGameActions } from '../hooks/useGameActions';
import { useModal } from '../hooks/useModal';
import { useGameState } from '../hooks/useGameState';

interface GameContextType {
  // Connection
  connected: boolean;
  connect: (name: string) => void;
  disconnect: () => void;
  
  // Game State
  messages: string[];
  players: string[];
  isRolling: boolean;
  playerSelection: number;
  
  // Game Actions
  sendMessage: (message: string) => void;
  rollDice: () => void;
  setPlayerSelection: (selection: number) => void;
  notifySelection: (selection: number) => void;
  
  // Modal
  modalOpen: boolean;
  modalMessage: string;
  closeModal: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const connection = useConnection();
  const gameState = useGameState();
  const gameActions = useGameActions(connection.service, connection.connected);
  const modal = useModal(gameState.rollOutcome, gameState.playerSelection);

  const value = {
    ...connection,
    ...gameState,
    ...gameActions,
    ...modal,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};