import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import Table from "react-bootstrap/Table";

export default function AddClass({ classList, addClass }) {
  const [className, setClassName] = useState();
  const [codeName, setCodeName] = useState();

  function addNewClass() {
    addClass({
      name: className,
      code: codeName,
    });
  }

  function onTextChanged(event) {
    setClassName(event.target.value);
  }

  function onCodeTextChanged(event) {
    setCodeName(event.target.value);
  }

  return (
    <div>
      <label>Class</label>
      <input
        className={styles.departmentInput}
        type="text"
        inputMode="numeric"
        placeholder="Enter Class Name"
        onInput={(e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
          onTextChanged(e);
        }}
      />

      <input
        className={styles.departmentInput}
        name="codeName"
        placeholder="Enter Code"
        onInput={onCodeTextChanged}
        disabled={!className}
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
            <tr key={index}>
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
