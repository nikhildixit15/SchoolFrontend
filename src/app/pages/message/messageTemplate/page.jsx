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
import AddTemplateCategory from "./addTemplateCategory";
import AddTemplateMessage from "./addTemplateMessage";
import {
  addTemplateCategory,
  getCategoryList,
} from "@/app/services/message/messageService";

export default function DepartmentMaster() {
  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
    loadCategoryList();
  }, []);

  async function loadCategoryList() {
    const list = await getCategoryList();
    setCategoryList(list);
  }

  async function addNewCategory(categoryName) {
    const list = await addTemplateCategory({
      name: categoryName,
    });
    setCategoryList(list);
  }

  return (
    <>
      <main>
        <div>
          <AddTemplateCategory
            addData={addNewCategory}
            tableData={categoryList}
          ></AddTemplateCategory>
          <AddTemplateMessage tableData={categoryList}></AddTemplateMessage>
        </div>
      </main>
    </>
  );
}
