"use client";

import Table from "react-bootstrap/Table";
import styles from "./page.module.css";
import { useSelector } from "react-redux";

function DayWiseTimeTable({ tableData }) {
  const classList = useSelector((state) => state.class.classes);

  if (!tableData || tableData.length === 0) {
    return <p>No timetable available</p>;
  }

  // Find max period count
  const maxPeriod = Math.max(
    ...tableData.flatMap((d) =>
      d.periods.map((p) => p.periodNumber || 0)
    )
  );

  return (
    <div className={styles.card}>
      {tableData.map((dayData) => (
        <div key={dayData.day}>
          <h2>Day : {dayData.day}</h2>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
                {Array.from({ length: maxPeriod }).map((_, i) => (
                  <th key={i}>Period {i + 1}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {classList.map((cls) =>
                cls.sections.map((section) => (
                  <tr key={`${cls._id}-${section._id}`}>
                    <td>Class {cls.name}</td>
                    <td>{section.name}</td>

                    {Array.from({ length: maxPeriod }).map((_, i) => {
                      const period = dayData.periods.find(
                        (p) =>
                          p.className === cls.name &&
                          p.section === section.name &&
                          p.periodNumber === i + 1
                      );

                      return (
                        <td key={i}>
                          {period
                            ? `${period.subjectName} (${period.teacherName})`
                            : "-"}
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
