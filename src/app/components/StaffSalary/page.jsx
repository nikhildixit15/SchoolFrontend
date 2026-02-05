"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
 import { monthList } from "@/app/utils/constants";
import SalaryHistoryPage from "../staffAllowanceHistory/allowances";
import { getStaffSalarySingle } from "@/app/services/admin/adminService";

export default function StaffSalaryPage({ staffId }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [salary, setSalary] = useState(null);

  useEffect(() => {
    if (!staffId) return;
    fetchSalary();
  }, [staffId, month, year]);

  const fetchSalary = async () => {
    try {
      const res = await getStaffSalarySingle({
        staffId,
        month,
        year,
      });
      setSalary(res.data.data);
      console.log("jdv",res.data.data)
    } catch (error) {
       console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Salary Details</h3>

      {/* Filters */}
      <div className={styles.filterRow}>
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
      </div>
 
      <SalaryHistoryPage salaryData={salary}/>
    </div>
  );
}
