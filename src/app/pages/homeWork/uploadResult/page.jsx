"use client";

import React, { useState } from "react";
import ResultUpdatePage from "./resultUpdatePage";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import { getStudentsByClass } from "@/app/services/fees/feeServices";

const uploadResult = () => {
  const [students, setStudents] = useState([]);

  async function handleStudentData(data) {
    const response = await getStudentsByClass({
      className: data.className.value,
      section: data.sectionName.label,
    });
    setStudents(response?.data || []);
  }

  function handleSearchSelect(student) {
    const formated = Array.isArray(student) ? student : [data];
    setStudents(formated);
    console.log("Studentswe", formated);
  }

  return (
    <div>
      <ClassSecFilter getStudentData={handleStudentData} />
      <StudentSearch onSelect={handleSearchSelect} />
      <ResultUpdatePage />
    </div>
  );
};

export default uploadResult;
