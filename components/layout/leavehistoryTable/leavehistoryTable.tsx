import { ReactElement, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import styles from "./LeaveHistoryTable.module.scss";
import { LeaveRequest } from "@/types";
import Layout from "../layout";
import LeaveRequestModal from "@/components/commons/leaverequestModal/leaverequestModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const StatusBadge = ({ status }: { status: LeaveRequest["status"] }) => {
  const statusClass = styles[status.toLowerCase()];
  return (
    <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>
  );
};

const LeaveHistoryTable = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { mutate } = useSWRConfig();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [requestToEdit, setRequestToEdit] = useState<LeaveRequest | null>(null);
  const apiEndpoint = "http://localhost:3000/leave";
  const {
    data: leaveData,
    error,
    isLoading,
  } = useSWR<LeaveRequest[]>(apiEndpoint, fetcher);

  console.log("API Data:", leaveData);

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleEdit = (request: LeaveRequest) => {
    setRequestToEdit(request);
    setEditModalOpen(true);
    setActiveMenu(null);
  };

  const handleUpdateSubmit = async (formData: any) => {
    if (!requestToEdit) return;

    try {
      await fetch(`${apiEndpoint}/${requestToEdit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      mutate(apiEndpoint);
      setEditModalOpen(false);
      setRequestToEdit(null);
    } catch (err) {
      console.error("Failed to update the request:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${apiEndpoint}/${id}`, {
        method: "DELETE",
      });
      mutate(apiEndpoint);
    } catch (err) {
      console.error("Failed to delete the request:", err);
    }
    setActiveMenu(null);
  };

  if (error) return <div>Failed to load leave requests.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyHeader}>
        <h2>Leave Request History</h2>
        <div className={styles.yearNav}>
          <span>&lt;</span>
          <strong>2025</strong>
          <span>&gt;</span>
        </div>
      </div>
      <table className={styles.historyTable}>
        <thead>
          <tr>
            <th>Dates Requested</th>
            <th>Type</th>
            <th>Mode</th>
            <th>No. of days</th>
            <th>Reason</th>
            <th>Submitted On</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leaveData &&
            leaveData.map((request) => (
              <tr key={request.id}>
                <td>
                  {Array.isArray(request.dates) ? request.dates.join(", ") : ""}
                </td>
                <td>{request.leaveType}</td>
                <td>{request.mode}</td>
                <td>{request.numberOfDays}</td>
                <td>{request.reason}</td>
                <td>{request.submittedOn}</td>
                <td>
                  <StatusBadge status={request.status} />
                </td>
                <td className={styles.actionCell}>
                  <button
                    onClick={() => toggleMenu(request.id)}
                    className={styles.menuButton}
                  >
                    ⋮
                  </button>
                  {activeMenu === request.id && (
                    <div className={styles.dropdownMenu}>
                      <a href="#">
                        <button onClick={() => handleEdit(request)} className={styles.actionButton}>
                          Edit
                        </button>
                      </a>

                      <a href="#">
                        <button onClick={() => handleDelete(request.id)} className={styles.actionButton}>
                          Delete
                        </button>
                      </a>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <LeaveRequestModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleUpdateSubmit}
          initialData={requestToEdit}
        />
      )}
    </div>
  );
};

LeaveHistoryTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LeaveHistoryTable;
