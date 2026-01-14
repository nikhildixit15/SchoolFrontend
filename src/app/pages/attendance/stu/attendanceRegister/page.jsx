"use client"; 
import { useEffect, useState } from "react";
import AttendanceFilter from "./attendanceFilter";
import { getAttendanceRegisterData } from "@/app/services/attendance/attendance";
import AttendanceRegisterTable from "./attendanceRegisterTable";

export default function AttendanceRegister() {
  const [students, setStudents] = useState();
  const [month, setMonth] = useState();

  async function getListData(data) { 
    const result = await getAttendanceRegisterData(data);
    console.log("####1111111", result);
    setStudents(result);
    setMonth(data.attendanceDate)
  }

  return (
    <>
      <main>
        <AttendanceFilter getStudentData={getListData}></AttendanceFilter>
       
        <div>
          <AttendanceRegisterTable
            students={students}
            month={month}
          ></AttendanceRegisterTable>
        </div>
      </main>
    </>
  );
}
