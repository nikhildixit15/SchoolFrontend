"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { addExam, getExamList } from "@/app/services/academic/academicService";

export default function TeacherWise() {
  const [examList, setExamList] = useState<any>();
  const [filteredList, setFilteredList] = useState<any>();

  useEffect(() => {
    getExamListData({});
  }, []);

  async function getExamListData(data: any) {
    const result = await getExamList(data);
    console.log("####", result);
    setExamList(result);
  }

  async function onAddExamBtnClicked(data: any) {
    const list = await addExam(data);
    setExamList(list);
  }

  return (
    <>
      <main>
        <div>This is teacher's time table page</div>
      </main>
    </>
  );
}
