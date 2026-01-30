 import FeeSummary from "@/app/components/feeSummary/page";
import StudentMessageList from "@/app/components/studentMessageList/studentMessageList";
import StudentProfileSummary from "../studentProfileSummary/studentProfileSummary"; 
import AttendanceCalendar from "../studentAttendanceShow/studentAttendanceShow"; 
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./page.module.css";

function StudentTabbedPage({student, studentId}) {
  const [key, setKey] = useState("summary");
console.log("Tab",studentId, student)
  return (
        <div className={styles.tabsContainer}>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="summary" title="Summary">
        <StudentProfileSummary student={student}></StudentProfileSummary>
      </Tab>
      <Tab eventKey="attendance" title="Attendance">
        <AttendanceCalendar studentId={studentId}></AttendanceCalendar>
      </Tab>
      {/* <Tab eventKey="message" title="Message">
        <StudentMessageList></StudentMessageList>
      </Tab> */}
      <Tab eventKey="fee" title="Fee">
        <FeeSummary studentId={studentId} />
      </Tab>
    </Tabs>
    </div>
  );
}

export default StudentTabbedPage;
