"use client";

import styles from "./page.module.css";

export default function StaffDropdown({ results, onSelect }) {
  if (!results || results.length === 0) return null;
  console.log("Stadd", results);
  return (
    <div className={styles.dropdown}>
      <ul>
        {results.map((s) => {
          return (
            <li
              key={s._id}
              onMouseDown={() => onSelect(s)} // ✅ prevents blur issue
              className={styles.item}
            >
              <strong>
                {s.firstName} {s.lastName}
              </strong>{" "}
              {"  "}
              <strong>({s.employeeId})</strong> {"  "}
              <strong>
                Stream: <small>{s.stream}</small>
              </strong>
              {"  "}
              <div className={styles.subText}>
                <strong>
                  Dept:<small> {s.department}</small>
                </strong>{" "}
                {"  "}
                <strong>
                  Designation:<small> {s.designation}</small>
                </strong>{" "}
                {"  "}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
