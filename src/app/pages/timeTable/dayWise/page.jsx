"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getDayWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import Select from "react-select";
import { daysList } from "@/app/utils/constants";
import DayWiseTimeTable from "./dayWiseTimeTable";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";

export default function TeacherWise() {
  const [tableData, setTableDAta] = useState([]);
  const [dayName, setDayName] = useState();
  const [daysOptionList, setDaysOptionList] = useState();

  useEffect(() => {
    // getTableData({});
    createDaysOptionList();
  }, []);

  console.log("###daysList", tableData);
  function createDaysOptionList() {
    const list = [];
    daysList?.map((item) => {
      list.push({ ...item, value: item.dayName, label: item.dayName });
    });
    setDaysOptionList(list);
  }

  async function getTableData(data) {
    const response = await getDayWiseTimeTable(data);
    console.log("####", response);
    setTableDAta(response.data || []);
  }

  function handleDaySelect(value) {
    setDayName(value);
    getTableData({ day: value?.value });
        // getTableData({ classId: className?.id, section: sectionName?.value });// get class wise
    // getTableData({ teacherId: teacherName?.id });// get teacher wise

  }

  return (
    <>
      <main>
        <div>
          <div className={styles.dropdownContainer}>
            <label>Day Name:</label>
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
