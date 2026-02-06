"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

import AddTemplateCategory from "./addTemplateCategory";
import AddTemplateMessage from "./addTemplateMessage";

import {
  addCategory,
  getCategoryList,
  deleteACategory,
} from "@/app/services/message/messageService";

export default function DepartmentMaster() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    loadCategoryList();
  }, []);

  async function loadCategoryList() {
    const res = await getCategoryList();
    setCategoryList(res?.data || []);
  }

  async function addNewCategory(categoryName) {
    if (!categoryName.trim()) return;
    await addCategory({ categoryName });
    loadCategoryList();
  }

  async function deleteCategory(categoryId) {
    await deleteACategory({ categoryId });
    loadCategoryList();
  }

  return (
       <div className={styles.container}>
        
          <h2 className={styles.title}>Template Categories</h2>
          <AddTemplateCategory
            addData={addNewCategory}
            tableData={categoryList}
            deleteCategory={deleteCategory}
          />
     

    
          <h2 className={styles.title}>Template Messages</h2>
          <AddTemplateMessage tableData={categoryList} />
      
      </div>
   );
}
