"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StudentTabbedPage from "../studentProfileTab/studentProfileTab";
import StudentProfileCard from "../studentProfileCard/studentProfileCard";
import { getProfile } from "@/app/services/student/studentService";
import { useRouter } from "next/navigation";
import StudentProfileEdit from "../studentProfileEdit/profileSdit";

export default function StudentProfile({ studentId }) {
  console.log("###StudentProfile", studentId);
  const [stdBasicInfo, setStdBasicInfo] = useState({});
  const [student, setStudent] = useState({});
  const [editMode, setEditMode] = useState(false);

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

  if (editMode) {
    return (
      <>
       <button className={styles.backBtn} onClick={() => setEditMode(false)}>
            Back Profile
          </button>
      <StudentProfileEdit
        studentId={studentId}
        onClose={() => setEditMode(false)}
      />
          </>
    );
  }

  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.leftColumn}>
        <StudentProfileCard student={stdBasicInfo} />

        {/* ✅ BUTTON CARD KE NEECH */}
        <div className={styles.stickyBtnWrapper}>
          <button className={styles.editBtn} onClick={() => setEditMode(true)}>
            ✏️ Edit Profile
          </button>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className={styles.tabContainer}>
        <StudentTabbedPage student={student} studentId={studentId} />
      </div>
    </div>
  );
}
