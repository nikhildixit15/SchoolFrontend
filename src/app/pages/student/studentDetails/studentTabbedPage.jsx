import FeeSummary from "@/app/components/feeSummary/feeSummary";
import StudentAttendanceList from "@/app/components/studentAttendanceList/studentAttendanceList";
import StudentMessageList from "@/app/components/studentMessageList/studentMessageList";
import StudentProfileSummary from "@/app/components/studentProfileSummary/studentProfileSummary";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function StudentTabbedPage({student}) {
  const [key, setKey] = useState("summary");

  return (
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
        <StudentAttendanceList></StudentAttendanceList>
      </Tab>
      <Tab eventKey="message" title="Message">
        <StudentMessageList></StudentMessageList>
      </Tab>
      <Tab eventKey="fee" title="Fee">
        <FeeSummary></FeeSummary>
      </Tab>
    </Tabs>
  );
}

export default StudentTabbedPage;
