import Link from "next/link";
import Table from "react-bootstrap/Table";
import { useRouter } from "next/router";

function StaffTable({ staffList }) {
  console.log("students", staffList);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>EmpCode</th>
          <th>Name</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Qualification</th>
          <th>Classes</th>
          <th>ClassTeacher</th>
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
        {staffList?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.empCode}</td>
            <td>{item.name}</td>
            <td>{item.department}</td>
            <td>{item.designation}</td>
            <td>{item.qualification}</td>
            <td>{item.classes}</td>
            <td>{item.classTeacher}</td>
            <td>{item.dob}</td>
            <td>{item.sex}</td>
            <td>{item.address}</td>
            <td>{item.userName}</td>
            <td>{item.password}</td>
            <td>{item.mobileNumber}</td>
            <td>
              <Link
                href={{
                  pathname: "/pages/staff/staffDetails",
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

export default StaffTable;
