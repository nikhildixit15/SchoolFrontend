 "use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getDefaulterStudents } from "@/app/services/student/studentService";

export default function DefaulterPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDefaulters();
  }, []);

  const fetchDefaulters = async () => {
    try {
      const res = await getDefaulterStudents();
      setStudents(res.data?.data || []);
    } catch (error) {
      console.error(error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Defaulter Students</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Father Name</th>
            <th>Mobile</th>
            <th>Username</th>
            <th>Due Date </th>
            <th>Remaining Fee</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td  className={styles.noData}>
                No defaulters found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.feeId}>
                <td>{s.name}</td>
                <td>{s.className}</td>
                <td>{s.section}</td>
                <td>{s.fatherName}</td>
                <td>{s.mobileNumber}</td>
                <td>{s.userName}</td>
                <td>{s.dueDate}</td>
                <td className={styles.amount}>₹{s.dueAmount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
