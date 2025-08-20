import type { NextApiRequest, NextApiResponse } from 'next';
import type { LeaveRequest } from '@/types'; // tsconfig.json

const leaveData: LeaveRequest[] = [
  { id: 1, datesRequested: 'April 25', type: 'Unpaid Leave', mode: 'Full Day', days: 1, reason: 'Emergency', submittedOn: 'Apr 25', status: 'Pending' },
  { id: 2, datesRequested: 'Mar 25', type: 'Paid Leave', mode: 'Half-day', days: 0.5, reason: 'Family Issues', submittedOn: 'Apr 23', status: 'Approved' },
  { id: 3, datesRequested: 'Feb 28, Mar 1, 2', type: 'Maternity', mode: 'Multi-days', days: 3, reason: 'Casual', submittedOn: 'Apr 23', status: 'Rejected' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeaveRequest[]>
) {
  res.status(200).json(leaveData);
}