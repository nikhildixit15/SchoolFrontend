import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import Table from "react-bootstrap/Table";

export default function AddDepartment({ departmentList, addDepartment }) {
  const [departmentName, setDepartmentName] = useState();
  function addNewDepartment() {
    addDepartment({
      id: departmentList.length + 1,
      name: departmentName,
    });
  }

  function onTextChanged(event) {
    setDepartmentName(event.target.value);
  }
  return (
    <div>
      <label>Department</label>
      <input
        className={styles.departmentInput}
        name="department"
        onInput={onTextChanged}
      />
      <button onClick={addNewDepartment}>Add Record</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departmentList?.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
