"use client";

import React, { useState, useEffect } from "react";
import ResultUpdatePage from "./resultUpdatePage";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import { getStudentsByClass } from "@/app/services/fees/feeServices";
import { getSubjectByClass } from "@/app/services/admin/adminService";
import { ExamTypeList } from "@/app/services/academic/academicService";
import toast from "react-hot-toast";

const uploadResult = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examsType, setExamType] = useState([]);

  const academicYear = "2025-2026";

  async function fetchExamTypes(classId, sectionId) {
    try {
      const res = await ExamTypeList(classId, sectionId, academicYear);

      if (res.data.success) {
         setExamType(res.data.exam);
       } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch exam types");
    }
  }

  async function getSubjectData(classId, sectionName) {
    const res = await getSubjectByClass(classId, sectionName);
     setSubjects(res?.data.data || []);
    if (!res.data.success) {
      toast.error(res.data?.message);
    }
  }

  async function handleStudentData(data) {
    const response = await getStudentsByClass({
      className: data.className.value,
      section: data.sectionName.label,
    });
     setStudents(response?.data || []);
    getSubjectData(data.className.id, data.sectionName.label);
    fetchExamTypes(data.className.id, data.sectionName.value);
  }

  function handleSearchSelect(student) {
    const formated = Array.isArray(student) ? student : [student];
     getSubjectData(student.classId, student.section);
    setStudents(formated);
    fetchExamTypes(student.classId, student.sectionId);
  }
 
  return (
    <div>
      <ClassSecFilter getStudentData={handleStudentData} />
      <StudentSearch onSelect={handleSearchSelect} />
      <ResultUpdatePage
        students={students}
        subjects={subjects}
        exams={examsType}
      />
    </div>
  );
};

export default uploadResult;
