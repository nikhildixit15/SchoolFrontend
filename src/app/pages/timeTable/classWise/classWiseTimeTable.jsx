import Table from "react-bootstrap/Table";
import styles from "./page.module.css";

function ClassWiseTimeTable({ tableData }) {
  if (!Array.isArray(tableData) || tableData.length === 0) {
    return <p>No timetable found.</p>;
  }

  // Dynamically get period keys (p1, p2, p3...)
  const periodKeys = Object.keys(tableData[0].periods);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Day</th>

          {periodKeys.map((key) => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.dayName}</td>

            {periodKeys.map((key, idx) => {
              const period = row.periods[key];
              return (
                <td key={idx}>
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
