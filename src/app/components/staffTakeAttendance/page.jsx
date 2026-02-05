"use client"

import { useState } from "react";
import styles from "./page.module.css";
import { myStaffAttendance } from "@/app/services/staff/staffService";
import toast from "react-hot-toast";

export default function MyAttendance({ staffId }) {
  const [status, setStatus] = useState("");

 const markAttendance = async () => {
  try {
    const res = await myStaffAttendance({ staffId, status });
    toast.success(res.data.message);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to mark attendance"
    );
  }
};


  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>My Attendance</h4>

      <select
        className={styles.selectBox}
        onChange={(e) => setStatus(e.target.value)}
        value={status}
      >
        <option value="">Select Attendance</option>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
        <option value="leave">Leave</option>
      </select>

      <button
        className={styles.button}
        onClick={markAttendance}
        disabled={!status}
      >
        Mark Attendance
      </button>
    </div>
  );
}
