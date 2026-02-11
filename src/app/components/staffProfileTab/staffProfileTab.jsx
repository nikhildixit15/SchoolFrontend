import StaffAttendanceList from "@/app/components/staffAttendanceList/staffAttendanceList";
import StaffMessageList from "@/app/components/staffMessageList/staffMessageList";
import StaffProfileSummary from "../staffProfileSummary/staffProfileSummary";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MyAttendance from "../staffTakeAttendance/page";
import StaffAttendanceCalendar from "../StaffAttendanceShow/page"; 
import StaffSalaryPage from "../StaffSalary/page";
import ApplyLeave from "../staffProfileLeaveApply/staffProfileLeaveapply";

function StaffTabbedPage({ staff }) {
  const [key, setKey] = useState("summary");
  console.log("Stafffed", staff);
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
      <Tab eventKey="attendanceStaff" title="Attendance Staff">
        <MyAttendance staffId={staff._id} />
      </Tab>
     <Tab eventKey="attendance" title="Attendance">
        <StaffAttendanceCalendar staffId={staff._id}></StaffAttendanceCalendar>
      </Tab>
     <Tab eventKey="leave" title="Apply Leave">
        <ApplyLeave staffId={staff._id}></ApplyLeave>
      </Tab>
      {/* <Tab eventKey="message" title="Message">
        <StaffMessageList staff={staff} />
      </Tab> */}
      <Tab eventKey="Salary" title="Salary"> 
        <StaffSalaryPage staffId={staff._id}/>
      </Tab>
    </Tabs>
  );
}

export default StaffTabbedPage;
