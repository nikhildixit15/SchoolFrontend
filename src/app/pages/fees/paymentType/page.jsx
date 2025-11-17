'use client';

import { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import styles from "./page.module.css";

export default function FeePaymentForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    feeType: '',
    feeAmount: '0.00',
    paymentMethod: '',
    paymentDate: '',
    notes: ''
  });
    const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    console.log('Form submitted:', formData); 
    setShowPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className={styles.container}>
        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Enter Fee Payment</h1>
            <p className={styles.pageSubtitle}>Manually record a new student fee payment.</p>
          </div>

          <div className={styles.formContainer}>
            {/* Student Search */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Student Name</label>
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter Student Name"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Student ID */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter Student ID"
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
                  <option value="">Select fee type...</option>
                  <option value="tuition">Tuition Fee</option>
                  <option value="library">Library Fee</option>
                  <option value="exam">Examination Fee</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Fee Amount</label>
                <div className={styles.amountWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    type="number"
                    name="feeAmount"
                    value={formData.feeAmount}
                    onChange={handleChange}
                    step="1"
                    min="0"
                    className={`${styles.input} ${styles.amountInput}`}
                  />
                </div>
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
              >
                <option value="">Select payment method...</option>
                <option value="cash">Cash</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="cheque">Cheque</option>
                <option value="online">Online Payment</option>
              </select>
            </div>

            {/* Payment Date */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Date of Payment</label>
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
                placeholder="Add any relevant notes..."
                rows="4"
                className={styles.textarea}
              />
            </div>

            {/* Submit */}
            <div className={styles.submitWrapper}>
              <button onClick={handleSubmit} className={styles.submitBtn}>
                Submit Payment
              </button>
            </div>
          </div>
        </main>

        {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>✅ Payment Successful!</h2>
            <p>Name: {formData.studentName}</p>
            <p>Student ID: {formData.studentId}</p>
            <p>Payment Date: ${formData.paymentDate}</p>
            <p>Payment Method: ${formData.paymentMethod}</p>
            <p>Amount: ${formData.feeAmount}</p>
            <button onClick={() => setShowPopup(false)} className={styles.closeBtn}>Close</button>
            <button className={styles.closeBtn}>Generate Reciept</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
