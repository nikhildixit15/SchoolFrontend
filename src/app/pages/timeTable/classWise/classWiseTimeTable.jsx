import Table from "react-bootstrap/Table";
import styles from "./page.module.css";

function ClassWiseTimeTable({ tableData }) {
  if (!Array.isArray(tableData) || tableData.length === 0) {
    return <p>No timetable found Here</p>;
  }

  // ✅ Get UNIQUE period keys from all rows
  const periodKeys = Array.from(
    new Set(
      tableData.flatMap(row => Object.keys(row.periods || {}))
    )
  ).sort(); // optional: p1, p2, p3 order

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Day</th>
          {periodKeys.map(key => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableData.map(row => (
          <tr key={row.dayName}>
            <td>{row.dayName}</td>

            {periodKeys.map(key => {
              const period = row.periods?.[key];

              return (
                <td key={key}>
                  <div className={styles.rowItem}>
                    <label>{period?.teacherName || "-"}</label>
                    <label>{period?.subjectName || "-"}</label>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClassWiseTimeTable;
