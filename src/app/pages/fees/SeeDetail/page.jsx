"use client";

import { useState } from "react";
import styles from "./page.module.css";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import { getSeeDetail } from "@/app/services/fees/feeServices";
import FeeHistoryTable from "./feePaymentHistory";

export default function SeeDetails() {
  const [students, setStudents] = useState({
    studentName: "",
    studentId: "",
    studentUserId:""
  });
  const [detail, setDetail] = useState([]); 

  // ✅ when student selected from dropdown
  function handleSearchSelect(student) {
    setStudents({
      studentName: student.firstName ,
      studentId: student._id,
      studentUserId:student.userName
    });

    console.log("See Detail Student:", student);
  }

  // ✅ submit handler
 const handleSubmit = async () => {
  try { 

    const response = await getSeeDetail(students);
    console.log("Response",response)
      setDetail(response.data); // ✅ SAVE DATA
  } catch (error) {
    console.error("Submit fee error:", error);
    alert("Something went wrong");
  }  
};


  return (
    <main>
      {/* Student Search */}
      <div className={styles.container}>
      <div className={styles.searchContainer}>
        <label className={styles.label}>Student Name</label>
        <StudentSearch onSelect={handleSearchSelect} />
      </div>

      {/* Student ID */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Student ID</label>
        <input
          type="text"
          value={students.studentUserId}
          readOnly
          className={styles.input}
        />
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleSubmit}   // ✅ FIXED
        className={styles.button} 
      > 
      Get History
      </button> 
</div>
 <FeeHistoryTable data={detail} />;
    </main>
  );
}
