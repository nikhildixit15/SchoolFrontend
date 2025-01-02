import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import Table from "react-bootstrap/Table";

export default function AddClass({ classList, addClass }) {
  const [className, setClassName] = useState();
  function addNewClass() {
    addClass({
      name: className,
      sec:["A"]
    });
  }

  function onTextChanged(event) {
    setClassName(event.target.value);
  }
  return (
    <div>
      <label>Class</label>
      <input
        className={styles.departmentInput}
        name="class"
        onInput={onTextChanged}
      />
      <button onClick={addNewClass}>Add Class</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classList?.map((item, index) => (
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
