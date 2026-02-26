"use client";

import Table from "react-bootstrap/Table";
import styles from "./page.module.css";
import { useSelector } from "react-redux";

function DayWiseTimeTable({ tableData }) {
<<<<<<< HEAD
=======
  const classList = useSelector((state) => state.class.classes);

  if (!Array.isArray(tableData) || tableData.length === 0) {
    return <p>No timetable available</p>;
  }

  const periodKeys = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
>>>>>>> Nikhil/timeTable

  console.log("TableData", tableData)
  return (
<<<<<<< HEAD
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
=======
    <div className={styles.card}>
      {tableData.map((dayData) => (
        <div key={dayData.day}>
          <h2>Day : {dayData.day}</h2>

          <Table striped bordered hover className={styles.tableFixed}>
            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
                {periodKeys.map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {classList.map((cls) =>
                cls.sections.map((section) => (
                  <tr key={`${cls._id}-${section._id}`}>
                    <td>Class {cls.name}</td>
                    <td>{section.name}</td>

                    {periodKeys.map((_, i) => {
                      const period = dayData.periods?.find(
                        (p) =>
                          p.className === cls.name &&
                          p.section === section.name &&
                          p.periodNumber === i + 1
                      );

                      return (
                        <td key={i}>
                          <div className={styles.rowItem}>
                            <span>{period?.subjectName ?? "-"}</span>
                            <span>{period?.teacherName ?? "-"}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
>>>>>>> Nikhil/timeTable
  );
}

export default DayWiseTimeTable;
