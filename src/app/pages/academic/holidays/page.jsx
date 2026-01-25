"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import HolidayList from "./holidayList";
import { getHolidayList } from "@/app/services/academic/academicService";

export default function Activities() {
  const [holidayList, setholidayList] = useState([]); // ✅ array

  useEffect(() => {
    getHoliday();
  }, []);

  async function getHoliday() {
    const result = await getHolidayList(); 
    setholidayList(result.data.holidays); // ✅ correct level
  }

  return (
    <main>
      <HolidayList listData={holidayList} />
    </main>
  );
}
