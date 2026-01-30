"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStudentById } from "@/app/services/student/studentService";
import StudentTabbedPage from "@/app/components/studentProfileTab/studentProfileTab"; 
import StudentProfileCard from "@/app/components/studentProfileCard/studentProfileCard";

export default function StudentDetails({ searchParams }) {
  console.log("###searchParams", searchParams);
  const studentId = searchParams.studentId;
  const [stdBasicInfo, setStdBasicInfo] = useState({});
  const [student, setStudent] = useState({});

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  async function fetchStudentDetails() {
    const response = await getStudentById({ id: studentId });
    setStdBasicInfo(response.data);
    setStudent(response.data);
  }

  return (
    <>
      <main>
        <div className={styles.container}>
          <StudentProfileCard student={stdBasicInfo}></StudentProfileCard>
          <div className={styles.tabContainer}>
            <StudentTabbedPage student={student} studentId={studentId} />
          </div>
        </div>
      </main>
    </>
  );
}
