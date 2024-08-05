"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStaffList } from "@/app/services/staff/staffService";
import StaffTable from "@/app/components/staffTable/staffTable";
import StaffFilter from "./staffFilter";

export default function StaffList() {
  const [staffList, setStaffList] = useState();
  const [filteredList, setFilteredList] = useState();

  useEffect(() => {}, []);

  function getData() {
    getStaffListData();
  }

  async function getStaffListData() {
    const list = await getStaffList();
    setStaffList(list);
  }

  return (
    <main>
      <StaffFilter getData={getData}></StaffFilter>

      <div>
        <StaffTable staffList={staffList}></StaffTable>
      </div>
    </main>
  );
}
