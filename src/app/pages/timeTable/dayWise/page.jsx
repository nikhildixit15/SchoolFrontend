"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import { daysList } from "@/app/utils/constants";
import { getDayWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import DayWiseTimeTable from "./dayWiseTimeTable";

export default function TeacherWise() {
  const [tableData, setTableData] = useState([]);
  const [dayName, setDayName] = useState(null);
  const [daysOptionList, setDaysOptionList] = useState([]);

  useEffect(() => {
    const options = daysList.map((item) => ({
      ...item,
      value: item.dayName,
      label: item.dayName,
    }));
    setDaysOptionList(options);
  }, []);

  async function getTableData(filters) {
    const response = await getDayWiseTimeTable(filters);
    setTableData(response?.data || []);
  }

  function handleDaySelect(value) {
    setDayName(value);
    if (value?.value) {
      getTableData({ day: value.value });
    }
  }

  return (
    <main>
      <div className={styles.dropdownContainer}>
        <label>Day Name:</label>
        <Select
          className={styles.classDropdown}
          value={dayName}
          onChange={handleDaySelect}
          options={daysOptionList}
          placeholder="Select Day"
        />
      </div>

      {tableData.length > 0 && (
        <DayWiseTimeTable tableData={tableData} />
      )}
    </main>
  );
}
