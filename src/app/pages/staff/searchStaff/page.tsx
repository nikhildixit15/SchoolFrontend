"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStaffList } from "@/app/services/staff/staffService";
import StaffTable from "@/app/components/staffTable/staffTable";

export default function SearchStaff() {
  const [staffList, setStaffList] = useState<any>();
  const [filteredList, setFilteredList] = useState<any>();

  useEffect(() => {
    getStudentData({});
  }, []);

  async function getStudentData(data: any) {
    const result = await getStaffList(data);
    console.log("####", result);
    setStaffList(result);
  }

  function onTextChange(event: any) {
    const value = event.target.value;
    if (!value) {
      setFilteredList([]);
    } else {
      const list = staffList.filter((item: any) =>
        (
          item.name +
          item.userName +
          item.department +
          item.designation +
          item.classes +
          item.dob +
          item.address +
          item.qualification
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
            Search for anything like name, qualification, mobile number, user
            name etc.
            <input name="myInput" onInput={onTextChange} />
          </label>

          <StaffTable staffList={filteredList}></StaffTable>

          <Link href={"/pages/login"}>Got to Login</Link>
        </div>
      </main>
    </>
  );
}
