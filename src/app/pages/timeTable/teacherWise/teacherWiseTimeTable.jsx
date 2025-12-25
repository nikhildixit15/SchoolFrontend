"use client";

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
  );
}
