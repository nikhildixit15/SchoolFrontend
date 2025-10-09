"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AddClass from "./addClass";
import AddSection from "./addSection";
import { addClass, getClassList, updateClass } from "@/app/services/admin/adminService";
import { addSection } from "@/app/services/section/sectionService"; 
import { useSelector } from "react-redux";

export default function ClassMaster() {
  const [classList, setClassList] = useState([]);
  
  
  useEffect(() => {
    loadClassList();
  }, []);

  async function loadClassList() {
    const list = await getClassList()
    setClassList(list);
  }

  async function addNewClass(data) {
    const addedClass = await addClass(data);
    data._id = addedClass._id;
    data.id = addedClass._id;
    setClassList([...classList, data]);
  }

  // async function addNewSection(data) {
  //   const updatedClassList = classList.map(item=>{
  //     if(data._id == item._id){
  //       const newItem = {...item }
  //       newItem.code = data.code;
  //       return newItem;
  //     }
  //     return item
  //   })
  //   const list = await updateClass(data);
  //   setClassList(updatedClassList);// todo
  // }

   async function addNewSection(data) { 
    const createdSection = await addSection(data);

    // Update classList locally
    const updatedClassList = classList.map(item => {
      if (item._id === createdSection.classId) {
        return {
          ...item,
          sections: [...(item.sections || []), createdSection]
        };
      }
      return item;
    });

    setClassList(updatedClassList);
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
