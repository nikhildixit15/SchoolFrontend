"use client";

import { useState } from "react";
import styles from "./page.module.css";
import toast from "react-hot-toast";

/* Sample JSON */
const students = [
  { _id: "1", name: "Aarav Sharma" },
  { _id: "2", name: "Riya Verma" },
  { _id: "3", name: "Kabir Singh" },
];

const subjects = [
  { _id: "s1", name: "Maths" },
  { _id: "s2", name: "Science" },
  { _id: "s3", name: "English" },
];

export default function ResultUpdatePage() {
  const [marks, setMarks] = useState({});

const handleMarkChange = (studentId, subjectId, value) => { 
  if (!/^\d*$/.test(value)) return;

  const num = Number(value);
  
  if (num < 0 || num > 100) return; // block negative & max limit

  setMarks((prev) => ({
    ...prev,
    [studentId]: {
      ...prev[studentId],
      [subjectId]: value,
    },
  }));
};


  const handleSave = () => {
    const payload = students.map((student) => ({
      studentId: student._id,
      marks: marks[student._id] || {},
    }));

    console.log("RESULT PAYLOAD:", payload);
    toast.success("Result saved successfully");
  };

  return (
    <div className={styles.container}>
      <h2>Update Student Results</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>StudentId</th>
              <th>Name</th>
              {subjects.map((sub) => (
                <th key={sub._id}>{sub.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className={styles.nameCol}>{student.name}</td>
                <td className={styles.nameCol}>{student.name}</td>
                <td className={styles.nameCol}>{student.name}</td>

                {subjects.map((sub) => (
                  <td key={sub._id}>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      value={marks[student._id]?.[sub._id] || ""}
                      onChange={(e) =>
                        handleMarkChange(student._id, sub._id, e.target.value)
                      }
                      className={styles.input}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className={styles.saveBtn} onClick={handleSave}>
        Save Result
      </button>
    </div>
  );
}
