"use client";

import styles from "./page.module.css";
import { useState } from "react";
import AttendanceTable from "./attendanceTable";
import DatewiseFilter from "./datewiseFilter";
import { getDatewiseAttendanceList } from "@/app/services/attendance/attendance";

export default function StudentList() {
  const [students, setStudents] = useState();

  async function getStudentData(data) {
    const result = await getDatewiseAttendanceList(data);
    console.log("####", result);
    setStudents(result);
  }

  return (
    <>
      <main>
        <DatewiseFilter getStudentData={getStudentData}></DatewiseFilter>

        <div>
          <AttendanceTable students={students}></AttendanceTable>
        </div>
      </main>
    </>
  );
}
