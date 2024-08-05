"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AttendanceFilter from "./attendanceFilter";
import { getAttendanceRegisterData } from "@/app/services/attendance/attendance";
import AttendanceRegisterTable from "./attendanceRegisterTable";

export default function AttendanceRegister() {
  const [students, setStudents] = useState();

  async function getListData(data) {
    const result = await getAttendanceRegisterData(data);
    console.log("####1111111", result);
    setStudents(result);
  }

  return (
    <>
      <main>
        <AttendanceFilter getStudentData={getListData}></AttendanceFilter>

        <div>
          <AttendanceRegisterTable
            students={students}
            month={"March"}
          ></AttendanceRegisterTable>
        </div>
      </main>
    </>
  );
}
