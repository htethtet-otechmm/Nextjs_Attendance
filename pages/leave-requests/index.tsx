
import styles from './leaverequestsPage.module.scss'; 
import LeaveStats from '@/components/layout/leavestats/leavestats';
import LeaveHistoryTable from '@/components/layout/leavehistoryTable/leavehistoryTable';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '@/components/layout/layout';

const LeaveRequestsPage: NextPageWithLayout = () => {
  return (
        <div className={styles.contentArea}>
          <LeaveStats />
          <LeaveHistoryTable />
        </div>
  );
};

LeaveRequestsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default LeaveRequestsPage;

export async function getServerSideProps() {
    return {
      props: {},
    };
  }