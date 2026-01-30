import React from "react";
import styles from "./page.module.css";

const ShowStudent = ({ studentData, onDelete, loading }) => {
  if (!studentData) return null;

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Father</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              {studentData.firstName} {studentData.lastName}
            </td>
            <td>{studentData.className}</td>
            <td>{studentData.section}</td>
            <td>{studentData.fatherName}</td>
            <td>{studentData.userName}</td>
            <td>
              <button
                onClick={onDelete}
                className={styles.deleteBtn}
                disabled={loading}
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

export default ShowStudent;
