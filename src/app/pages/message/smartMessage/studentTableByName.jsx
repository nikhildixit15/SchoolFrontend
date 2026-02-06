import { useState } from "react";
import styles from "./studentTableByName.module.css";
import Table from "react-bootstrap/Table";
import Link from "next/link";

function StudentTableByNAme({ students, onEmailSelect }) {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const studentList = Array.isArray(students) ? students : [students];

  const handleCheckboxChange = (student, checked) => {
    if (checked) {
      setSelectedEmail(student.email);
    } else {
      setSelectedEmail(null);
    }
  };

  const handleSendClick = () => {
    if (selectedEmail) {
      onEmailSelect([selectedEmail]);
    } else {
      alert("Please select student first");
    }
  };

  return (
    <div className={styles.container}>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>Select</th>
            <th>UserName</th>
            <th>Name</th>
            <th>Father Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {studentList.map((student, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedEmail === student.email}
                  onChange={(e) =>
                    handleCheckboxChange(student, e.target.checked)
                  }
                />
              </td>

              <td>{student.userName}</td>
              <td>
                {student.firstName} {student.lastName}
              </td>
              <td>{student.fatherName}</td>
              <td>{student.className}</td>
              <td>{student.section}</td>
              <td>
                <Link
                  className={styles.viewLink}
                  href={{
                    pathname: "/pages/student/studentDetails",
                    query: { studentId: student._id },
                  }}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <button className={styles.sendButton} onClick={handleSendClick}>
        Send
      </button>
    </div>
  );
}

export default StudentTableByNAme;
