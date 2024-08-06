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
                <Link href={"/pages/student/createStud"}>Create Student</Link>
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
                <Link href="/pages/academic/dateSheet">
                  Day wise time table
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/pages/academic/dateSheet">
                  Class wise time table
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
