"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStudentBasicInfo } from "@/app/services/student/studentService";
import StudentTabbedPage from "./studentTabbedPage";
import StudentProfileCard from "@/app/components/studentProfileCard/studentProfileCard";

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
          <StudentProfileCard studentData={stdBasicInfo}></StudentProfileCard>
          <div className={styles.tabContainer}>
            <StudentTabbedPage></StudentTabbedPage>
          </div>
        </div>
      </main>
    </>
  );
}
