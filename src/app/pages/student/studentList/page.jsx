"use client";

import Link from "next/link";
import styles from "./page.module.css";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import { useEffect, useState } from "react";
import { getStudents } from "@/app/services/student/studentService";
import StudentTable from "@/app/components/studentTable/studentTable";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  async function getStudentData(data) {
    try {
      if (data.className && data.sectionName) {
        const result = await getStudents({
          className: data.className.value,
          sectionName: data.sectionName.value,
        });

        if (result.data && Array.isArray(result.data)) {
          // Filter students based on exact class and section match
          const filteredStudents = result.data.filter((student) => {
            // Log for debugging
            console.log("Comparing:", {
              studentClass: student.className,
              filterClass: data.className.value,
              studentSection: student.section,
              filterSection: data.sectionName.value,
            });

            // Strict comparison for both class and section
            const isMatch =
              student.className.trim() === data.className.value.trim() &&
              student.section.trim() === data.sectionName.value.trim();

            return isMatch;
          });

          console.log("Filtered Students:", filteredStudents);
          setStudents(filteredStudents);
        } else {
          console.log("No data received from API or invalid data format");
          setStudents([]);
        }
      } else {
        console.log("Missing class or section selection");
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  }

  return (
    <>
      <main>
        <ClassSecFilter getStudentData={getStudentData} />
        <div>
          {students.length > 0 ? (
            <StudentTable students={students} />
          ) : (
            <div className={styles.noData}>
              No students found for selected class and section
            </div>
          )}
        </div>
      </main>
    </>
  );
}
