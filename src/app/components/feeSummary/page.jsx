"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getStudentFeeDetail, getStudentFeePaymentHistory } from "@/app/services/fees/feeServices"; 
import FeeHistoryTable from "../paymentHistoryTable/paymentHistoryTable"; 

const FeeSummary = ({ studentId }) => {
  const [fee, setFee] = useState({});
  const [feePayment, setFeePayment] = useState([]);

  useEffect(() => {
    if (!studentId) return;
    fetchFeeDetail();
  }, [studentId]);

  async function fetchFeeDetail() {
    try {
      const fees = await getStudentFeeDetail(studentId);
      const payments = await getStudentFeePaymentHistory(studentId) 
      setFee(fees.data);
      setFeePayment(payments.data)
      console.log("Hello",payments)
      console.log("Hello",feePayment)
    } catch (error) {
      console.error("Fee fetch error", error);
    }
  }
 
  return (
    <>
    <div className={styles.container}>
      <div className={styles.card}>
      <h3 className={styles.title}>Fee Status</h3>

      <div className={styles.row}>
        <span className={styles.label}>Due Amount</span>
        <span className={styles.value}>
          ₹ {fee.dueAmount}
        </span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Advance Amount</span>
        <span className={styles.value}>
          ₹ {fee.advanceAmount }
        </span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Due Date</span>
        <span className={styles.value}>
          {fee.dueDate}
        </span>
      </div>

        <div className={styles.row}>
          <span className={styles.label}>Payment Status</span>
          <span
            className={`${styles.value} ${
              fee.paymentStatus === "Paid"
                ? styles.paid
                : fee.paymentStatus === "Partially Paid"
                ? styles.partial
                : styles.unpaid
            }`}
          >
            {fee.paymentStatus}
          </span>
        </div>
      </div>
    </div> 
       <FeeHistoryTable data={feePayment} />
       </>
  );
};

export default FeeSummary;
