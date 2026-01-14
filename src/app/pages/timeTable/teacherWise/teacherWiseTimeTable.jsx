import Table from "react-bootstrap/Table";
import styles from "./page.module.css";

const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function TeacherDayWiseTable({ data }) {
 
  if (  data.length === 0) {
    return <p className={styles.noData}>No timetable found</p>;
  }

  return (
    <>
      {data.map((dayItem, index) => {

        // 🔹 Group periods by periodNumber
        const periodMap = {};
        dayItem.periods.forEach(p => {
          if (!periodMap[p.periodNumber]) {
            periodMap[p.periodNumber] = [];
          }
          periodMap[p.periodNumber].push(p);
        });

        return (
          <div key={index} className={styles.dayContainer}>
            <h4 className={styles.dayHeading}>{dayItem.day}</h4>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  {PERIODS.map(p => (
                    <th key={p}>P{p}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  {PERIODS.map(p => (
                    <td key={p}>
                      {periodMap[p] ? (
                        periodMap[p].map((item, i) => (
                          <div key={i} className={styles.cell}>
                            <div className={styles.classText}>
                              {item.className}-{item.section}
                            </div>
                            <div className={styles.subjectText}>
                              {item.subjectName || "—"}
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className={styles.empty}>—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        );
      })}
    </>
  );
}
