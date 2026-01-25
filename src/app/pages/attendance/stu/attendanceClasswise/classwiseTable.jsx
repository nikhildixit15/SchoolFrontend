import Table from "react-bootstrap/Table";
import styles from "./page.module.css";

function ClasswiseTable({ listData }) {
  console.log("students####", listData);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Class Teacher</th>
          <th>Class</th>
          <th>Total</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Early leave</th>
          <th>Holiday</th>
          <th>Half Day</th>
          <th>NIWD</th>
          <th>Medical leave</th>
        </tr>
      </thead>

      <tbody>
        {listData?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item?.classTeacher}</td>
            <td>{item?.class}-{item?.section}</td>
            <td>{item?.total}</td>
            <td>{item?.present}</td>
            <td>{item?.absent}</td>
            <td>{item?.earlyLeave}</td>
            <td>{item?.holiDay}</td>
            <td>{item?.halfDay}</td>
            <td>{item?.NIWD}</td>
            <td>{item?.medicalLeave}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClasswiseTable;
