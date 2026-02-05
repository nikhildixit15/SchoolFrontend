"use client";
import styles from "./page.module.css";

export default function SalaryRow({ title, data, setData }) {
  return (
    <div className={styles.row}>
      <label>{title}</label>

      <input
        type="text"
        placeholder="Description"
        value={data.title}
        onChange={(e) =>
          setData({ ...data, title: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Amount"
        value={data.amount}
        onChange={(e) =>
          setData({ ...data, amount: e.target.value })
        }
      />
    </div>
  );
}
