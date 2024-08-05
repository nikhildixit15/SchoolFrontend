import Table from "react-bootstrap/Table";
import styles from "./page.module.css";
import Select from "react-select";
import { attendanceTypeList } from "@/app/utils/constants";

function AttendanceTable({ students, onAttendanceChange }) {
  console.log("students####", students);

  function handleAttendanceSection(selectedValue, index) {
    students[index].attendance = selectedValue.label;
    onAttendanceChange(students);
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Stu Id</th>
          <th>Student Name</th>
          <th>Father's Name</th>
          <th>Class</th>
          <th>Sex</th>
          <th>Mobile Number</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.studentId}</td>
            <td>{item.name}</td>
            <td>{item.fatherName}</td>
            <td>{item.class}</td>
            <td>{item.sex}</td>
            <td>{item.mobileNumber}</td>
            <td>
              <Select
                className={styles.classDropdown}
                value={{ label: item.attendance, value: item.attendance }}
                onChange={(event) => handleAttendanceSection(event, index)}
                options={attendanceTypeList}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AttendanceTable;
