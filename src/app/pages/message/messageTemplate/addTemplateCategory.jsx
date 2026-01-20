"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Table from "react-bootstrap/Table";

export default function AddTemplateCategory({
  addData,
  tableData,
  deleteCategory,
}) {
  const [categoryName, setCategoryName] = useState("");

  function onTextChanged(event) {
    setCategoryName(event.target.value);
  }

  function handleAddCategory() {
    if (!categoryName.trim()) return;
    addData(categoryName);
    setCategoryName("");
  }

  async function handleDeleteCategory(categoryId) {
    await deleteCategory(categoryId);
  }

  return (
    <div>
      {/* INPUT ROW */}
      <div className={styles.inputRow}>
        <label className={styles.formLabel}>Category</label>

        <input
          className={styles.departmentInput}
          name="category"
          value={categoryName}
          onChange={onTextChanged}
          placeholder="Enter category name"
        />

        <button className={styles.actionButton} onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <Table striped bordered hover className={styles.styledTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {tableData?.length > 0 ? (
              tableData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.categoryName}</td>

                  <td>
                    <button>View</button>
                  </td>

                  <td>
                    <button onClick={() => handleDeleteCategory(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.emptyState}>
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
