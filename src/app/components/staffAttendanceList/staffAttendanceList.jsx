import styles from "./staffAttendanceList.module.css";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { getStaffAttendanceById } from "@/app/services/attendance/attendance";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import MMSCalender from "../MMSCalender/MMSCalender";

export default function StaffAttendanceList({ staff }) {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    if (staff?.adminInfo?.userName) {
      fetchStaffAttendance({ userName: staff.adminInfo.userName });
    }
    // eslint-disable-next-line
  }, [staff]);

  async function fetchStaffAttendance({ userName }) {
    const result = await getStaffAttendanceById({ userName });
    setAttendanceList(result || []);
  }

  function demoList() {
    const currentMonth = new Date();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    console.log("monthStart", monthStart);
    console.log("monthEnd", monthEnd);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
  }

  return (
    <div className={styles.container}>
      <button className={styles.header} onClick={demoList}>
        Staff Attendance List
      </button>
      {attendanceList?.map((item, index) => {
        return <MMSCalender></MMSCalender>;
  })}
    </div>
  );
}