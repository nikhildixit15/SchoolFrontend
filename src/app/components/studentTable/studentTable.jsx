import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./page.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function StudentTable({ students }) {

  const downloadExcel = () => {
    // 1️⃣ Table data ko Excel-friendly object me convert karo
    const excelData = students.map((item, index) => ({
      "S.No": index + 1,
      "Student Name": item.name,
      "Aadhar No": item.adarNo,
      "Father Name": item.fatherName,
      "Mother Name": item.motherName,
      "Class": `${item.className ?? ""} ${item.section ?? ""}`,
      "DOB": item.dob,
      "Gender": item.gender,
      "Address": item.address,
      "Username": item.userName,
      "Mobile": item.mobileNumber,
    }));

    // 2️⃣ Worksheet banao
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // 3️⃣ Workbook banao
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // 4️⃣ Excel file generate karo
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob(
      [excelBuffer],
      { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
    );

    // 5️⃣ Download trigger
    saveAs(data, "students.xlsx");
  };

  return (
    <>
      <button onClick={downloadExcel} className={styles.viewBtn}>
        Download ExcelSheet
      </button>

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
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.adarNo}</td>
              <td>{item.fatherName}</td>
              <td>{item.motherName}</td>
              <td>{item.className ?? ""} {item.section}</td>
              <td>{item.dob}</td>
              <td>{item.gender}</td>
              <td>{item.address}</td>
              <td>{item.userName}</td>
              <td>{item.mobileNumber}</td>
              <td>
                <Link
                  href={{
                    pathname: "/pages/student/studentDetails",
                    query: { studentId: item._id },
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

export default StudentTable;
