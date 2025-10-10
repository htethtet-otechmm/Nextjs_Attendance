import { ReactElement, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import styles from "./LeaveHistoryTable.module.scss";
import { LeaveRequest } from "@/types";
import Layout from "../layout";

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
                      <a href="#">Edit</a>
                      <a href="#">
                        <button onClick={() => handleDelete(request.id)}>
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
    </div>
  );
};

LeaveHistoryTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LeaveHistoryTable;
