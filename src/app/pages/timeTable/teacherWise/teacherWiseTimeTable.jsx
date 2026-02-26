"use client";

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> develop
import { useState } from "react";
import style from "./page.module.css";

export default function TeacherWiseTimeTable({ tableData }) {
  const [openDay, setOpenDay] = useState(null);

  if (!Array.isArray(tableData) || tableData.length === 0) {
    return <p>No schedule found</p>;
  }

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // ===== Group data by day =====
  const groupedByDay = dayOrder.reduce((acc, day) => {
    acc[day] = tableData
      .filter((item) => item.day === day)
      .sort(
        (a, b) => (a.periodNumber || 0) - (b.periodNumber || 0)
      );
    return acc;
  }, {});

  const toggleDay = (day) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <div className={style.dayWrapper}>
      {dayOrder.map(
        (day) =>
          groupedByDay[day].length > 0 && (
            <div key={day} className={style.dayCard}>
              {/* Day Header */}
              <div 
                onClick={() => toggleDay(day)}  
              >
                <h3>{day}</h3> 
              </div>

              {/* Dropdown Content */}
              {openDay === day && (
                <table className={style.table}>
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Period</th>
                      <th>Subject</th>
                    </tr>
                  </thead>

                  <tbody>
                    {groupedByDay[day].map((item, idx) => (
                      <tr key={`${day}-${item.periodNumber}-${idx}`}>
                        <td>{item.className}</td>
                        <td>{item.section}</td>
                        <td>Period {item.periodNumber}</td>
                        <td>{item.subjectName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )
      )}
    </div>
<<<<<<< HEAD
>>>>>>> Nikhil/timeTable
=======
>>>>>>> develop
  );
}
