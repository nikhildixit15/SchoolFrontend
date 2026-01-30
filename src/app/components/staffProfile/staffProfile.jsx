"use client";

import { useEffect, useState } from "react";
import { getStaffById } from "@/app/services/staff/staffService" 
import StaffProfileCard from "../staffProfileCard/staffProfileCard"; 
import StaffTabbedPage from "../staffProfileTab/staffProfileTab";
import styles from "./page.module.css";

export default function StaffProfile({ staffId }) {
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