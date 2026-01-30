"use client";
import React from "react";
import styles from "./page.module.css";

const FeeHistoryTable = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Fee History</h3>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Fee Type</th>
              <th>Paid Amount</th>
              <th>Payment Method</th>
              <th>Remarks</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.noData}>
                  No fee records found
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const isPaid = item.paidAmount > 0;

                return (
                  <tr key={item._id}>
                    <td data-label="Due Date">
                      {new Date(item.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td data-label="Fee Type">{item.feeType}</td>

                    <td data-label="Paid Amount">
                      ₹ {item.paidAmount.toLocaleString("en-IN")}
                    </td>


                    <td data-label="Method">
                      {item.method || "—"}
                    </td>

                    <td data-label="Remarks">
                      {item.remarks || "—"}
                    </td>

                    <td data-label="Due Date">
                      {new Date(item.dueDate).toLocaleDateString("en-IN")}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`${styles.status} ${
                          isPaid ? styles.paid : styles.pending
                        }`}
                      >
                        {isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeHistoryTable;
