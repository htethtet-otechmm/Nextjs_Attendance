import { useState } from 'react';
import styles from './leavestats.module.scss';
import LeaveRequestModal from '@/components/commons/leaverequestModal/leaverequestModal';

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className={styles.statCard}>
    <div className={styles.value}>{value}</div>
    <div className={styles.label}>{label}</div>
  </div>
);

const LeaveStats = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = (formData: any) => {
    console.log("Leave request submitted:", formData);
    closeModal();
  };
  return (
    <div className={styles.statsContainer}>
      <div className={styles.stats}>
        <StatCard value="20" label="Leave(s) allowed" />
        <StatCard value="16.5" label="Available Leavees" />
        <StatCard value="16.5" label="Leaves Taken" />
      </div>
      <div className={styles.actions}>
        <span>Renew at May, 25</span>
        <button className={styles.requestButton} onClick={openModal}>Request Leave</button>
      </div>

      <LeaveRequestModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleSubmit} 
      />
    </div>

    
  );
};

export default LeaveStats;