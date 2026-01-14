"use client";

import { useState } from "react";
import AttendanceTable from "./attendanceTable";
import AttendanceFilter from "./attendanceFilter";
import {
  getStudentAttendanceList,
  saveAttendance,
} from "@/app/services/attendance/attendance";
import toast from "react-hot-toast";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [basicInfo, setBasicInfo] = useState({});

  const getStudentData = async (data) => {
    setBasicInfo(data);
    const result = await getStudentAttendanceList(data);
    setStudents(result?.data || []);
  };

  const onAttendanceChange = (updatedList) => {
    setStudents(updatedList);
  };

  const saveButtonClicked = async () => {
    const today = new Date().toISOString().split("T")[0];
    const selectedDate = basicInfo.selectedDate;

    // Date validation (UX only)
    if (selectedDate !== today) {
      return toast.error(
        selectedDate < today
          ? "Cannot update attendance for a previous date."
          : "Cannot create attendance for a future date."
      );
    }

    if (!students.length) {
      return toast.error("No student records found.");
    }

    const payload = {
      _id: students[0]?._id || null,
      classId: basicInfo.classId,
      className: basicInfo.className,
      section: basicInfo.section,
      attendanceDate: selectedDate,
      markedBy: "68455b6641509e199ab0ab88",
      students: students.map((s) => ({
        studentId: s.studentId,
        status: s.status || "Absent",
      })),
    };

    try {
      await saveAttendance(payload);
      toast.success("Attendance saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save attendance.");
    }
  };

  return (
    <main>
      <AttendanceFilter getStudentData={getStudentData} />

      {students.length ? (
        <>
          <AttendanceTable
            students={students}
            onAttendanceChange={onAttendanceChange}
          />
          <button onClick={saveButtonClicked}>
            Save Attendance
          </button>
        </>
      ) : (
        <p className="p-4 text-gray-500">
          Select filter to load student list.
        </p>
      )}
    </main>
  );
}
