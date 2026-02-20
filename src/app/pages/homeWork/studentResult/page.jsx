"use client";

import React, { useState } from "react";
import StudentsTablePage from "./studentResult";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import { getStudentsByClass } from "@/app/services/fees/feeServices";
import { ExamTypeList } from "@/app/services/academic/academicService";
import { academicYears } from "@/app/utils/constants";
import styles from "./page.module.css";
import toast from "react-hot-toast";

const ResultPage = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [examType, setExamType] = useState([]);
  const [students, setStudents] = useState([]);

  async function fetchExamTypes(classId, sectionId, year) {
    try {
      const res = await ExamTypeList(classId, sectionId, year);

      if (res.data.success) {
        setExamType(res.data.exam);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch exam types");
    }
  }

  async function handleStudentData(data) {
    if (!academicYear) {
      toast.error("Please select academic year");
      return;
    }

    const response = await getStudentsByClass({
      className: data.className.value,
      section: data.sectionName.label,
    });

    setStudents(response.data); 
    fetchExamTypes(data.className.id, data.sectionName.value, academicYear);
  }

  return (
    <div className={styles.container}>
      {/* ✅ Academic Year Select */}
      <div className={styles.yearBox}>
        <label>Select Academic Year</label>
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className={styles.select}
        >
          <option value="">Select Year</option>

          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <ClassSecFilter getStudentData={handleStudentData} />
      <StudentsTablePage students={students} exams={examType} />
    </div>
  );
};

export default ResultPage;
