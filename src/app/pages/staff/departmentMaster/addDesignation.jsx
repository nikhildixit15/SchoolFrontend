import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { getOptionList } from "@/app/utils/optionListUtils";

export default function AddDesignation({
  departmentList,
  designationList,
  addDesignation,
}) {
  const [designationName, setDesignationName] = useState();
  const [departmentName, setDepartmentName] = useState();
  const [departmentOptionList, setDepartmentOptionList] = useState();

  useEffect(() => {
    loadDesignationList();
  }, [departmentList]);

  async function loadDesignationList() {
    const results =  getOptionList(departmentList)
    setDepartmentOptionList(results);
  }

  function addNewDesignation() {
    addDesignation({
      id: designationList.length + 1,
      departmentName: departmentName.label,
      name: designationName,
    });
  }
  function handleDepartmentSection(value) {
    setDepartmentName(value);
  }

  function onTextChanged(event) {
    setDesignationName(event.target.value);
  }
  return (
    <div>
      <div className={styles.dropdownContainer}>
        <span>Department:</span>
        <Select
          className={styles.classDropdown}
          value={departmentName}
          onChange={handleDepartmentSection}
          options={departmentOptionList}
        />
      </div>
      <label>Designation</label>

      <input
        className={styles.departmentInput} 
        name="designation"
        onInput={onTextChanged}
      />
      <button onClick={addNewDesignation}>Add Record</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Designation Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {designationList?.map((item, index) => (
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
