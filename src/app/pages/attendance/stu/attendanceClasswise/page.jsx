"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AttendanceFilter from "./attendanceFilter";
import { getClasswiseAttendanceList } from "@/app/services/attendance/attendance";
import ClasswiseTable from "./classwiseTable";

export default function AttendanceClasswise() {
  const [classWiseList, setClassWiseList] = useState();

  async function getListData(data) {
    const result = await getClasswiseAttendanceList(data);
    console.log("####classwiseListq", result.data);
    setClassWiseList(result.data);
  }

  return (
    <>
      <main>
        <AttendanceFilter getStudentData={getListData}></AttendanceFilter>

        <div>
          <ClasswiseTable listData={classWiseList}></ClasswiseTable>
        </div>
      </main>
    </>
  );
}
