"use client";

import { useState } from "react";
import StudentSearch from "@/app/components/studentSearch/studentSearch"; 
import styles from "./page.module.css";
import toast from "react-hot-toast";
import { studentDelete } from "@/app/services/admin/adminService";

export default function DeleteStudent() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStudentSelect = (student) => {
    setStudentData(student);
  };

  const handleDelete = async () => {
    if (!studentData?._id) return;
     console.log(studentData._id)
    try {
      setLoading(true); 
      const response = await studentDelete(studentData._id);
       if (response?.data?.success) {
      toast.success("Student deleted successfully");
      setStudentData(null);
    } else {
      toast.error("Delete failed");
    }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Delete Student</h2>

      <StudentSearch onSelect={handleStudentSelect} />

      {studentData && (
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
                    onClick={handleDelete}
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
      )}
    </div>
  );
}
