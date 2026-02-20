"use client";

import { useState } from "react";
import styles from "./page.module.css";
import toast from "react-hot-toast";
import { uploadResults } from "@/app/services/homeWork/homeWorkServices";

export default function ResultUpdatePage({
  students = [],
  subjects = [],
  exams = [], 
}) {
  const [marks, setMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState({});
  const [selectedExam, setSelectedExam] = useState(""); 

  // Handle marks obtained per student
  const handleMarkChange = (studentId, subjectId, value) => {
    if (!/^\d*$/.test(value)) return;

    const num = Number(value);
    if (num < 0 || num > 1000) return;

    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectId]: value,
      },
    }));
  };

  // Handle total marks per subject
  const handleTotalMarksChange = (subjectId, value) => {
    if (!/^\d*$/.test(value)) return;

    setTotalMarks((prev) => ({
      ...prev,
      [subjectId]: value,
    }));
  };

  // Save Result
  const handleSave = async () => {
    if (!selectedExam) {
      toast.error("Please select exam type");
      return;
    }

    for (const sub of subjects) {
      if (!totalMarks[sub._id]) {
        toast.error(`Enter total marks for ${sub.name}`);
        return;
      }
    }

    const payload = students.map((student) => ({
      studentId: student._id,
      examId: selectedExam, // 👈 send examId
      subjects: subjects.map((sub) => ({
        subjectId: sub._id,
        marksObtained: Number(marks[student._id]?.[sub._id] || 0),
        totalMarks: Number(totalMarks[sub._id]),
      })),
    }));
    try {
      const response = await uploadResults(payload);

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!students.length) {
    return <p className={styles.empty}>No students found</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Update Student Results</h2>

      {/* ✅ Exam Selection */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Exam: </label>
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className={styles.examSelect}
        >
          <option value="">Select Exam </option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.examType}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Class</th>

              {subjects.map((sub) => (
                <th key={sub._id}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{sub.name}</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Total"
                      value={totalMarks[sub._id] || ""}
                      onChange={(e) =>
                        handleTotalMarksChange(sub._id, e.target.value)
                      }
                      className={styles.totalInput}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.userName || student._id}</td>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>
                  {student.className} ({student.section})
                </td>

                {subjects.map((sub) => (
                  <td key={sub._id}>
                    <input
                      type="text"
                      inputMode="numeric"
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
