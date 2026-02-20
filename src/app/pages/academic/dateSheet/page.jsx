"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Calendar, Clock, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import {
  getExamList,
  deleteExamSchedule,
} from "@/app/services/academic/academicService";

const ExamScheduleView = () => {
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState([]);
  const [uniqueClasses, setUniqueClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [filteredExams, setFilteredExams] = useState([]);

  useEffect(() => {
    loadExamSchedule();
  }, []);

  const loadExamSchedule = async () => {
    try {
      const res = await getExamList();

      if (res?.data?.exam?.length > 0) {
        setExamData(res.data.exam);

        // Get unique class-section combos
        const uniqueMap = new Map();
        res.data.exam.forEach((exam) => {
          const key = `${exam.classId}_${exam.sectionId}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, {
              classId: exam.classId,
              sectionId: exam.sectionId,
              className: exam.className,
              sectionName: exam.sectionName,
            });
          }
        });

        setUniqueClasses(Array.from(uniqueMap.values()));
      } else {
        toast.error("No exam schedule found");
      }
    } catch (error) {
      toast.error("Failed to load exam schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    const exams = examData.filter(
      (exam) =>
        exam.classId === cls.classId && exam.sectionId === cls.sectionId,
    );
    setFilteredExams(exams);
  };

 const handleDelete = async (examId) => { 
    await deleteExamSchedule(examId); 
    toast.success("Exam schedule deleted successfully"); 
    setExamData((prev) => prev.filter((exam) => exam._id !== examId));
    setFilteredExams((prev) =>
      prev.filter((exam) => exam._id !== examId)
    );
  };
 


  if (loading) {
    return <div className={styles.loader}>Loading exam schedule...</div>;
  }

  if (uniqueClasses.length === 0) {
    return <div className={styles.empty}>No exam schedule available</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.mainTitle}>📘 Exam Schedules</h1>

        <div className={styles.buttonWrapper}>
          {uniqueClasses.map((cls) => (
            <button
              key={`${cls.classId}_${cls.sectionId}`}
              className={`${styles.classButton} ${
                selectedClass &&
                selectedClass.classId === cls.classId &&
                selectedClass.sectionId === cls.sectionId
                  ? styles.active
                  : ""
              }`}
              onClick={() => handleSelectClass(cls)}
            >
              Class {cls.className} – Section {cls.sectionName}
            </button>
          ))}
        </div>

        {filteredExams.length > 0 &&
          filteredExams.map((exam) => (
            <div className={styles.card} key={exam._id}>
              <div className={styles.examHeader}>
                <span className={styles.examType}>{exam.examType}{" "}({exam.academicYear})</span>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(exam._id)}
                >
                  Delete
                </button>
              </div>

              <div className={styles.metaInfo}>
                <span>
                  <strong>Class:</strong> {exam.className}
                </span>
                <span>
                  <strong>Section:</strong> {exam.sectionName}
                </span>
                <span>
                  <strong>Created:</strong>{" "}
                  {`${String(new Date(exam.createdAt).getDate()).padStart(2, "0")}-${String(new Date(exam.createdAt).getMonth() + 1).padStart(2, "0")}-${new Date(exam.createdAt).getFullYear()}`}
                </span>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.subjects.map((sub, idx) => (
                      <tr key={sub.subjectId}>
                        <td>{idx + 1}</td>
                        <td className={styles.subjectCell}>
                          <BookOpen size={16} /> {sub.subjectName}
                        </td>
                        <td>
                          <Calendar size={14} />{" "}
                          {`${String(new Date(sub.date).getDate()).padStart(2, "0")}-${String(new Date(exam.createdAt).getMonth() + 1).padStart(2, "0")}-${new Date(exam.createdAt).getFullYear()}`}
                        </td>
                        <td>
                          <Clock size={14} /> {sub.startTime}
                        </td>
                        <td>
                          <Clock size={14} /> {sub.endTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExamScheduleView;
