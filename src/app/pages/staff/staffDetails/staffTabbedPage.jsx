import StaffAttendanceList from "@/app/components/staffAttendanceList/staffAttendanceList";
import StaffMessageList from "@/app/components/staffMessageList/staffMessageList";
import StaffProfileSummary from "@/app/components/staffProfileSummary/staffProfileSummary";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function StaffTabbedPage({ staff }) {
  const [key, setKey] = useState("summary");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="summary" title="Summary">
        <StaffProfileSummary staff={staff} />
      </Tab>
      <Tab eventKey="attendance" title="Attendance">
        <StaffAttendanceList></StaffAttendanceList>
        {/* <StaffAttendanceList staff={staff} /> */}
      </Tab>
      <Tab eventKey="message" title="Message">
        <StaffMessageList staff={staff} />
      </Tab>
      <Tab eventKey="Salary" title="Salary">
        {/* Placeholder for Salary tab content */}
        <div className="p-3">Salary details will be available soon.</div>
      </Tab>
    </Tabs>
  );
}

export default StaffTabbedPage;