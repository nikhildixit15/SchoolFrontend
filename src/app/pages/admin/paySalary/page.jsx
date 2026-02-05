"use client";

import { useState } from "react";
import styles from "./page.module.css";
import toast from "react-hot-toast";
import StaffSearch from "@/app/components/staffSearch/page";
import {
  paySalary,
  getStaffSalarySingle,
} from "@/app/services/admin/adminService";
import SalaryHistoryPage from "@/app/components/staffAllowanceHistory/allowances";
import { monthList } from "@/app/utils/constants";

export default function ManageSalaryPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [salaryData, setSalaryData] = useState(null);

  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [paymentMode, setPaymentMode] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSelectStaff = async (staff) => {
    setSelectedStaff(staff);
    try {
      const res = await getStaffSalarySingle({
        staffId: staff._id,
        month,
        year,
      });

      setSalaryData(res.data.data);
    } catch {
      toast.error("Salary record not found");
      setSalaryData(null);
    }
  };

  const handlePay = async () => {
    if (!selectedStaff) return toast.error("Select staff");

    try {
      await paySalary({
        staffId: selectedStaff._id,
        month,
        year,
        paymentStatus,
        paymentMode,
        remarks,
      });

      toast.success("Salary paid successfully");
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manage Salary</h2>

      {/* Month Year */}
      <div className={styles.row}>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {monthList.map((item) => (
            <option key={item.monthCount} value={item.monthCount + 1}>
              {item.monthName}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(+e.target.value)}>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>
      </div>
      <StaffSearch onSelect={handleSelectStaff} />

      {selectedStaff && (
        <div className={styles.staffCard}>
          <strong>{selectedStaff.name}</strong>
          <span>ID: {selectedStaff.employeeId}</span>
        </div>
      )}

      {/* Salary Summary */}
      {salaryData && (
        <div className={styles.salaryCard}>
          <div className={styles.field}>
            <label>Basic Salary</label>
            <input value={salaryData.salary.basic} disabled />
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Total Allowance</label>
              <input value={salaryData.totalAllowance} disabled />
            </div>

            <div className={styles.field}>
              <label>Total Bonus</label>
              <input value={salaryData.totalBonus} disabled />
            </div>

            <div className={styles.field}>
              <label>Total Deduction</label>
              <input value={salaryData.totalDeduction} disabled />
            </div>

            <div className={styles.field}>
              <label>Total Salary</label>
              <input value={salaryData.totalSalary} disabled />
            </div>
          </div>
        </div>
      )}

      {/* Payment Section */}
      {salaryData && (
        <div className={styles.paymentCard}>
          <div className={styles.field}>
            <label>Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="hold">Hold</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="">Select</option>
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Remarks</label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <button className={styles.payBtn} onClick={handlePay}>
            Pay Salary
          </button>
        </div>
      )}
      <SalaryHistoryPage salaryData={salaryData} />
    </div>
  );
}
