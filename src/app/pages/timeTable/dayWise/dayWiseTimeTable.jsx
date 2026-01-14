import Table from "react-bootstrap/Table";
import styles from "./page.module.css";

function DayWiseTimeTable({ tableData }) {

  console.log("TableData", tableData)
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Teacher Name</th>
          <th>Total</th>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
            <th key={p}>P{p}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableData.map((item, idx) => {
          const periodMap = {};

          item.periods.forEach((p) => {
            periodMap[p.periodNumber] = p;
          });

          return (
            <tr key={idx}>
              <td>{item.teacherName}</td>
              <td>{item.periods.length}</td>

              {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => {
                const period = periodMap[p];

                return (
                  <td key={p}>
                    {period ? (
                      <div className={styles.rowItem}> 
                        <div>
                          <strong>
                            {period.className}-{period.section}
                          </strong>
                        </div>
                        <div>{period.subjectName || "-"}</div>
                      </div>
                    ) : (
                      <span className={styles.emptyCell}>—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default DayWiseTimeTable;
