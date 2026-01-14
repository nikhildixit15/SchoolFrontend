"use client";

import styles from "./feePaymentFistory.module.css";

export default function FeeHistoryTable({ data = [] }) {
  if (!data.length) {
    return (
      <p className={styles.emptyText}>
        No fee payment history available.
      </p>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Payment Date</th>
            <th>Fee Type</th>
            <th>Paid Amount</th>
            <th>Due Date</th>
            <th>Method</th>
            <th>Transaction ID</th>
            <th>Remarks</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.paymentDate || "-"}</td>
              <td>{item.feeType}</td>
              <td className={styles.amount}>₹{item.paidAmount}</td>
              <td>{new Date(item.dueDate).toLocaleDateString()}</td>
              <td>{item.method || "-"}</td>
              <td>{item.transactionId || "-"}</td>
              <td>{item.remarks || "-"}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
