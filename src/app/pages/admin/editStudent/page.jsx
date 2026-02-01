"use client";

import React from "react";
import StudentProfileEdit from "@/app/components/studentProfileEdit/profileSdit"; 
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import { useState } from "react";
import styles from "./page.module.css"

const page = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  console.log("Selected Student", selectedStudent);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student._id);
  };

  return (
    <div className={styles.sectionContainer}>
      <label className={styles.label}><h3>Edit Student</h3></label>
      <StudentSearch onSelect={handleSelectStudent} />
      {selectedStudent && <StudentProfileEdit studentId={selectedStudent} />}
    </div>
  );
};

export default page;
