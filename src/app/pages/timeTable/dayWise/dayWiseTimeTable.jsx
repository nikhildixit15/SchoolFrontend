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
            <td>{item.periods.length}</td>
            {item.periods.map ((period) => (
            <td>
              <div className={styles.rowItem}>
                <label>{period.className}</label>
                <label>{period.subjectName}</label>
              </div>
            </td>
            ))}
    
          </tr>

        ))}
      </tbody>
    </Table>
  );
}

export default DayWiseTimeTable;
