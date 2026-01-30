"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStaffById } from "@/app/services/staff/staffService";
import StaffProfileCard from "@/app/components/staffProfileCard/staffProfileCard";
import StaffTabbedPage from "@/app/components/staffProfileTab/staffProfileTab";
 

export default function StaffDetails({ searchParams }) {
  const staffId = searchParams.staffId;
  const [staff, setStaff] = useState({});

  useEffect(() => {
    fetchStaffDetails(); 
  }, []);

  async function fetchStaffDetails() {
    const response = await getStaffById({id:staffId});
      setStaff(response);
  }

  return (
    <>
      <main>
        <div className={styles.container}>
          <StaffProfileCard staff={staff} />
          <div className={styles.tabContainer}>
            <StaffTabbedPage staff={staff} />
          </div>
        </div>
      </main>
    </>
  );
}