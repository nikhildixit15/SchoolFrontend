"use client";
import styles from "./page.module.css";

export default function StudentTable({
  students = [],
  selected = {},
  selectAll = false,
  onToggleStudent,
  onToggleSelectAll,
}) {
  if (!Array.isArray(students) || students.length === 0) {
    return (
      <p className={styles.noData}>No students found</p>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Students</h3>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) =>
                    onToggleSelectAll(e.target.checked)
                  }
                />
              </th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Father Name</th>
              <th>Class</th>
              <th>Section</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => {
              const fullName = `${s.firstName || ""} ${s.lastName || ""}`.trim();

              return (
                <tr key={s._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={Boolean(selected[s._id])}
                      onChange={() => onToggleStudent(s._id)}
                    />
                  </td>

                  <td className={styles.id}>
                    {s.userName || s._id}
                  </td>

                  <td className={styles.name}>
                    {s.name || fullName || "—"}
                  </td>

                  <td className={styles.father}>
                    {s.fatherName || "—"}
                  </td>

                  <td>{s.className || "—"}</td>
                  <td>{s.section || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
