"use client";

import { useState } from "react";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import StaffSearch from "@/app/components/staffSearch/page";
import styles from "./page.module.css";
import toast from "react-hot-toast";

import { studentDelete, staffDelete } from "@/app/services/admin/adminService";

import ShowStudent from "./showStudent"; 
import ShowStaff from "./showStaff";

export default function DeletePage() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== Student Delete ===== */
  const handleStudentDelete = async () => {
    if (!selectedStudent?._id) return;

    try {
      setLoading(true);
      const res = await studentDelete(selectedStudent._id);

      if (res?.data?.success) {
        toast.success("Student deleted successfully");
        setSelectedStudent(null);
      } else {
        toast.error("Student delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete student");
    } finally {
      setLoading(false);
    }
  };

  /* ===== Staff Delete ===== */
  const handleStaffDelete = async () => {
    if (!selectedStaff?._id) return;
 
    try {
      setLoading(true);
      const res = await staffDelete(selectedStaff._id);
 
      if (res?.data?.success) {
        toast.success("Staff deleted successfully");
        setSelectedStaff(null);
      } else {
        toast.error("Staff delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      {/* ===== DELETE STUDENT ===== */}
      <h2 className={styles.title}>Delete Student</h2>

      <StudentSearch onSelect={setSelectedStudent} />

      {selectedStudent && (
        <ShowStudent
          studentData={selectedStudent}
          onDelete={handleStudentDelete}
          loading={loading}
        />
      )}

      <hr className={styles.divider} />

      {/* ===== DELETE STAFF ===== */}
      <h2 className={styles.title}>Delete Staff</h2>

      <StaffSearch onSelect={setSelectedStaff} />

      {selectedStaff && (
        <ShowStaff
          staffData={selectedStaff}
          onDelete={handleStaffDelete}
          loading={loading}
        />
      )}

    </div>
  );
}
