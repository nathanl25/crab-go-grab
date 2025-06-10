import React from 'react';
import styles from './Modal.module.scss';
import { useWebSocketContext } from '../../context/WebSocketContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error';
}

export const Modal: React.FC = () => {
  const { modalOpen, closeModal, modalMessage } = useWebSocketContext();
  if (!modalOpen) return null;
  const type = modalMessage.includes('correctly') ? 'success' : 'error';
  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${styles[type]}`}>
        <div className={styles.modalContent}>
          <p>{modalMessage}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};
