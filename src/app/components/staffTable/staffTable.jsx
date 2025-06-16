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
              {item.basicInfo?.firstName || item.firstName} {item.basicInfo?.lastName || item.lastName}
            </td>
            <td>
              {item.profileDetails?.department || item.department}
            </td>
            <td>
              {item.profileDetails?.designation || item.designation}
            </td>
            <td>
              {item.qualification}
            </td>
            <td>
              {item.classes}
            </td>
            <td>
              {item.classTeacher}
            </td>
            <td>
              {item.basicInfo?.dob || item.dob}
            </td>
            <td>
              {item.basicInfo?.gender || item.gender}
            </td>
            <td>
              {item.address?.permanentAddress || item.address || ""} ({item.address?.permanentPinCode || ""})
            </td>
            <td>
              {item.adminInfo?.userName || item.userName}
            </td>
            <td>
              {item.adminInfo?.password || item.password}
            </td>
            {console.log("Row item:", item)}
            <td>
              {item.basicInfo?.mobileNumber?.trim() || item.mobileNumber?.trim() || item.familyInfo?.mobileNumber?.trim() || "N/A"}
            </td>
            <td>
              <Link
                href={{
                  pathname: "/pages/staff/staffDetails",
                  query: { staffId:item._id },
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
