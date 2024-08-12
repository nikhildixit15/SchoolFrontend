import Table from "react-bootstrap/Table";
import styles from "./page.module.css";

function ClassWiseTimeTable({ tableData }) {
  console.log("students", tableData);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Day Name</th>
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
            <td>{item.dayName}</td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p1?.teacherName}</label>
                <label>{item.periods.p1?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p2?.teacherName}</label>
                <label>{item.periods.p2?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p3?.teacherName}</label>
                <label>{item.periods.p3?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p4?.teacherName}</label>
                <label>{item.periods.p4?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p5?.teacherName}</label>
                <label>{item.periods.p5?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p6?.teacherName}</label>
                <label>{item.periods.p6?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p7?.teacherName}</label>
                <label>{item.periods.p7?.subject}</label>
              </div>
            </td>
            <td>
              <div className={styles.rowItem}>
                <label>{item.periods.p8?.teacherName}</label>
                <label>{item.periods.p8?.subject}</label>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClassWiseTimeTable;
