"use client";

import Link from "next/link";
import styles from "./page.module.css";
import StudentTable from "@/app/components/studentTable/studentTable";
import { useEffect, useState } from "react";
import { getStudents } from "@/app/services/student/studentService";

export default function SearchStudent() {
  const [students, setStudents] = useState<any>();
  const [filteredList, setFilteredList] = useState<any>();

  useEffect(() => {
    getStudentData({});
  }, []);

  async function getStudentData(data: any) {
    const result = await getStudents(data);
    console.log("####", result);
    setStudents(result);
  }

  function onTextChange(event: any) {
    const value = event.target.value;
    if (!value) {
      setFilteredList([]);
    } else {
      const list = students.filter((item: any) =>
        (
          item.name +
          item.userName +
          item.fatherName +
          item.motherName +
          item.mobileNumber +
          item.dob +
          item.address +
          item.adarNo
        ).includes(value)
      );
      setFilteredList(list);
    }
  }
  return (
    <>
      <main>
        <div>
          <label>
            Search for anything like Student name, father's name, mobile number,
            user name etc.
            <input name="myInput" onInput={onTextChange} />
          </label>

          <StudentTable students={filteredList}></StudentTable>

          <Link href={"/pages/login"}>Got to Login</Link>
          <br/>
          <button><Link href={"./nikhilStudent"}>Class wise Strength</Link></button>
           {/* Or Path/pages/student/nikhilStudent */}
        </div>
      </main>
    </>
  );
}
