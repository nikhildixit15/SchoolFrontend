"use client";

import styles from "./studentDropdown.module.css";

export default function StudentDropdown({ results, onSelect }) {
  if (!results || results.length === 0) return null;

  return (
    <div className={styles.dropdown}>
      <ul>
        {results.map((s) => (
          <li
            key={s._id}
            onMouseDown={() => onSelect(s)} // ✅ FIXED
          >
            <strong>
              {s.firstName} {s.lastName} <small> Class: {s.className}</small>
            </strong>
            <br />
            <strong>
              ({s.userName})  <small>Father: {s.fatherName}</small>
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
