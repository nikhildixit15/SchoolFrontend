import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./studentFeeTable.module.css";
function StudentFeeTable({ students }) {
  console.log("students", students);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Father's Name</th>
          <th>Class</th>
          <th>DOB</th>
          <th>User Name</th>
          <th>Mobile Number</th>
          <th>Due Amount</th>
          <th>Deposit Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.fatherName}</td>
            <td>{item.class}</td>
            <td>{item.dob}</td>
            <td>{item.userName}</td>
            <td>{item.mobileNumber}</td>
            <td>{item.dueAmount}</td>
            <td>{item.depositDate}</td>
            <td>
              {parseInt(item.dueAmount) != 0 && (
                <label className={styles.actionBtn}>{"Reminder "} </label>
              )}

              <label className={styles.actionBtn}>{" Download "} </label>
              <label className={styles.actionBtn}>{" Fee "} </label>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StudentFeeTable;
