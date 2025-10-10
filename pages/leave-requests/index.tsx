import { useState, ReactElement } from "react";
import { useSWRConfig } from "swr";
import styles from "./leaverequestsPage.module.scss";
import LeaveStats from "@/components/layout/leavestats/leavestats";
import LeaveHistoryTable from "@/components/layout/leavehistoryTable/leavehistoryTable";
import LeaveRequestModal from "@/components/commons/leaverequestModal/leaverequestModal"; // Modal ကို ဒီမှာ import လုပ်ပါ
import Layout from "@/components/layout/layout";
import { NextPageWithLayout } from "../_app";

const LeaveRequestsPage: NextPageWithLayout = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleApiSubmit = async (formData: any) => {
    try {
      await fetch("http://localhost:3000/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      mutate("http://localhost:3000/leave");
    } catch (error) {
      console.error("Failed to submit leave request", error);
    }
  };

  return (
    <div className={styles.contentArea}>
      <LeaveStats onRequestLeave={openModal} />
      <LeaveHistoryTable />

      <LeaveRequestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleApiSubmit}
      />
    </div>
  );
};

LeaveRequestsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LeaveRequestsPage;
