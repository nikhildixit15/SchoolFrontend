import Link from "next/link";
import Table from "react-bootstrap/Table";
import { useRouter } from "next/router";

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
          <th>Password</th>
          <th>Mobile Number</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.adarNo}</td>
            <td>{item.fatherName}</td>
            <td>{item.motherName}</td>
            <td>{item.class}</td>
            <td>{item.dob}</td>
            <td>{item.sex}</td>
            <td>{item.address.permanentAddress}</td>
            <td>{item.userName}</td>
            <td>{item.password}</td>
            <td>{item.mobileNumber}</td>
            <td>
              <Link
                href={{
                  pathname: "/pages/student/studentDetails",
                  query: { student: JSON.stringify(item) },
                }}
              >
                view
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StudentTable;
