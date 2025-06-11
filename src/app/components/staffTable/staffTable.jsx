import Link from "next/link";
import Table from "react-bootstrap/Table";
import { useRouter } from "next/router";

function StaffTable({ staffList }) {
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
          <tr key={item._id || index}>
            <td>{index + 1}</td>
            <td>{item.adminInfo?.employeeId}</td>
            <td>
              {item.basicInfo?.firstName} {item.basicInfo?.lastName}
            </td>
            <td>{item.profileDetails.department}</td>
            <td>{item.profileDetails.designation}</td>
            <td>{item.qualification}</td>
            <td>{item.classes}</td>
            <td>{item.classTeacher}</td>
            <td>{item.basicInfo?.dob}</td>
            <td>{item.basicInfo?.gender}</td>
            <td>
              {item.address
                ? `${item.address.permanentAddress || ""} (${
                    item.address.permanentPinCode || ""
                  })`
                : ""}
            </td>
            <td>{item.adminInfo?.userName}</td>
            <td>{item.adminInfo?.password}</td>
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
