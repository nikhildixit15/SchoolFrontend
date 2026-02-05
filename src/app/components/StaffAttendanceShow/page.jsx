"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { monthList, daysList, attendanceStatus } from "@/app/utils/constants";
import { getStaffAttendanceById } from "@/app/services/staff/staffService";

const StaffAttendanceCalendar = ({ staffId }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(2026); // default year
  const [attendanceData, setAttendanceData] = useState({});
  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    leave: 0,
  });

  const yearOptions = [2026, 2027];
  console.log("Attfergf351yug", staffId);
  useEffect(() => {
    if (!staffId) return;
    fetchAttendance();
  }, [staffId, selectedMonth, year]);

  async function fetchAttendance() {
    try {
      const res = await getStaffAttendanceById({
        staffId,
        month: selectedMonth + 1,
        year,
      });

      const { attendance = [], summary = {} } = res.data;

      const formatted = {};

      attendance.forEach((item) => {
        const dateKey = item.date.includes("T")
          ? item.date.split("T")[0]
          : item.date;

        const status = item.status?.toLowerCase();

        formatted[dateKey] =
          status === "present"
            ? attendanceStatus.present
            : status === "absent"
              ? attendanceStatus.absent
              : status === "leave"
                ? attendanceStatus.leave
                : attendanceStatus.holiday;
      });

      setAttendanceData(formatted);
      setSummary(summary); // ✅ NEW
    } catch (err) {
      console.error("Attendance fetch error", err);
    }
  }

  const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
  const firstDay = new Date(year, selectedMonth, 1).getDay();

  const getStatus = (day) => {
    const dateKey = `${year}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return attendanceData[dateKey];
  };

  return (
    <div className={styles.container}>
      <div className={styles.summaryRow}>
        <div className={`${styles.summaryCard} ${styles.present}`}>
          <span>Present</span>
          <strong>{summary.present}</strong>
        </div>

        <div className={`${styles.summaryCard} ${styles.absent}`}>
          <span>Absent</span>
          <strong>{summary.absent}</strong>
        </div>

        <div className={`${styles.summaryCard} ${styles.leave}`}>
          <span>Leave</span>
          <strong>{summary.leave}</strong>
        </div>
      </div>

      <h3>Attendance</h3>

      {/* 🔹 Month & Year Select */}
      <div className={styles.filterRow}>
        <select
          className={styles.select}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {monthList.map((m) => (
            <option key={m.monthCount} value={m.monthCount}>
              {m.monthName}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Calendar */}
      <div className={styles.calendar}>
        {daysList.map((day) => (
          <div key={day.dayCount} className={styles.dayHeader}>
            {day.dayName.slice(0, 3)}
          </div>
        ))}

        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const status = getStatus(day);

          return (
            <div key={day} className={styles.dayCell}>
              <span className={styles.date}>{day}</span>

              {status && (
                <span
                  className={`${styles.status} ${
                    status === attendanceStatus.present
                      ? styles.present
                      : styles.absent
                  }`}
                >
                  {status}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaffAttendanceCalendar;
