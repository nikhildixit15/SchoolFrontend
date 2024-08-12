"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStudents } from "@/app/services/student/studentService";
import StudentProfile from "@/app/components/studentProfile/studentProfile";
import StudentTabbedPage from "./studentTabbedPage";

export default function StudentDetails({ searchParams }) {
  console.log("###searchParams", searchParams);

  const profileData = JSON.parse(searchParams.student);

  const [students, setStudents] = useState();

  useEffect(() => {
    getStudentData({});
  }, []);

  async function getStudentData(data) {
    const result = await getStudents(data);
    console.log("####", result);
    setStudents(result);
  }

  return (
    <>
      <main>
        <div className={styles.container}>
          <StudentProfile studentData={profileData}></StudentProfile>
          <div>
            <StudentTabbedPage></StudentTabbedPage>
          </div>
        </div>
      </main>
    </>
  );
}
