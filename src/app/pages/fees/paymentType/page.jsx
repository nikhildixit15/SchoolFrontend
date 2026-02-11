"use client";

import { useState } from "react";
import styles from "./page.module.css";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import { submitFeeByAdmin } from "@/app/services/fees/feeServices";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function FeePaymentForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentAdminId: "",
    studentId: "",
    feeType: "",
    feeAmount: "0",
    paymentMethod: "",
    paymentDate: "",
    notes: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const { staffId } = useSelector((state) => state.auth);

  console.log("FormData", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleStudentSelect(student) {
    console.log("Stgujfe",student)
    setFormData((prev) => ({
      ...prev,
      studentAdminId: student.userName,
      studentId: student._id, // ✅ FIXED
      studentName: `${student.firstName} ${student.lastName}`,
    }));
  }

  const handleSubmit = async () => {
    const amount = Number(formData.feeAmount);
    if (!formData.studentId) {
      toast.error("Please select a student");
      return;
    }
    if (!formData.feeType) {
      toast.error("Please select fee type");
      return;
    }
    if (!amount || amount <= 0) {
      toast.error("Fee amount must be greater than 0");
      return;
    }

    if (!formData.paymentMethod) {
      toast.error("Please select payment method");
      return;
    }
    if (!formData.paymentDate) {
      toast.error("Please select payment date");
      return;
    }

    try {
      const response = await submitFeeByAdmin({
        ...formData,
        recipientId: staffId,
      });
      if (response.data?.success) {
        toast.success(response.data.message);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Submit fee error:", error);
      toast.error("Failed to submit fee");
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Enter Fee Payment</h1>
          <p className={styles.pageSubtitle}>
            Manually record a new student fee payment.
          </p>
        </div>

        {/* Form */}
        <div className={styles.formContainer}>
          {/* Student Search */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Student Name</label>
            <StudentSearch onSelect={handleStudentSelect} />
          </div>

          {/* Student ID */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Student ID</label>
            <input
              type="text"
              value={formData.studentAdminId}
              readOnly
              className={styles.input}
            />
          </div>

          {/* Fee Type & Amount */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fee Type</label>
              <select
                name="feeType"
                value={formData.feeType}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="" disabled hidden>
                  Fee Type
                </option>
                <option value="Tuition">Tuition Fee</option>
                <option value="Library">Library Fee</option>
                <option value="Exam">Examination Fee</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Fee Amount</label>
              <input
                type="number"
                name="feeAmount"
                value={formData.feeAmount}
                onChange={handleChange}
                min="0"
                className={styles.input}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className={styles.select}
              placeholder="kjnf"
            >
              <option value="" disabled hidden>
                Payment method
              </option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="online">Online</option>
            </select>
          </div>

          {/* Payment Date */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {/* Notes */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className={styles.textarea}
            />
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} className={styles.submitBtn}>
            Submit Payment
          </button>
        </div>
      </main>

      {/* Success Popup */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>✅ Payment Successful</h2>
            <p>
              <b>Name:</b> {formData.studentName}
            </p>
            <p>
              <b>Student ID:</b> {formData.studentAdminId}
            </p>
            <p>
              <b>Date:</b> {formData.paymentDate}
            </p>
            <p>
              <b>Method:</b> {formData.paymentMethod}
            </p>
            <p>
              <b>Amount:</b> ₹{formData.feeAmount}
            </p>

            <button
              onClick={() => {
                setShowPopup(false);
                setFormData((prev) => ({
                  ...prev,
                  feeAmount: "",
                  feeType: "",
                  paymentMethod: "",
                  paymentDate: "",
                  notes: "",
                }));
              }}
              className={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
