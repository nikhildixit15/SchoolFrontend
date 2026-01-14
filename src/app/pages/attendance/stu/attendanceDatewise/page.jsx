"use client";
 
import { useState } from "react";
import AttendanceTable from "./attendanceTable";
import DatewiseFilter from "./datewiseFilter";
import { getDatewiseAttendanceList } from "@/app/services/attendance/attendance";

export default function StudentList() {
  const [students, setStudents] = useState();

  async function getStudentData(data) {
    const result = await getDatewiseAttendanceList(data);
    console.log("####", result.data.data);
    setStudents(result.data.data);
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
