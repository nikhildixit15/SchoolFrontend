"use client";

import styles from "./page.module.css";
import { useState } from "react";
 import toast from "react-hot-toast";
import ResultPage from "./result/page";

export default function StudentsTablePage({ students = [], exams }) {
   const [selectedExam, setSelectedExam] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

 
 const handleRowClick = (studentId) => {
  if (!selectedExam) {
    toast.error("Please select exam first");
    return;
  }
  setSelectedStudent(studentId);
};


  return (
    <div>
      <div className={styles.selectBox}>
        <label>Select Exam:</label>
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">Select Exam</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.examType}
            </option>
          ))}
        </select>
      </div>
      <h2 className={styles.heading}>Student List</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Father Name</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr
              key={student._id}
              onClick={() => handleRowClick(student._id)}
              style={{ cursor: "pointer" }}
            >
              <td>{index + 1}</td>
              <td>{student.userName}</td>
              <td>
                {student.firstName} {student.lastName}
              </td>
              <td>{student.className}</td>
              <td>{student.section}</td>
              <td>{student.fatherName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
  <ResultPage studentId={selectedStudent} examId={selectedExam} />
)}

    </div>
  );
}
