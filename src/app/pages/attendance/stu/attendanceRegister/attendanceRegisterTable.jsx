import Table from "react-bootstrap/Table";
import styles from "./page.module.css";
import Select from "react-select";
import { attendanceStatus, attendanceTypeList } from "@/app/utils/constants";
import { getDaysByMonths } from "@/app/utils/dateUtils";

function AttendanceRegisterTable({ students, month }) {
  console.log("students####", students);

  const days = getDaysByMonths(month);
  const dateList = new Array(days).fill(0);

  function getAttendanceStatusText(value) {
    console.log(attendanceStatus[value.attendanceStatus]);
    return attendanceStatus[value.attendanceStatus];
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
          {dateList.map((item, index) => (
            <th>{index + 1}</th>
          ))}
          <th>TW</th>
          <th>TA</th>
          <th>PM</th>
          <th>GT</th>
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
            {item.attendanceArr.map((data) => (
              <td className={styles[data.attendanceStatus]}>
                {getAttendanceStatusText(data)}
              </td>
            ))}
            <td>{item.totalWorking}</td>
            <td>{item.totalAttendance}</td>
            <td>{item.pm}</td>
            <td>{item.gt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AttendanceRegisterTable;
