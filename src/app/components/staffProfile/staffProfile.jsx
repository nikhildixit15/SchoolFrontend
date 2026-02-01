"use client";

import { useEffect, useState } from "react";
import { getStaffById } from "@/app/services/staff/staffService";
import StaffProfileCard from "../staffProfileCard/staffProfileCard";
import StaffTabbedPage from "../staffProfileTab/staffProfileTab";
import styles from "./page.module.css";
import StaffProfileEdit from "../staffProfileEdit/staffProfileEdit";

export default function StaffProfile({ staffId }) {
  const [staff, setStaff] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  async function fetchStaffDetails() {
    const response = await getStaffById({ id: staffId });
    setStaff(response);
  }

  if (editMode) {
    return (
      <>
        <button className={styles.backBtn} onClick={() => setEditMode(false)}>
          Back Profile
        </button>
        <StaffProfileEdit
          staffId={staffId}
          onClose={() => setEditMode(false)}
        />
      </>
    );
  }

  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <StaffProfileCard staff={staff} />
            <div className={styles.stickyBtnWrapper}>
              <button
                className={styles.editBtn}
                onClick={() => setEditMode(true)}
              >
                ✏️ Edit Profile
              </button>
            </div>
          </div>
          <div className={styles.tabContainer}>
            <StaffTabbedPage staff={staff} />
          </div>
        </div>
      </main>
    </>
  );
}
