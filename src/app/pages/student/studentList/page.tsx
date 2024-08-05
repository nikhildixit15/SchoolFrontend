"use client";

import Link from "next/link";
import styles from "./page.module.css";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import { useEffect, useState } from "react";
import { getStudents } from "@/app/services/student/studentService";
import StudentTable from "@/app/components/studentTable/studentTable";

export default function StudentList() {
  const [students, setStudents] = useState<any>();

  async function getStudentData(data: any) {
    const result = await getStudents(data);
    console.log("####", result);
    setStudents(result);
  }

  return (
    <>
      <main>
        <ClassSecFilter getStudentData={getStudentData}></ClassSecFilter>

        <div>
          <StudentTable students={students}></StudentTable>
          <Link href={"/pages/login"}>Got to Login</Link>
        </div>
      </main>
    </>
  );
}
