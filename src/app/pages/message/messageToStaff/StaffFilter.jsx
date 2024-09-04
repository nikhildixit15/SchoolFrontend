"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { getDepartmentList } from "@/app/services/staff/staffService";

export default function StaffFilter({getData}) {
    const [department, setDepartment] = useState();
  
    const [departmentOptionList, setDepartmentOptionList] = useState();
  

  useEffect(() => {
    loadDepartmentList();
  }, []);

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




  function handleDepartmentSection(value) {
    setDepartment(value);
  }



  return (
        
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

            <button onClick={()=>getData(department)}> Get Data</button>
        </div>
  );
}

