export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface LeaveRequest {
  id: number;
  dates: string[];
  leaveType: string;
  mode: "Half-day" | "Full Day" | "Multi-days";
  numberOfDays: number;
  reason: string;
  submittedOn: string;
  status: LeaveStatus;
}
