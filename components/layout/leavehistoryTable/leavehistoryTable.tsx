import { ReactElement, useState, useEffect } from "react"; 
import useSWR, { useSWRConfig } from "swr";
import styles from "./LeaveHistoryTable.module.scss";
import { LeaveRequest } from "@/types"; 
import Layout from "../layout";
import LeaveRequestModal from "@/components/commons/leaverequestModal/leaverequestModal";

const fetcher = async (url: string) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("User is not authenticated.");
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      console.error("Authentication failed. Redirecting to login...");
    }
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch data");
  }

  return res.json();
};

const StatusBadge = ({ status }: { status: LeaveRequest["status"] }) => {
  const statusClass = styles[status?.toLowerCase() || 'pending'];
  return (
    <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>
  );
};

const LeaveHistoryTable = ({ role }: { role: 'admin' | 'user' }) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { mutate } = useSWRConfig();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [requestToEdit, setRequestToEdit] = useState<LeaveRequest | null>(null);
  
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (role === 'user') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
      }
    }
  }, [role]);

  const apiEndpoint = role === 'admin'
    ? 'http://localhost:3000/leave/admin'
    : (userId ? `http://localhost:3000/leave/user/${userId}` : null);

  const {
    data: leaveData,
    error,
    isLoading,
  } = useSWR<LeaveRequest[]>(
    apiEndpoint,
    fetcher,
    { revalidateOnFocus: true }
  );

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
    if (!requestToEdit || !apiEndpoint) return;
    const token = localStorage.getItem("accessToken");

    try {
      await fetch(`http://localhost:3000/leave/${requestToEdit.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
    if (!apiEndpoint) return;
    const token = localStorage.getItem("accessToken");

    try {
      await fetch(`http://localhost:3000/leave/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      mutate(apiEndpoint);
    } catch (err) {
      console.error("Failed to delete the request:", err);
    }
    setActiveMenu(null);
  };

  // NEW: Admin actions (Approve / Reject)
  const handleAdminAction = async (id: number, action: 'approve' | 'reject') => {
    if (!apiEndpoint) return;
    const token = localStorage.getItem("accessToken");
    
    try {
      await fetch(`http://localhost:3000/leave/${id}/${action}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      mutate(apiEndpoint);
    } catch (err) {
      console.error(`Failed to ${action} the request:`, err);
    }
    setActiveMenu(null);
  };

  if (role === 'user' && !userId) return <div>Loading user data...</div>;
  if (error) return <div>Failed to load leave requests. Error: {error.message}</div>;
  if (isLoading || !apiEndpoint) return <div>Loading...</div>;

  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyHeader}>
        <h2>{role === 'admin' ? 'All Leave Requests (Admin)' : 'My Leave Request History'}</h2>
        <div className={styles.yearNav}>
          <span>&lt;</span>
          <strong>2025</strong>
          <span>&gt;</span>
        </div>
      </div>
      <table className={styles.historyTable}>
        <thead>
          <tr>
            {role === 'admin' && <th>Employee</th>}
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
          {leaveData && leaveData.length > 0 ? (
            leaveData.map((request) => (
              <tr key={request.id}>
                {role === 'admin' && <td>{request.user?.name || 'Unknown User'}</td>}
                <td>
                  {Array.isArray(request.dates) ? request.dates.join(", ") : ""}
                </td>
                <td>{request.leaveType}</td>
                <td>{request.mode}</td>
                <td>{request.numberOfDays}</td>
                <td>{request.reason}</td>
                <td>{new Date(request.submittedOn).toLocaleDateString()}</td>
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
                      
                      {role === 'admin' ? (
                        <>
                          {request.status === 'Pending' ? (
                            <>
                              <button onClick={() => handleAdminAction(request.id, 'approve')} className={styles.actionButton}>
                                Approve
                              </button>
                              <button onClick={() => handleAdminAction(request.id, 'reject')} className={`${styles.actionButton} ${styles.rejectButton}`}>
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className={styles.noAction}>No actions</span>
                          )}
                        </>
                      ) : (
                        <>
                          {request.status === 'Pending' ? (
                            <>
                              <button onClick={() => handleEdit(request)} className={styles.actionButton}>
                                Edit
                              </button>
                              <button onClick={() => handleDelete(request.id)} className={`${styles.actionButton} ${styles.rejectButton}`}>
                                Delete
                              </button>
                            </>
                           ) : (
                            <span className={styles.noAction}>No actions</span>
                           )}
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={role === 'admin' ? 9 : 8}>No leave requests found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {role === 'user' && isEditModalOpen && (
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