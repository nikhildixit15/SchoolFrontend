import Link from "next/link";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import styles from "./studentTableByName.module.css";

function StudentTable({ students, sendMessageData }) {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAllSelected, setAllSelected] = useState(false);

  useEffect(() => {
    const updated = students.map((item) => ({
      ...item,
      isSelected: false,
    }));
    setStudentList(updated);
    setSelectedStudents([]);
    setAllSelected(false);
  }, [students]);

  function onCheckboxSelected(student) {
    const updatedList = studentList.map((item) =>
      item._id === student._id
        ? { ...item, isSelected: !item.isSelected }
        : item,
    );

    setStudentList(updatedList);

    const selected = updatedList.filter((item) => item.isSelected);
    setSelectedStudents(selected);
    setAllSelected(selected.length === updatedList.length);
  }

  function onHeaderCheckboxSelected() {
    const selectAll = !isAllSelected;

    const updatedList = studentList.map((item) => ({
      ...item,
      isSelected: selectAll,
    }));

    setStudentList(updatedList);
    setSelectedStudents(selectAll ? updatedList : []);
    setAllSelected(selectAll);
  }

function performSendMessage() {
  const emails = selectedStudents.map(
    (s) => s.familyInfo?.email
  );

  const students = selectedStudents.map(
    (s) => s._id
  );

  sendMessageData({ students, emails });
}
  return (
    <div>

      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onHeaderCheckboxSelected}
              />
            </th>
            <th>#</th>
            <th>Student Name</th>
            <th>User Name</th>
            <th>Father's Name</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {studentList.map((item, index) => (
            <tr key={item._id}>
              <td>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={item.isSelected}
                  onChange={() => onCheckboxSelected(item)}
                />
              </td>
              <td>{index + 1}</td>
              <td>
                {item.basicInfo?.firstName} {item.basicInfo?.lastName}
              </td>
              <td>{item.adminInfo?.userName}</td>
              <td>{item.familyInfo?.fatherName}</td>
              <td>{item.address?.permanentAddress || "-"}</td>
              <td>{item.familyInfo?.mobileNumber}</td>
              <td>
                <Link
                  className={styles.viewLink}
                  href={{
                    pathname: "/pages/student/studentDetails",
                    query: { studentId: item._id },
                  }}
                  >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
          {selectedStudents.length > 0 && (
            <button className={styles.sendButton} onClick={performSendMessage}>
              Send Message
            </button>
          )}
    </div>
  );
}

export default StudentTable;
