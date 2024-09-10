"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StudentTable from "@/app/components/studentTable/studentTable";
import { getStudents } from "@/app/services/student/studentService";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";

import {
  getFeeDetailsByMonthAndClass,
  updateStudentFeeStatus,
} from "@/app/services/fees/feeServices";
import StudentFeeTable from "@/app/components/studentFeeTable/studentFeeTable";
import MonthClassFilter from "@/app/components/monthClassFilter/monthClassFilter";
export default function SubmitFee() {
  const [students, setStudents] = useState();
  const [classInfo, setClassInfo] = useState();

  async function loadData(data) {
    setClassInfo(data);
    await Promise.all([getFeeDetails(data)]);
  }

  async function getFeeDetails(data) {
    const result = await getFeeDetailsByMonthAndClass(data);
    console.log("####123", result);
    setStudents(result);
  }

  async function saveHomeWork(hwData) {
    console.log("####", hwData);
    const result = await updateStudentFeeStatus({
      hwData,
      class: classInfo.className,
      section: classInfo.sectionName,
    });
  }

  return (
    <main>
      <div className={styles.description}>
        <MonthClassFilter getData={loadData}></MonthClassFilter>
        <StudentFeeTable students={students}></StudentFeeTable>
      </div>
    </main>
  );
}
