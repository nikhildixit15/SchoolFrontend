import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { staffFilterOptions } from "@/app/utils/constants";
import {
  getDesignationList,
  getDepartmentList,
} from "@/app/services/staff/staffService";

export default function StaffFilter({ getData }) {
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [filterName, setFilterName] = useState();
  const [filter, setFilter] = useState({});

  const [designationOptionList, setDesignationOptionList] = useState();
  const [departmentOptionList, setDepartmentOptionList] = useState();

  useEffect(() => {
    loadDesignationList();
    loadDepartmentList();
  }, []);

  async function loadDesignationList() {
    const list = await getDesignationList();
    const results = list.map((item) => {
      return {
        id: item.id,
        value: item.name,
        label: item.name,
      };
    });

    setDesignationOptionList(results);
  }

  async function loadDepartmentList() {
    const list = await getDepartmentList();
    const results = list.map((item) => {
      return {
        id: item.id,
        value: item.name,
        label: item.name,
      };
    });

    setDepartmentOptionList(results);
  }

  function handleStaffSelection(value) {
    console.log(value);
    setFilterName(value);
    setFilter({ ...filter, filterName: value });
  }

  function handleDepartmentSection(value) {
    setDepartment(value);
    setFilter({ ...filter, department: value });
  }

  function handleDesignationSection(value) {
    setDesignation(value);
    setFilter({ ...filter, designation: value });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.dropdownContainer}>
          <label>Filter:</label>
          <Select
            className={styles.classDropdown}
            value={filterName}
            onChange={handleStaffSelection}
            options={staffFilterOptions}
          />
        </div>
        <div className={styles.dropdownContainer}>
          <span>Department:</span>
          <Select
            className={styles.classDropdown}
            value={department}
            onChange={handleDepartmentSection}
            options={departmentOptionList}
          />
        </div>

        <div className={styles.dropdownContainer}>
          <span>Designation:</span>
          <Select
            className={styles.classDropdown}
            value={designation}
            onChange={handleDesignationSection}
            options={designationOptionList}
          />
        </div>

        <button onClick={() => getData(filter)} className={styles.btn}>
          Get data
        </button>
      </div>
    </>
  );
}
