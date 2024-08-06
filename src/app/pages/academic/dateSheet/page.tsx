"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import ExamTable from "./examTable";
import { addExam, getExamList } from "@/app/services/academic/academicService";
import AddNewExamView from "./AddNewExamView";

export default function DateSheet() {
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

  async function onAddExamBtnClicked(event: any) {
    const value = event.target.value;
    const list = await addExam();
    setExamList(list);
  }

  return (
    <>
      <main>
        <div>
          <AddNewExamView addData={onAddExamBtnClicked}></AddNewExamView>
        </div>
        <div>
          <ExamTable listData={examList}></ExamTable>
        </div>
      </main>
    </>
  );
}
