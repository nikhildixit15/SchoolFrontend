"use client";

import React, { useState } from "react";
import { Search, Calendar } from "lucide-react";
import Select from "react-select";
import styles from "./page.module.css";
import { getDayWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import DayWiseTimeTable from "./dayWiseTimeTable";

export default function ClassScheduleManager() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [tableData, setTableData] = useState([]);

  const days = [
    { day: "Monday", label: "Monday" },
    { day: "Tuesday", label: "Tuesday" },
    { day: "Wednesday", label: "Wednesday" },
    { day: "Thursday", label: "Thursday" },
    { day: "Friday", label: "Friday" },
  ];

  const handleSelectDay = async (option) => {
    if (!option) return;
    setSelectedDay(option);
    try { 
      const result = await getDayWiseTimeTable(option);
      console.log("DayWise### Data", result.data);
      setTableData(result.data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setTableData([]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Search />
          <h1>Class Schedule Manager</h1>
        </div>

        <div className={styles.dropdown}>
          <label>
            <Calendar size={16} /> Select Day
          </label>

          <Select
            className={styles.classDropdown}
            instanceId="day-select"
            options={days}
            value={selectedDay}
            onChange={handleSelectDay}
            placeholder="Select Day"
          /> 
        </div>
      </div>

      {tableData && tableData.length > 0 && (
        <DayWiseTimeTable tableData={tableData} />
      )}
    </div>
  );
}
