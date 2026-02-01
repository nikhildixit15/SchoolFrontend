"use client";

import React from "react";
 import StaffSearch from "@/app/components/staffSearch/page"; 
  import { useState } from "react";
import styles from "./page.module.css"
import StaffProfileEdit from "@/app/components/staffProfileEdit/staffProfileEdit"; 

const page = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  console.log("Selected Staff", selectedStaff);

  const handleSelectStaff = (Staff) => {
    setSelectedStaff(Staff._id);
  };

  return (
    <div className={styles.sectionContainer}>
      <label className={styles.label}><h3>Edit Staff</h3></label>
      <StaffSearch onSelect={handleSelectStaff} />
      {selectedStaff && <StaffProfileEdit staffId={selectedStaff} />}
    </div>
  );
};

export default page;
