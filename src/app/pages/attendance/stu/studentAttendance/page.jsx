"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AttendanceTable from "./attendanceTable";
import AttendanceFilter from "./attendanceFilter";
import { getStudentAttendanceList } from "@/app/services/attendance/attendance";

export default function StudentList() {
  const [students, setStudents] = useState();

  async function getStudentData(data) {
    const result = await getStudentAttendanceList(data);
    console.log("####", result);
    setStudents(result);
  }

  function onAttendanceChange(studentList) {
    const list = studentList.map((item) => item);
    setStudents(list);
  }

  return (
    <>
      <main>
        <AttendanceFilter getStudentData={getStudentData}></AttendanceFilter>

        <div>
          <AttendanceTable
            students={students}
            onAttendanceChange={onAttendanceChange}
          ></AttendanceTable>
          <button>Save attendance</button>
        </div>
      </main>
    </>
  );
}
