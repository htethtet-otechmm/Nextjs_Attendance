import styles from "./leavestats.module.scss";

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className={styles.statCard}>
    <div className={styles.value}>{value}</div>
    <div className={styles.label}>{label}</div>
  </div>
);

const LeaveStats = ({ onRequestLeave }: { onRequestLeave: () => void }) => {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.stats}>
        <StatCard value="20" label="Leave(s) allowed" />
        <StatCard value="16.5" label="Available Leaves" />
        <StatCard value="16.5" label="Leaves Taken" />
      </div>
      <div className={styles.actions}>
        <span>Renew at May, 25</span>
        <button className={styles.requestButton} onClick={onRequestLeave}>
          Request Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveStats;
