import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function StudentTabbedPage() {
  const [key, setKey] = useState("summary");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="summary" title="Summary">
        Tab content for Summary
      </Tab>
      <Tab eventKey="attendance" title="Attendance">
        Tab content for Attendance
      </Tab>
      <Tab eventKey="message" title="Message">
        Tab content for Message
      </Tab>
    </Tabs>
  );
}

export default StudentTabbedPage;
