"use client";

import React, { useEffect, useState } from "react";
import StaffSearch from "@/app/components/staffSearch/page";
import AdminLeavePage from "./adminLeavePage";
import {
  getPendingLeave,
  getStaffLeaves,
} from "@/app/services/staff/staffService";
import toast from "react-hot-toast";
import styles from "./page.module.css";

const Leave = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadPending = async () => {
    try {
       const result = await getPendingLeave();
      setLeaves(result.data.data || []);
    } catch (err) {
      toast.error("Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  loadPending();
}, []);

 const fetchLeaves = async (staffId) => {
  try {
     const res = await getStaffLeaves(staffId);
    setLeaves(res.data.data || []);
  } catch (err) {
    toast.error("Failed to load leaves");
  } finally {
    setLoading(false);
  }
};

  const handleSelectStaff = (staff) => {
    setSelectedStaff(staff._id);
    fetchLeaves(staff._id);
  };

  return (
    <div className={styles.page}>
      <h4 className={styles.title}>Staff Apply For Leave</h4>

      <div className={styles.searchWrapper}>
        <StaffSearch onSelect={handleSelectStaff} />
      </div>

      {!loading && <AdminLeavePage leavesData={leaves} />}
    </div>
  );
};

export default Leave;
