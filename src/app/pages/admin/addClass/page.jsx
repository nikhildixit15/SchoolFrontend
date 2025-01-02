"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  addDepartment,
  addDesignation,
} from "@/app/services/staff/staffService";
import AddClass from "./addClass";
import AddSection from "./addSection";
import { addClass, getClassList, updateClass } from "@/app/services/amin/adminService";

export default function ClassMaster() {
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    loadClassList();
  }, []);

  async function loadClassList() {
    const list = await getClassList();
    setClassList(list);
  }

  async function addNewClass(data) {
    const addedClass = await addClass(data);
    data._id = addedClass._id;
    data.id = addedClass._id;
    setClassList([...classList, data]);
  }

  async function addNewSection(data) {
    const updatedClassList = classList.map(item=>{
      if(data._id == item._id){
        const newItem = {...item }
        newItem.sec = data.sec;
        return newItem;
      }
      return item
    })
    const list = await updateClass(data);
    setClassList(updatedClassList);// todo
  }
  return (
    <>
      <main>
        <div>
          <AddClass
            classList={classList}
            addClass={addNewClass}
          ></AddClass>
          <AddSection
            classList={classList}
            addSection={addNewSection}
          ></AddSection>
        </div>
      </main>
    </>
  );
}
