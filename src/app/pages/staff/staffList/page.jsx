"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStaffList } from "@/app/services/staff/staffService";
import StaffTable from "@/app/components/staffTable/staffTable";
import StaffFilter from "./staffFilter";

export default function StaffList() {
  const [staff, setStaff] = useState([]);

  async function getData(filter) {
    const result = await getStaffList();
    const staffList = Array.isArray(result)
      ? result
      : (result && Array.isArray(result.data))
        ? result.data
        : result || [];
    console.log("API staffList:", staffList);
    console.log("Filter:", filter);

    const filtered = staffList.filter((item) => {
      const departmentMatch = filter?.department
        ? item.profileDetails?.department?.trim().toLowerCase() === filter.department.value.trim().toLowerCase()
        : true;
      const designationMatch = filter?.designation
        ? item.profileDetails?.designation?.trim().toLowerCase() === filter.designation.value.trim().toLowerCase()
        : true;
      return departmentMatch && designationMatch;
    });
    console.log("Filtered staff:", filtered);
    setStaff(filtered);
  }

  return (
    <main>
      <StaffFilter getData={getData} />
      <div>
        {staff.length > 0 ? (
          <StaffTable staffList={staff} />
        ) : (
          <div>No staff found for selected filters</div>
        )}
      </div>
    </main>
  );
}
