"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  getDepartmentList,
  getDesignationList,
  addDepartment,
  addDesignation,
} from "@/app/services/staff/staffService";
import AddSubject from "./addSubject";

export default function DepartmentMaster() {
  const [designationList, setDesignationList] = useState();
  const [departmentList, setDepartmentList] = useState();

  useEffect(() => {
    loadDesignations();
    loadDepartmentList();
  }, []);

  async function loadDesignations() {
    const list = await getDesignationList();
    setDesignationList(list);
  }

  async function loadDepartmentList() {
    const list = await getDepartmentList();
    setDepartmentList(list);
  }

  async function addNewDepartment(data) {
    console.log([...departmentList, data]);
    const list = await addDepartment(data);
    setDepartmentList([...departmentList, data]);
  }

  async function addNewDesignation(data) {
    const list = await addDesignation(data);
    setDesignationList([...designationList, data]);
  }
  return (
    <>
      <main>
        <div>
          {/* <AddDepartment
            departmentList={departmentList}
            addDepartment={addNewDepartment}
          ></AddDepartment> */}
          <AddSubject
            departmentList={departmentList}
            designationList={designationList}
            addDesignation={addNewDesignation}
          ></AddSubject>
        </div>
      </main>
    </>
  );
}
