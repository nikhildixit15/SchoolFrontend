"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AttendanceFilter from "./attendanceFilter";
import { getClasswiseAttendanceList } from "@/app/services/attendance/attendance";
import DatewiseTable from "./classwiseTable";
import ClasswiseTable from "./classwiseTable";

export default function AttendanceClasswise() {
  const [classwiseList, setClasswiseList] = useState();

  async function getListData(data) {
    const result = await getClasswiseAttendanceList(data);
    console.log("####classwiseListq", result);
    setClasswiseList(result);
  }

  return (
    <>
      <main>
        <AttendanceFilter getStudentData={getListData}></AttendanceFilter>

        <div>
          <ClasswiseTable listData={classwiseList}></ClasswiseTable>
        </div>
      </main>
    </>
  );
}
