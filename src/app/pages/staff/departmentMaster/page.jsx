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
import AddDepartment from "./addDepartment";
import AddDesignation from "./addDesignation";

export default function DepartmentMaster() {
  const [designationList, setDesignationList] = useState();
  const [departmentList, setDepartmentList] = useState();

  useEffect(() => {
    loadDesignations();
    loadDepartmentList();
  }, []);

  async function loadDesignations() {
    const response = await getDesignationList();
    setDesignationList(response?.data);
  }

  async function loadDepartmentList() {
    const response = await getDepartmentList();
    setDepartmentList(response?.data);
  }

  async function addNewDepartment(data) {
    console.log([...departmentList, data]);
    const list = await addDepartment(data);
    setDepartmentList([...departmentList, data]);
  }

  async function addNewDesignation(data) {
    const list = await addDesignation(data);
    setDesignationList([...designationList, data]);
    console.log([...designationList, data]);
  }
  return (
    <>
      <main>
        <div>
          <AddDepartment
            departmentList={departmentList}
            addDepartment={addNewDepartment}
          ></AddDepartment>
          <AddDesignation
            departmentList={departmentList}
            designationList={designationList}
            addDesignation={addNewDesignation}
          ></AddDesignation>
          <Link href={"/pages/login"}>Got to Login</Link>
        </div>
      </main>
    </>
  );
}
