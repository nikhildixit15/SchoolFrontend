import Table from "react-bootstrap/Table";
import styles from "./page.module.css";

const periodKeys = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];

function ClassWiseTimeTable({ tableData }) {
  if (!Array.isArray(tableData) || tableData.length === 0) {
    return <p>No timetable found Here</p>;
  }

  return (
    <Table striped bordered hover className={styles.customTable}>
      <thead>
        <tr>
          <th>Day</th>
          {periodKeys.map((key) => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableData.map((row) => (
          <tr key={row.dayName}>
            <td>{row.dayName}</td>

            {periodKeys.map((key) => {
              const period = row.periods?.[key];

              return (
                <td key={key}>
                  <div className={styles.rowItem}>
                    <label>{period?.teacherName ?? "--"}</label>
                    <label>{period?.subjectName ?? "--"}</label>
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
