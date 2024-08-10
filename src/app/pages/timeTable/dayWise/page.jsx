"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getDayWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import Select from "react-select";
import { daysList } from "@/app/utils/constants";
import DayWiseTimeTable from "./dayWiseTimeTable";

export default function TeacherWise() {
  const [tableData, setTableDAta] = useState();
  const [dayName, setDayName] = useState();
  const [daysOptionList, setDaysOptionList] = useState();

  useEffect(() => {
    getTableData({});
    createTeachersOptionList();
  }, []);

  console.log("###daysList", tableData);
  function createTeachersOptionList() {
    const list = [];
    daysList?.map((item) => {
      list.push({ ...item, value: item.dayName, label: item.dayName });
    });
    setDaysOptionList(list);
  }

  async function getTableData(data) {
    const result = await getDayWiseTimeTable(data);
    console.log("####", result);
    setTableDAta(result);
  }

  function handleDaySelect(value) {
    setDayName(value);
  }

  return (
    <>
      <main>
        <div>
          <div className={styles.dropdownContainer}>
            <label>Teacher Name:</label>
            <Select
              className={styles.classDropdown}
              value={dayName}
              onChange={handleDaySelect}
              options={daysOptionList}
            />
          </div>
        </div>
        <DayWiseTimeTable tableData={tableData}></DayWiseTimeTable>
      </main>
    </>
  );
}
