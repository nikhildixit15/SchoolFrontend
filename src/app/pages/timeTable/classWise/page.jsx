"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getClassWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import Select from "react-select";
import { useSelector } from "react-redux";
import ClassWiseTimeTable from "./classWiseTimeTable";

export default function ClassWise() {
  const [tableData, setTableDAta] = useState();
  const [className, setClassName] = useState();
  const [classOptionList, setClassOptionList] = useState();

  const classList = useSelector((state) => state.class.classes);

  useEffect(() => {
    getTableData({});
    createClassOptionList();
  }, []);

  console.log("###teacherList", classList);
  function createClassOptionList() {
    const list = [];
    classList?.map((item) => {
      list.push({ ...item, value: item.name, label: item.name });
    }); 
    setClassOptionList(list);
  }

  async function getTableData(data) {
    const result = await getClassWiseTimeTable(data);
    console.log("####", result);
    setTableDAta(result);
  }

  function handleClassSelect(value) {
    setClassName(value);
  }

  return (
    <>
      <main>
        <div>
          <div className={styles.dropdownContainer}>
            <label>Class Name:</label>
            <Select
              className={styles.classDropdown}
              value={className}
              onChange={handleClassSelect}
              options={classOptionList}
            />
          </div>
        </div>
        <ClassWiseTimeTable tableData={tableData}></ClassWiseTimeTable>
      </main>
    </>
  );
}
