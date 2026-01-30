import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./page.module.css"

function StudentTable({ students }) {
  console.log("students", students);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Aadar No</th>
          <th>Father's Name</th>
          <th>Mother's Name</th>
          <th>Class</th>
          <th>DOB</th>
          <th>Sex</th>
          <th>Address</th>
          <th>User Name</th> 
          <th>Mobile Number</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.adarNo}</td>
            <td>{item.fatherName}</td>
            <td>{item.motherName}</td>
            <td>{item.className?? "" +" "+ item.section}</td>
            <td>{item.dob}</td>
            <td>{item.gender}</td>
            <td>{item.address}</td>
            <td>{item.userName}</td> 
            <td>{item.mobileNumber}</td>
            <td>
              <Link
                href={{
                  pathname: "/pages/student/studentDetails",
                  query: { studentId:item._id },
                }}
              >
                <button className={styles.viewBtn}>View</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StudentTable;
