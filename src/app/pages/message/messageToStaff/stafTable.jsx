import { useState } from "react";
import styles from "./stafTable.module.css";
import Table from "react-bootstrap/Table";
import Link from "next/link";

function StaffTableByNAme({ staffs, onEmailSelect }) {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const staffLists = Array.isArray(staffs) ? staffs : [staffs];

  const handleCheckboxChange = (staff, checked) => {
    if (checked) {
      setSelectedEmail(staff.email);
    } else {
      setSelectedEmail(null);
    }
  };

  const handleSendClick = () => {
    if (selectedEmail) {
      onEmailSelect([selectedEmail]);
    } else {
      alert("Please select staff first");
    }
  };

  return (
    <div className={styles.container}>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>Select</th>
            <th>EmployeeId</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {staffLists.map((staff, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedEmail === staff.email}
                  onChange={(e) =>
                    handleCheckboxChange(staff, e.target.checked)
                  }
                />
              </td>

              <td>{staff.employeeId}</td>
              <td>
                {staff.firstName} {staff.lastName}
              </td>
              <td>{staff.department}</td>
              <td>{staff.designation}</td>
              <td>
                <Link
                  className={styles.viewLink}
                  href={{
                    pathname: "/pages/staff/staffDetails",
                    query: { staffId: staff._id },
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

export default StaffTableByNAme;
