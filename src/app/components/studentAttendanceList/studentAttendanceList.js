import styles from "./studentAttendanceList.module.css";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { getStudentAttendanceById } from "@/app/services/attendance/attendance";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import MMSCalender from "../MMSCalender/MMSCalender";

function StudentAttendanceList({ userName }) {
  const [messageList, setMessageList] = useState();
  useEffect(() => {
    getStudentAttendanceList({ userName });
  }, []);

  async function getStudentAttendanceList(data) {
    const result = await getStudentAttendanceById({
      userName: "userName",
    });

    setMessageList(result);
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
        Student Attendance List
      </button>
      {messageList?.map((item, index) => {
        return <MMSCalender></MMSCalender>;
      })}
    </div>
  );
}

export default StudentAttendanceList;
