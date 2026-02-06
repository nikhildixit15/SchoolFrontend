"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import { getDepartmentList, getDesignationList } from "@/app/services/staff/staffService";

export default function StaffFilter({ getData }) {

  const [department, setDepartment] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [departmentOptionList, setDepartmentOptionList] = useState([]);
  const [designationOptionList, setDesignationOptionList] = useState([]);

  useEffect(() => {
    loadDepartmentList();
  }, []);

  async function loadDepartmentList() {
     const response = await getDepartmentList();

  const list = response?.data || [];
    const results = list.map((item) => ({
      value: item._id,
      label: item.name,
    }));

    setDepartmentOptionList(results);
  }

 async function handleDepartmentSection(value) {
    setDepartment(value);
     const response = await getDesignationList(value);
 
  const list = response?.data || [];
    const results = list.map((item) => ({
      value: item._id,
      label: item.name,
    }));

    setDesignation(results);
  }

  return (
    <>
    <div>
      <div className={styles.dropdownContainer}>
        <span>Department:</span>

        <Select
          className={styles.classDropdown}
          value={department}
          onChange={handleDepartmentSection}
          options={departmentOptionList}
        />
      </div>
        <span>Designation:</span>

        <Select
          className={styles.classDropdown}
          value={designation}
          onChange={setDesignation}
          options={designationOptionList}
        />
      

      <button onClick={() => getData(department?.value)}>
        Get Data
      </button>
    </div>
          </>
  );
}
