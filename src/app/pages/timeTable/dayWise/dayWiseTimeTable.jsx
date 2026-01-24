"use client";

import Table from "react-bootstrap/Table";
import styles from "./page.module.css";
import { useSelector } from "react-redux";

function DayWiseTimeTable({ tableData }) {
  const classList = useSelector((state) => state.class.classes);

  if (!Array.isArray(tableData) || tableData.length === 0) {
    return <p>No timetable available</p>;
  }

  const periodKeys = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];

  return (
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
  );
}

export default DayWiseTimeTable;
