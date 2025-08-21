import React from 'react';
import styles from './toast.module.scss';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

type ToastProps = {
  show: boolean;
  message: string;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ show, message, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.toast}>
      <FaCheckCircle className={styles.icon} />
      <span>{message}</span>
      <button onClick={onClose} className={styles.closeButton}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;