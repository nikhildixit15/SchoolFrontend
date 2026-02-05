import Table from "react-bootstrap/Table";
import styles from "./page.module.css";
import Select from "react-select";
import { attendanceTypeList } from "@/app/utils/constants";

function AttendanceTable({ students, onAttendanceChange }) {
  console.log("students####", students);

  function handleAttendanceSection(selectedValue, index) {
    const updatedStudents = students.map((stu, i) =>
      i === index ? { ...stu, status: selectedValue.value } : stu,
    );

    onAttendanceChange(updatedStudents);
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
            <td>{item.userName}</td>
            <td>{item.studentName}</td>
            <td>{item.fatherName}</td>
            <td>{item.className}</td>
            <td>{item.gender}</td>
            <td>{item.mobile}</td>
            <td>
              <Select
                className={styles.classDropdown}
                value={attendanceTypeList.find(
                  (opt) => opt.value === item.status,
                )}
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
