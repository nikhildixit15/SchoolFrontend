"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StudentTabbedPage from "../studentProfileTab/studentProfileTab";
import StudentProfileCard from "../studentProfileCard/studentProfileCard";
import { getProfile } from "@/app/services/student/studentService";

export default function StudentProfile({ studentId }) {
  console.log("###StudentProfile", studentId);
  const [stdBasicInfo, setStdBasicInfo] = useState({});
  const [student, setStudent] = useState({});

  useEffect(() => {
    if (!studentId) {
      console.log("studentId missing");
      return;
    }
    fetchStudentDetails();
  }, [studentId]);

  async function fetchStudentDetails() {
    console.log("StudentIDDF", studentId);
    if (!studentId) return;
    const response = await getProfile(studentId);
    console.log("StudentProfile Response", response.data);
    setStdBasicInfo(response.data);
    setStudent(response.data);
    console.log("StudentDataPresent", student);
  }

  return (
    <div className={styles.container}>
      <StudentProfileCard student={stdBasicInfo}></StudentProfileCard>
      <div className={styles.tabContainer}>
        <StudentTabbedPage student={student} studentId={studentId} />
      </div>
    </div>
  );
}
