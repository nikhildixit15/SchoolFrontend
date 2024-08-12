import Table from "react-bootstrap/Table";
import styles from "./page.module.css";

function DayWiseTimeTable({ tableData }) {
  console.log("students", tableData);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Teacher Name</th>
          <th>Total</th>
          <th>P1</th>
          <th>P2</th>
          <th>P3</th>
          <th>P4</th>
          <th>P5</th>
          <th>P6</th>
          <th>P7</th>
          <th>P8</th>
        </tr>
      </thead>

      <tbody>
        {tableData?.map((item) => (
          <tr>
            <td>{item.teacherName}</td>
            <td>{Object.keys(item.periods).length}</td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p1?.className}</label>
                <label>{item.periods.p1?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p2?.className}</label>
                <label>{item.periods.p2?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p3?.className}</label>
                <label>{item.periods.p3?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p4?.className}</label>
                <label>{item.periods.p4?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p5?.className}</label>
                <label>{item.periods.p5?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p6?.className}</label>
                <label>{item.periods.p6?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p7?.className}</label>
                <label>{item.periods.p7?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p8?.className}</label>
                <label>{item.periods.p8?.subject}</label>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DayWiseTimeTable;
