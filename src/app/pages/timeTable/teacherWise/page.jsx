"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import TeacherWiseTimeTable from "./teacherWiseTimeTable";
import { getTeacherWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import Select from "react-select";
import { useSelector } from "react-redux";

export default function TeacherWise() {
  const [tableData, setTableDAta] = useState();
  const [teacherName, setTeacherName] = useState();
  const [teacherOptionList, setTeacherOptionList] = useState();

  const teacherList = useSelector((state) => {
    console.log("###teacherList", teacherList);

    return state.class.teacherList;
  });

  useEffect(() => {
    getTableData({});
    createTeachersOptionList();
  }, []);

  console.log("###teacherList", teacherList);
  function createTeachersOptionList() {
    const list = [];
    teacherList?.map((item) => {
      list.push({ ...item, value: item.name, label: item.name });
    });
    setTeacherOptionList(list);
  }

  async function getTableData(data) {
    const result = await getTeacherWiseTimeTable(data);
    console.log("####", result);
    setTableDAta(result);
  }

  function handleTeacherSelect(value) {
    setTeacherName(value);
  }

  return (
    <>
      <main>
        <div>
          <div className={styles.dropdownContainer}>
            <label>Teacher Name:</label>
            <Select
              className={styles.classDropdown}
              value={teacherName}
              onChange={handleTeacherSelect}
              options={teacherOptionList}
            />
          </div>
        </div>
        <TeacherWiseTimeTable tableData={tableData}></TeacherWiseTimeTable>
      </main>
    </>
  );
}
