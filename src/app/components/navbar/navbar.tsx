import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./navbar.module.css";
import { CircleUser } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/app/redux/slices/loginSlice";

function MMSNavbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); // ✅ remove email from redux
  };
  return (
    <Navbar collapseOnSelect expand="lg" className={`${styles.container} ${styles.navbarCustom}`}>
      <Container>
        <Navbar.Brand href="/pages/dashboard">BNSD School</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown className={styles.navLink} title="Student" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/student/createStudent">
                Create Student
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/student/studentList">
                Student List
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/student/searchStudent">
                Search Student
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pages/downloadExcel">
                Download excel
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/defaulters">
                Defaulters
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Staff" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/staff/createStaff">
                Create Staff
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/staff/staffList">
                Staff list
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/staff/searchStaff">
                Search Staff
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/staff/staffStrength">
                Staff Strength
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Student Attendance"
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="/pages/attendance/stu/studentAttendance">
                Student Attendance
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/attendance/stu/attendanceClasswise">
                Attendance ClassWise
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/attendance/stu/attendanceDatewise">
                Attendance DateWise
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/staff/staffStrength">
                Absence Logs
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/attendance/stu/attendanceRegister">
                Student Register
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Academic" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/academic/activities">
                Activities
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/academic/dateSheet">
                Date Sheet
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/academic/holidays">
                Holidays
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Time Table" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/timeTable/teacherWise">
                Teacher's time table
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/timeTable/dayWise">
                Day wise time table
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/timeTable/classWise">
                Class wise time table
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Message" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/message/smartMessage">
                Smart Message
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/message/defaulters">
                Defaulters Message
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/message/messageToStaff">
                Message To Staff
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/message/commonMessage">
                Common Message
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Home Work" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/homeWork/assignHomeWork">
                Assign HW
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/homeWork/viewHomeWork">
                View HW
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/homeWork/uploadResult">
                Upload Result
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Fee" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/fees/submitFee">
                SubmitFee
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/fees/paymentType">
                Payment By Admin
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/fees/feeDetails">
                Fee Detail
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/fees/SeeDetail">
                See Payment History
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/fees/adminfee">
                Admin fee
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/fees/gallery">
                Galleryf
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Admin" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/admin/notification">
                Send Notification
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/message/messageTemplate">
                Message Templates
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/staff/departmentMaster">
                Department Master
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/fees/addFee">
                Add Fee
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/addAllowanceBonus">
                Add Allowance
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/paySalary">
                Pay Salary
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/addHoliday">
                Add Holiday
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/addEvent">
                Add Event
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/addExamSchedule">
                Add Exam Schedule
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pages/admin/deleteStudent">
                Delete Student/Staff
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/editStudent">
                Edit Student
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/editStaff">
                Edit Staff
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pages/admin/addClass">
                Add Class/Section
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/addSubject">
                Add Subject
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/assignedPeriods">
                Assigned Periods
              </NavDropdown.Item>
              <NavDropdown.Item href="/pages/admin/addPeriod">
                Add Period
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<CircleUser />}>
              <NavDropdown.Item href="/pages/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout} href="/">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MMSNavbar;
