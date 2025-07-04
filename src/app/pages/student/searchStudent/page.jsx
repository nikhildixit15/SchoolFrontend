"use client";

import Link from "next/link";
import styles from "./page.module.css";
import StudentTable from "@/app/components/studentTable/studentTable";
import { useEffect, useState } from "react";
import { getStudents } from "@/app/services/student/studentService";

export default function SearchStudent() {
  const [students, setStudents] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getStudentData();
  }, []);

  async function getStudentData() {
    const result = await getStudents({});
    setStudents(result?.data || []);
    // setFilteredList(result?.data || []);
    console.log("Fetched students:", result);
  }

  function onTextChange(event) {
    const value = event.target.value.trim().toLowerCase();
    setSearchValue(event.target.value);
    if (!value) {
      setFilteredList([]);
    } else {
      const list = students.filter((item) =>
        (
          (item.name || "") +
          (item.userName || "") +
          (item.fatherName || "") +
          (item.motherName || "") +
          (item.mobileNumber || "") +
          (item.dob || "") +
          (typeof item.address === "string"
            ? item.address
            : (item.address?.permanentAddress || item.address?.currentAddress || "")) +
          (item.adarNo || "")
        )
          .toLowerCase()
          .includes(value)
      );
      setFilteredList(list);
      console.log("Filtered list:", list);
    }
    console.log("All students:", students);
  }

  return (
    <>
      <main>
        <div>
          <label>
            Search for anything like Student name, father's name, mobile number,
            user name etc.
            <input name="myInput" value={searchValue} onChange={onTextChange} />
          </label>

          <StudentTable students={filteredList} />

          <Link href={"/pages/login"}>Got to Login</Link>
          <br />
        </div>
      </main>
    </>
  );
}
