import { useEffect, useState } from "react";
import AttendanceTable from "./attendanceTable";
import { getHolidays } from "@/app/services/attendance/attendance";

/* -------------------- UTILS -------------------- */

const getDaysInMonth = (dateStr) => {
  const date = new Date(dateStr);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getDayFromDate = (dateStr) => {
  if (!dateStr) return null;
  return Number(dateStr.split("-")[2]);
};

/* -------------------- COMPONENT -------------------- */

function AttendanceRegisterTable({ students, month }) {
  const attendanceRecords = students?.data || [];
  if (!month) return null;

  const monthDate = new Date(month);
  if (isNaN(monthDate.getTime())) return null;

  const year = monthDate.getFullYear();
  const monthIndex0 = monthDate.getMonth();     // ✅ 0–11 (JS Date)
  const monthIndex1 = monthIndex0 + 1;          // ✅ 1–12 (API)

  const totalDays = getDaysInMonth(month);
  const dateList = Array.from({ length: totalDays }, (_, i) => i + 1);

  /* 🔥 HOLIDAY STATE */
  const [holidays, setHolidays] = useState([]);

  /* 🔥 FETCH HOLIDAYS */
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await getHolidays({
          month: monthIndex1,
          year,
        });

        if (res?.data?.success) {
          setHolidays(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch holidays", err);
      }
    };

    fetchHolidays();
  }, [monthIndex1, year]);

  /* -------- Group attendance by student -------- */

  const groupedStudents = attendanceRecords.reduce((map, item) => {
    if (!map[item.studentId]) {
      map[item.studentId] = {
        studentId: item.studentId,
        name: item.name,
        className: item.className,
        section: item.section,
        fatherName: item.fatherName,
        days: {},
      };
    }

    const day = getDayFromDate(item.attendanceDate);
    if (day) {
      map[item.studentId].days[day] = item.status;
    }

    return map;
  }, {});

  return (
    <AttendanceTable
      studentList={Object.values(groupedStudents)}
      dateList={dateList}
      year={year}
      monthIndex={monthIndex0}   // ✅ 0-based for Date()
      totalDays={totalDays}
      holidays={holidays}
    />
  );
}

export default AttendanceRegisterTable;
