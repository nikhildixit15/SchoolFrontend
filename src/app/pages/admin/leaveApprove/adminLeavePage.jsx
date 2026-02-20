"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import toast from "react-hot-toast";
import { updateLeaveStatus } from "@/app/services/staff/staffService";

export default function AdminLeavePage({ leavesData }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(leavesData || []);
  }, [leavesData]);
  console.log("enkfvskefi532",leavesData)

  const handleAction = async (leaveId, status) => {
    try {
      await updateLeaveStatus(leaveId, status);
      setLeaves((prev) =>
        prev.map((leave) =>
          leave._id === leaveId ? { ...leave, status } : leave,
        ),
      );

      toast.success(`Leave ${status}`);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Leave Requests</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>EmpID</th>
              <th>Name</th>
              <th>Apply Date</th>
              <th>Leave Date</th>
              <th>Reason</th>
               <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave, index) => (
              <tr key={leave._id}>
                <td>{index + 1}</td>
                <td>{leave.staffId.adminInfo.employeeId}</td>
                <td>
                  {leave.staffId.basicInfo.firstName}{" "}
                  {leave.staffId.basicInfo.lastName}
                </td>
                <td>{new Date(leave.createdAt).toLocaleDateString()}</td>
                <td>{new Date(leave.leaveDate).toLocaleDateString()}</td>
                <td>{leave.message}</td>
 
                <td>
                  <span className={`${styles.status} ${styles[leave.status]}`}>
                    {leave.status}
                  </span>
                </td>

                <td className={styles.actions}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleAction(leave._id, "Approved")}
                    disabled={leave.status === "Approved"}
                  >
                    Approve
                  </button>

                  <button
                    className={styles.rejectBtn}
                    onClick={() => handleAction(leave._id, "Rejected")}
                    disabled={leave.status === "Rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
