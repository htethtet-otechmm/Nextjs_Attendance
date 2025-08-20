export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: number;
  datesRequested: string;
  type: string;
  mode: string;
  days: number;
  reason: string;
  submittedOn: string;
  status: LeaveStatus;
}