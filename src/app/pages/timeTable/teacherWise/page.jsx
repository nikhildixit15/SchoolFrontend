"use client";

<<<<<<< HEAD
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import TeacherDayWiseTable from "./teacherWiseTimeTable";
import { getTeacherWiseTimeTable } from "@/app/services/timeTable/timeTableService";
=======
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
>>>>>>> Nikhil/timeTable
import Select from "react-select";
import { useSelector } from "react-redux";
import style from "./page.module.css";
import { getTeacherWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import TeacherWiseTimeTable from "./teacherWiseTimeTable";

<<<<<<< HEAD
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
=======
export default function TeacherSchedule() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===== Redux Data =====
  const teacherList = useSelector((state) => state.class.teacherList);

  // ===== Teacher dropdown options =====
  const teacherOptions = useMemo(() => {
    if (!Array.isArray(teacherList)) return [];
    return teacherList.map((t) => ({
      value: t.id,
      label: t.name,
    }));
  }, [teacherList]);

  // ===== Fetch timetable =====
  const teacherhandle = async (teacher) => {
    if (!teacher) return;

    setSelectedTeacher(teacher);
    setLoading(true);
    setTimetable([]);

    try {
      const payload = { teacherId: teacher.value };
      const result = await getTeacherWiseTimeTable(payload);

      // ✅ Ensure array
      setTimetable(result?.data?.schedule ?? []);
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setTimetable([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.title}>Teacher Schedule Finder</h1>

        {/* ===== Teacher Select ===== */}
        <div className={style.searchBox}>
          <div className={style.searchInputWrapper}>
            <Search className={style.searchIcon} size={20} />
            <Select
              className={style.select}
              options={teacherOptions}
              value={selectedTeacher}
              onChange={teacherhandle}
              placeholder="Select Teacher"
            />
          </div>
        </div>

        {/* ===== Schedule Table ===== */}
        {selectedTeacher && (
          <div className={style.scheduleCard}>
            <h2 className={style.scheduleTitle}>
              {selectedTeacher.label}'s Schedule
            </h2>

            {loading ? (
              <p>Loading schedule...</p>
            ) : (
              <TeacherWiseTimeTable tableData={timetable} />
            )}
          </div>
        )}
      </div>
    </div>
>>>>>>> Nikhil/timeTable
  );
}
