
import { Sidebar } from 'lucide-react';
import styles from './leaverequestsPage.module.scss'; 
import Header from '@/components/layout/header/header';
import LeaveStats from '@/components/layout/leavestats/leavestats';
import LeaveHistoryTable from '@/components/layout/leavehistoryTable/leavehistoryTable';

const LeaveRequestsPage = () => {
  return (
        <div className={styles.contentArea}>
          <LeaveStats />
          <LeaveHistoryTable />
        </div>
  );
};

export default LeaveRequestsPage;

export async function getServerSideProps() {
    return {
      props: {},
    };
  }