import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './leaverequestModal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const LeaveRequestModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Apply Leave</h3>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className={styles.formGroup}>
            <label htmlFor="leaveType">Leave Type</label>
            <select id="leaveType" name="leaveType">
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Sick">Sick Leave</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="leaveDates">Leave Date(s)</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Choose Date(s)"
              className={styles.datePicker}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              defaultValue="Family Issues"
            ></textarea>
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestModal;