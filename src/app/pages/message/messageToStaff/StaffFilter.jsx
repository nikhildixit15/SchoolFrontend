"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getDepartmentList,
  getDesignationList,
} from "@/app/services/staff/staffService";

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
console.log("kjfv ejkad", list)
    setDepartmentOptionList(
      list.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    );
  }

  async function handleDepartmentSection(value) {
    setDepartment(value);
     setDesignation(null); // reset designation
     const response = await getDesignationList({label:value.label});
    const list = response?.data || [];

    setDesignationOptionList(
      list.map((item) => ({
        value: item._id,
        label: item.name,
      }))
    );
  }

  function handleSearch() {
    getData({
      department: department?.label || "",
      designation: designation?.label || "",
    });
  }

  return (
    <div>
      <div className={styles.dropdownContainer}>
        <span>Department:</span>
        <Select
          value={department}
          onChange={handleDepartmentSection}
          options={departmentOptionList}
        />
      </div>

      <span>Designation:</span>
      <Select
        value={designation}
        onChange={setDesignation}
        options={designationOptionList}
        isDisabled={!department}
      />

      <button onClick={handleSearch}>Get Data</button>
    </div>
  );
}
