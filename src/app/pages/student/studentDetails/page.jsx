"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStudentBasicInfo } from "@/app/services/student/studentService";
import StudentProfile from "@/app/components/studentProfile/studentProfile";
import StudentTabbedPage from "./studentTabbedPage";

export default function StudentDetails({ searchParams }) {
  console.log("###searchParams", searchParams);
  const [stdBasicInfo, setStdBasicInfo] = useState();

  const userName = searchParams?.userName;

  useEffect(() => {
    if (userName) {
      fetchStudentBasicInfo();
    } else if (searchParams?.student) {
      const profileData = JSON.parse(searchParams?.student);
      setStdBasicInfo(profileData);
    }
  }, []);

  async function fetchStudentBasicInfo(data) {
    const result = await getStudentBasicInfo(data);
    setStdBasicInfo(result);
    console.log("####", result);
  }

  return (
    <>
      <main>
        <div className={styles.container}>
          <StudentProfile studentData={stdBasicInfo}></StudentProfile>
          <div>
            <StudentTabbedPage></StudentTabbedPage>
          </div>
        </div>
      </main>
    </>
  );
}
