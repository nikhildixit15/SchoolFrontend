import React from "react";
import styles from "./showStaff.module.css";

const ShowStaff = ({ staffData, onDelete, loading }) => {
  if (!staffData) return null;

  const { firstName, lastName, stream, department, designation,employeeId } = staffData;
console.log("StaffData", staffData)
  return (
    <div className={styles.card}> 

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Stream</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              { firstName || "-"} { lastName || ""}
            </td>

            <td>{ employeeId || "-"}</td>
            <td>{ department || "-"}</td>
            <td>{ designation || "-"}</td>
            <td>{ stream || "-"}</td>
            <td>
              <button
                onClick={onDelete}
                disabled={loading}
                className={styles.deleteBtn}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowStaff;
