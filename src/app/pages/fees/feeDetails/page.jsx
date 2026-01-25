"use client";

import { useState } from "react";
import styles from "./page.module.css";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import { getStudentAmount } from "@/app/services/fees/feeServices"; // ✅ import
import StudentPaymentStatus from "./paymentStatus";

export default function FeeDetails() {
  const [students, setStudents] = useState({
    studentName: "",
    studentId: "",
    studentUserId:""
  });
  const [paymentData, setPaymentData] = useState(null);


  const [loading, setLoading] = useState(false);

  // ✅ when student selected from dropdown
  function handleSearchSelect(student) {
    setStudents({
      studentName: student.firstName ,
      studentId: student._id,
      studentUserId:student.userName
    });

    console.log("Fee Detail Student:", student);
  }

  // ✅ submit handler
 const handleSubmit = async () => {
  if (!students.studentId) {
    alert("Please select a student");
    return;
  }

  try {
    setLoading(true);

    const response = await getStudentAmount(students);

    if (response?.data?.success) {
      setPaymentData(response.data); // ✅ SAVE DATA
    }
  } catch (error) {
    console.error("Submit fee error:", error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
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
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Data"}
      </button>
      {paymentData && <StudentPaymentStatus data={paymentData} />}
</div>
    </main>
  );
}
