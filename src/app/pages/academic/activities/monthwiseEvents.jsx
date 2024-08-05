"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import EventList from "./eventList";
import Select from "react-select";
import { monthList } from "@/app/utils/constants";

export default function MonthWiseEvents({ eventList }) {
  const [filteredList, setFilteredList] = useState(eventList);
  console.log("####eventListeventList", eventList);

  const [monthOptionList, setMonthOptionList] = useState();

  const [monthName, setMonthName] = useState();

  useEffect(() => {
    const list = monthList.map((item) => {
      return {
        label: item.monthName,
        value: item.monthName,
        monthCount: item.monthCount,
      };
    });
    setMonthOptionList(list);
  }, []);

  async function handleMonthSelect(data) {
    setMonthName(data);
    const list = eventList.filter((item) => {
      const eventDate = new Date(item.eventDate);
      const monthCount = eventDate.getMonth();
      console.log("####data.monthCount", monthCount);

      return monthCount == data.monthCount;
    });
    console.log("listCount", list);

    setFilteredList(list);
  }

  return (
    <div>
      <label>Select Month</label>
      <Select
        className={styles.classDropdown}
        value={monthName}
        onChange={handleMonthSelect}
        options={monthOptionList}
      />

      <div>
        <EventList listData={filteredList}></EventList>
      </div>
    </div>
  );
}
