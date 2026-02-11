"use client";

import { useEffect, useState } from "react";
import styles from "./staaffProfileLeaveApply.module.css";
import toast from "react-hot-toast";
import { applyLeave, getStaffLeaves } from "@/app/services/staff/staffService";

export default function ApplyLeave({ staffId }) {
  const [leaveDate, setLeaveDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);

  console.log("Apply Leaves Staff Id", staffId);
  async function loadLeaves() {
    try {
      const res = await getStaffLeaves(staffId);
      console.log("bufdbeueinvc", res);
      if (res.data.success) {
        setLeaves(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (staffId) loadLeaves();
  }, [staffId]);

  const handleSubmit = async () => {
    if (!leaveDate) {
      toast.error("Please select leave date");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter leave reason");
      return;
    }

    try {
      setLoading(true);
      const res = await applyLeave({ staffId, leaveDate, message });

      if (res.data.success) {
        toast.success("Leave applied successfully");
        setLeaveDate("");
        setMessage("");
        loadLeaves(); // 🔥 refresh list
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Apply Leave</h2>

        {/* FORM */}
        <div className={styles.formGroup}>
          <label>Leave Date</label>
          <input
            type="date"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Reason</label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter reason for leave"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={styles.applybutton}
        >
          {loading ? "Submitting..." : "Apply Leave"}
        </button>
      </div>
      <div>
        {/* LEAVE LIST */}
        <div className={styles.leaveList}>
          {leaves.length === 0 ? (
            <p className={styles.empty}>No leave applications yet</p>
          ) : (
            leaves.map((leave) => (
              <div key={leave._id} className={styles.leaveRow}>
                <div
                  className={`${styles.statusStrip} ${styles[leave.status.toLowerCase()]}`}
                />

                <div className={styles.leaveContent}>
                  <div className={styles.topRow}>
                    <span className={styles.leaveDate}>
                      {new Date(leave.leaveDate).toLocaleDateString()}
                    </span>
                    <span
                      className={`${styles.statusText} ${styles[leave.status.toLowerCase()]}`}
                    >
                      {leave.status}
                    </span>
                  </div>

                  <p className={styles.leaveMessage}>{leave.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
