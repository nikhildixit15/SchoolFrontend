"use client";

import styles from "./allowances.module.css";

export default function SalaryHistoryPage({ salaryData }) {
  if (!salaryData || !salaryData.salary) return null;
  
   const renderTable = (rows) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan="3" className={styles.empty}>
              No records
            </td>
          </tr>
        ) : (
          rows.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.title}</td>
              <td>{item.amount}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      {/* Basic */}
      <div className={styles.basicCard}>
        <span>Basic Salary</span>
        <strong>₹ {salaryData.salary.basic}</strong>
      </div>

      {/* Allowance */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Allowances</h3>
          <span>Total: ₹ {salaryData.totalAllowance}</span>
        </div>
        {renderTable(salaryData.salary.allowance)}
      </div>

      {/* Bonus */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Bonus</h3>
          <span>Total: ₹ {salaryData.totalBonus}</span>
        </div>
        {renderTable(salaryData.salary.bonus)}
      </div>

      {/* Deduction */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Deduction</h3>
          <span>Total: ₹ {salaryData.totalDeduction}</span>
        </div>
        {renderTable(salaryData.salary.deduction)}
      </div>

      {/* Net Salary */}
      <div className={styles.netSalary}>
        Net Salary: ₹ {salaryData.totalSalary}
      </div>
    </div>
  );
}
