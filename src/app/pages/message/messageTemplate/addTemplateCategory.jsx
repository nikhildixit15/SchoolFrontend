import Link from "next/link";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

export default function AddTemplateCategory({ addData, tableData }) {
  const [categoryName, setCategoryName] = useState();

  function onTextChanged(event) {
    setCategoryName(event.target.value);
  }
  return (
    <div>
      <label>Category</label>
      <input
        className={styles.departmentInput}
        name="category"
        onInput={onTextChanged}
      />
      <button onClick={() => addData(categoryName)}>Add Category</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
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
