"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStaffList } from "@/app/services/staff/staffService";
import StaffTable from "@/app/components/staffTable/staffTable";

export default function SearchStaff() {
  const [staffList, setStaffList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getStaffData();
  }, []);

  async function getStaffData() {
    const result = await getStaffList({});
    setStaffList(result?.data || []);
  }

  function onTextChange(event) {
    const value = event.target.value.trim().toLowerCase();
    setSearchValue(event.target.value);
    if (!value) {
      setFilteredList([]);
    } else {
      const list = staffList.filter((item) =>
        (
          (item.name || "") +
          (item.userName || "") +
          (item.department || "") +
          (item.designation || "") +
          (item.classes || "") +
          (item.dob || "") +
          (item.address || "") +
          (item.qualification || "") +
          (item.mobileNumber || "")
        )
          .toLowerCase()
          .includes(value)
      );
      setFilteredList(list);
    }
  }

  return (
    <>
      <main>
        <div className={styles.container}>
          <label className={styles.searchLabel}>
            Search for anything like name, qualification, mobile number, user name etc.
            <input
              className={styles.searchInput}
              name="myInput"
              value={searchValue}
              onChange={onTextChange}
              placeholder="Type to search staff..."
            />
          </label>

          <StaffTable staffList={filteredList} />

          <Link href={"/pages/login"}>Go to Login</Link>
        </div>
      </main>
    </>
  );
}
