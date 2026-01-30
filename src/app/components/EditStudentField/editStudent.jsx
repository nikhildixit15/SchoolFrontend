import React from "react";
import styles from "./page.module.css"

export default function Field({ label, value, isEdit, onChange, type = "text" }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      {isEdit ? (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
      ) : (
        <span className={styles.value}>{value || "-"}</span>
      )}
    </div>
  );
}