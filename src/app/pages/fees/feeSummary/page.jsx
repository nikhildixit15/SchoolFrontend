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
export default function FeeSummary() {
  const [students, setStudents] = useState();
  const [stdFeeInfo, setStdFeeInfo] = useState();
  const [userName, setUserName] = useState();

  async function loadData(data) {
    setClassInfo(data);
    await Promise.all([getFeeDetails(data)]);
  }

  async function getFeeDetails(data) {
    const result = await getFeeDetailsByMonthAndClass(data);
    console.log("####123", result);
    setStudents(result);
  }

  function onTextChanged(event) {
    console.log("####", hwData);
    const value = event.target.value;
    setUserName(value);
  }

  async function onGetStudentClick(event) {
    if (userName) {
      const result = await getStudentFeeDetail({ userName });
      setStdFeeInfo(result);
    }
    setUserName(value);
  }

  return (
    <main>
      <div className={styles.searchContainer}>
        <label>Enter UserName</label>
        <input value={userName} onInput={onTextChanged}></input>
        <Link
          href={{
            pathname: "/pages/student/studentDetails",
            query: { userName },
          }}
        >
          Get Student
        </Link>
      </div>
      <div className={styles.mainContainer}></div>
    </main>
  );
}
