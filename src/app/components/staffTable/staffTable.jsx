import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./staffTable.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function StaffTable({ staffList }) {

  const downloadExcel = () => {
    if (!staffList || staffList.length === 0) return;

    // 🔹 Table ke visible data ko Excel data me convert
    const excelData = staffList.map((item, index) => ({
      "S.No": index + 1,
      "Emp Code": item.employeeId || "",
      "Name": `${item.basicInfo?.firstName || item.firstName || ""} ${
        item.basicInfo?.lastName || item.lastName || ""
      }`,
      "Department": item.profileDetails?.department || item.department || "",
      "Designation": item.profileDetails?.designation || item.designation || "",
      "Joining Date": item.dateOfJoining || "",
      "Classes": item.classes || "",
      "Class Teacher": item.classTeacher || "",
      "DOB": item.basicInfo?.dob || item.dob || "",
      "Gender": item.basicInfo?.gender || item.gender || "",
      "Address": item.address || "",
      "Username": item.adminInfo?.userName || item.userName || "",
      "Password": item.adminInfo?.password || item.password || "",
      "Mobile Number":
        item.basicInfo?.mobileNumber?.trim() ||
        item.mobileNumber?.trim() ||
        item.familyInfo?.mobileNumber?.trim() ||
        "N/A",
    }));

    // 🔹 Worksheet + Workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff List");

    // 🔹 Excel generate
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob(
      [excelBuffer],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(data, "staff-list.xlsx");
  };

  return (
    <>
      {/* ✅ Download Button */}
      <button
        onClick={downloadExcel}
        className={styles.viewBtn}
      >
        Download Excel
      </button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>EmpCode</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Joining Date</th>
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
              <td>{item.employeeId}</td>
              <td>
                {item.basicInfo?.firstName || item.firstName}{" "}
                {item.basicInfo?.lastName || item.lastName}
              </td>
              <td>{item.profileDetails?.department || item.department}</td>
              <td>{item.profileDetails?.designation || item.designation}</td>
              <td>{item.dateOfJoining}</td>
              <td>{item.classes}</td>
              <td>{item.classTeacher}</td>
              <td>{item.basicInfo?.dob || item.dob}</td>
              <td>{item.basicInfo?.gender || item.gender}</td>
              <td>{item.address}</td>
              <td>{item.adminInfo?.userName || item.userName}</td>
              <td>{item.adminInfo?.password || item.password}</td>
              <td>
                {item.basicInfo?.mobileNumber?.trim() ||
                  item.mobileNumber?.trim() ||
                  item.familyInfo?.mobileNumber?.trim() ||
                  "N/A"}
              </td>
              <td>
                <Link
                  href={{
                    pathname: "/pages/staff/staffDetails",
                    query: { staffId: item._id },
                  }}
                >
                  <button className={styles.viewBtn}>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default StaffTable;
