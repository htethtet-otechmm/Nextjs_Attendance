import LeaveHistoryTable from "@/components/layout/leavehistoryTable/leavehistoryTable";
import Layout from "@/components/layout/layout";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminLeaveRequestsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (!userString) {
      console.log("No user found. Redirecting to signin...");
      router.push("/signin");
      return;
    }

    const user = JSON.parse(userString);

    if (user.role !== "admin") {
      console.log("Access denied. User is not an admin. Redirecting...");
      router.push("/leave-requests");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Checking permissions...</div>;
  }

  return <LeaveHistoryTable role="admin" />;
}

AdminLeaveRequestsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
