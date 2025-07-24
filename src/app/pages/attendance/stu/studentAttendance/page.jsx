"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AttendanceTable from "./attendanceTable";
import AttendanceFilter from "./attendanceFilter";
import { getStudentAttendanceList, saveAttendance } from "@/app/services/attendance/attendance";

export default function StudentList() {
  const [students, setStudents] = useState();
  const [basicInfo, setBasicInfo] = useState({});


  async function getStudentData(data) {
    setBasicInfo(data)
    const result = await getStudentAttendanceList(data);
    console.log("####", result);
    setStudents(result.data || []);
  }

  async function onAttendanceChange(studentList) {
    const list = studentList.map(item=>item);
    setStudents(list);
  }

  async function saveButtonClicked() {
    const payload = {
      _id: students.length>0?students[0]._id: null, // This should be replaced with the actual attendance ID if available
      classId: basicInfo.classId,
      className: basicInfo.className,
      section: basicInfo.section,
      attendanceDate: basicInfo.selectedDate,
      markedBy: "68455b6641509e199ab0ab88", // This should be replaced with the actual user ID
      students: students.map((student) => ({
        studentId: student.studentId,
        // _id: student._id, // Assuming each student has a unique ID
        status: student.status || "Absent", // Default to Absent if not specified
      })),
    };
    console.log("Attendance saved successfully", payload);

    const response = await saveAttendance(payload);
    console.log("Attendance saved successfully", response);
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
          <button onClick={saveButtonClicked}>Save attendance</button>
        </div>
      </main>
    </>
  );
}
