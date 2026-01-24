"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Select from "react-select";
import { useSelector } from "react-redux";
import style from "./page.module.css";
import { getTeacherWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import TeacherWiseTimeTable from "./teacherWiseTimeTable";

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
  );
}
