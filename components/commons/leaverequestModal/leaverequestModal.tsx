import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./leaverequestModal.module.scss";
import { toast } from "react-toastify";

type SelectOption = {
  value: string;
  label: string;
};

type FormData = {
  leaveType: SelectOption;
  mode: SelectOption;
  leaveDates: Date[] | undefined;
  reason: string;
};

type ApiSubmitData = {
  leaveType: string;
  mode: string;
  leaveDates: Date[] | undefined;
  reason: string;
  numberOfDays: number;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApiSubmitData) => void;
};

const leaveTypeOptions: SelectOption[] = [
  { value: "Paid", label: "Paid" },
  { value: "Unpaid", label: "Unpaid" },
  { value: "Sick", label: "Sick Leave" },
];

const modeOptions: SelectOption[] = [
  { value: "Half-day", label: "Half-day" },
  { value: "Full-day", label: "Full-day" },
  { value: "Multi-days", label: "Multi-days" },
];

const LeaveRequestModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      leaveType: leaveTypeOptions[0],
      mode: modeOptions[0],
      leaveDates: [new Date()],
      reason: "",
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: FormData) => {
    const transformedData = {
      leaveType: data.leaveType.value,
      mode: data.mode.value,
      leaveDates: data.leaveDates,
      reason: data.reason,
      numberOfDays: data.leaveDates?.length || 0,
    };
    console.log("Submit Data", transformedData);

    onSubmit(transformedData);
    toast.success("Leave request submitted successfully! 🎉");
    reset();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Apply Leave</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="leaveType">Leave Type</label>
              <Controller
                name="leaveType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={leaveTypeOptions}
                    instanceId="leaveType-select"
                  />
                )}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mode">Mode</label>
              <Controller
                name="mode"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={modeOptions}
                    instanceId="mode-select"
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="leaveDates">Leave Date(s)</label>
            <Controller
              name="leaveDates"
              control={control}
              rules={{ required: true }} // Validation rule
              render={({ field }) => (
                <DayPicker
                  mode="multiple"
                  min={1}
                  selected={field.value}
                  onSelect={field.onChange}
                  className={styles.dayPicker}
                />
              )}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              rows={4}
              {...register("reason", { required: "Reason is required." })}
            ></textarea>
            {errors.reason && (
              <p className={styles.errorMessage}>{errors.reason.message}</p>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
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
