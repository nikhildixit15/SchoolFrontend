import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./navbar.module.css";
import Link from "next/link";

function MMSNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className={`${styles.container}`}>
      <Container>
        <Navbar.Brand href="/">BNSD School</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Student" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/student/createStud">
                <Link href={"/pages/student/createStudent"}>
                  Create Student
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item href="/pages/student/studentList">
                <Link href={"/pages/student/studentList"}>Student List</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href={"/pages/student/searchStudent"}>
                  Search Student
                </Link>
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
              <NavDropdown.Item>
                <Link href="/pages/staff/departmentMaster">
                  Department Master
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link href="/pages/staff/createStaff">Create Staff</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/staff/staffList">Staff list</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/staff/searchStaff">Search Staff</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/staff/staffStrength">Staff Strength</Link>
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
              <NavDropdown.Item>
                <Link href="/pages/attendance/stu/studentAttendance">
                  Student Attendance
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/attendance/stu/attendanceClasswise">
                  Attendance ClassWise
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/attendance/stu/attendanceDatewise">
                  Attendance DateWise
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/staff/staffStrength">Absence Logs</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/attendance/stu/attendanceRegister">
                  Student Register
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Academic" id="collapsible-nav-dropdown">
              <NavDropdown.Item>
                <Link href="/pages/academic/activities">Activities</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/academic/dateSheet">Date Sheet</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Time Table" id="collapsible-nav-dropdown">
              <NavDropdown.Item>
                <Link href="/pages/timeTable/teacherWise">
                  Teacher’s time table
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/timeTable/dayWise">Day wise time table</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/timeTable/classWise">
                  Class wise time table
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Message" id="collapsible-nav-dropdown">
              <NavDropdown.Item>
                <Link href="/pages/message/messageTemplate">
                  Message Templates
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/message/smartMessage">Smart Message</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/message/defaulters">Defaulters Message</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/message/messageToStaff">
                  Message To Staff
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link href="/pages/message/commonMessage">Common Message</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Home Work" id="collapsible-nav-dropdown">
              <NavDropdown.Item>
                <Link href="/pages/homeWork/assignHomeWork">Assign HW</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/homeWork/viewHomeWork">View HW</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Fee" id="collapsible-nav-dropdown">
              <NavDropdown.Item>
                <Link href="/pages/fees/submitFee">SubmitFee</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/fees/feeDetails">Fee Details</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Admin" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pages/student/createStud">
                <Link href={"/pages/admin/addClass"}>
                  Add Class
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item href="/pages/student/studentList">
                <Link href={"/pages/student/studentList"}>Add Section</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href={"/pages/admin/addSubject"}>
                  Add Subject
                </Link>
              </NavDropdown.Item>
        
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/pages/login">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MMSNavbar;
