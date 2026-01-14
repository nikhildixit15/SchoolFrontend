"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import TeacherDayWiseTable from "./teacherWiseTimeTable";
import { getTeacherWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import Select from "react-select";
import { useSelector } from "react-redux";

export default function TeacherWise() {
  const [tableData, setTableData] = useState([]);
  const [teacherName, setTeacherName] = useState(null);
  const [teacherOptionList, setTeacherOptionList] = useState([]);

  const teacherList = useSelector(
    (state) => state.class.teacherList
  );

  useEffect(() => {
    if (teacherList?.length) {
      const list = teacherList.map((item) => ({
        value: item.id,   // ✅ teacherId
        label: item.name,
      }));
      setTeacherOptionList(list);
    }
  }, [teacherList]);

async function getTableData(teacherId) {
  if (!teacherId) return;

  const result = await getTeacherWiseTimeTable({ teacherId });

  // ✅ IMPORTANT: only pass ARRAY
  setTableData(result?.data || []);
}


  function handleTeacherSelect(option) {
    setTeacherName(option);
    getTableData(option.value);  
  }

  return (
    <main>
      <div className={styles.dropdownContainer}>
        <label>Teacher Name:</label>
        <Select
          className={styles.classDropdown}
          value={teacherName}
          onChange={handleTeacherSelect}
          options={teacherOptionList}
          placeholder="Select Teacher"
        />
      </div>

      <TeacherDayWiseTable data={tableData?.data || []} />
    </main>
  );
}
