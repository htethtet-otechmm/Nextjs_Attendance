import { useState, ReactElement, useEffect } from "react";
import { useSWRConfig } from "swr";
import styles from "./leaverequestsPage.module.scss";
import LeaveStats from "@/components/layout/leavestats/leavestats";
import LeaveHistoryTable from "@/components/layout/leavehistoryTable/leavehistoryTable";
import LeaveRequestModal from "@/components/commons/leaverequestModal/leaverequestModal";
import Layout from "@/components/layout/layout";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";

const LeaveRequestsPage: NextPageWithLayout = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleApiSubmit = async (formData: any) => {
    const token = localStorage.getItem("accessToken");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      console.error("User not authenticated. Redirecting to login.");
      router.push("/signin");
      return;
    }

    const user = JSON.parse(userString);
    const userId = user.id;

    try {
      await fetch("http://localhost:3000/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      mutate(`http://localhost:3000/leave/user/${userId}`);

      closeModal();
    } catch (error) {
      console.error("Failed to submit leave request", error);
    }
  };

  return (
    <div className={styles.contentArea}>
      <LeaveStats onRequestLeave={openModal} />

      <LeaveHistoryTable role="user" />

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
