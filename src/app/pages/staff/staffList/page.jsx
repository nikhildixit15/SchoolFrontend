"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStaffList } from "@/app/services/staff/staffService";
import StaffTable from "@/app/components/staffTable/staffTable";
import StaffFilter from "./staffFilter";

export default function StaffList() {
  const [staff, setStaff] = useState([]);

  async function getData(data) {
    const result = await getStaffList();
    // Support both result and result.data
    const staffList = Array.isArray(result)
      ? result
      : (result && Array.isArray(result.data))
        ? result.data
        : result || [];

    if (data?.department && data?.designation) {
      const filteredStaff = staffList.filter((item) => {
        // Support both nested and flat structure
        const department = item.profileDetails?.department || item.department || "";
        const designation = item.profileDetails?.designation || item.designation || "";

        // Log for debugging
        console.log("Comparing:", {
          staffDepartment: department,
          filterDepartment: data.department.value,
          staffDesignation: designation,
          filterDesignation: data.designation.value,
        });

        // Strict comparison for both department and designation
        const isMatch =
          department.trim().toLowerCase() === data.department.value.trim().toLowerCase() &&
          designation.trim().toLowerCase() === data.designation.value.trim().toLowerCase();

        return isMatch;
      });

      console.log("Filtered Staff:", filteredStaff);
      setStaff(filteredStaff);
    } else {
      // If no filter, show all
      setStaff(staffList);
    }
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
