"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StudentTable from "@/app/components/studentTable/studentTable";
import { getStudents } from "@/app/services/student/studentService";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import HomeWorkList from "./homeWorkList";
import {
  getHomeWorkByClass,
  saveHomeWorkByClass,
} from "@/app/services/homeWork/homeWorkServices";
export default function AssignHomeWork() {
  const [students, setStudents] = useState();
  const [hwData, setHWData] = useState();
  const [classInfo, setClassInfo] = useState();

  async function loadData(data) {
    setClassInfo(data);
    await Promise.all([getStudentData(data), getHomeWorkList(data)]);
  }

  async function getStudentData(data) {
    const result = await getStudents(data);
    console.log("####", result);
    setStudents(result);
  }

  async function getHomeWorkList(data) {
    const result = await getHomeWorkByClass(data);
    setHWData(result);
    console.log("####", result);
  }

  async function saveHomeWork(hwData) {
    console.log("####", hwData);
    const result = await saveHomeWorkByClass({
      hwData,
      class: classInfo.className,
      section: classInfo.sectionName,
    });
  }

  return (
    <main>
      <div className={styles.description}>
        <ClassSecFilter getStudentData={loadData}></ClassSecFilter>

        <HomeWorkList
          hwData={hwData}
          saveHomeWork={saveHomeWork}
        ></HomeWorkList>
        {/* TBD whether student specific home work specific */}
        {/* <StudentTable students={students}></StudentTable> */}
      </div>
    </main>
  );
}
