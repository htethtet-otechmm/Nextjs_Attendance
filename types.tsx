export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface LeaveRequest {
  id: number;
  dates: string[];
  leaveType: string;
  mode: "Half-day" | "Full Day" | "Multi-days";
  numberOfDays: number;
  reason: string;
  submittedOn: string;
  status: LeaveStatus;
  user?: User;
}
