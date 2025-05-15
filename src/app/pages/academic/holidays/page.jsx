"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AddHoliday from "./addHoliday";
import HolidayList from "./holidayList";
import {
  getEventList,
  addNewEvent,
} from "@/app/services/academic/academicService";

export default function Activities() {
  const [eventList, setEventList] = useState();

  useEffect(() => {
    getEvent();
  }, []);

  async function addEvent(data) {
    const result = await addNewEvent(data);
    console.log("####", result);
    setEventList(result);
  }

  async function getEvent(data) {
    const result = await getEventList(data);
    setEventList(result);
  }

  return (
    <>
      <main>
        <AddHoliday addEvent={addEvent}></AddHoliday>

        <div>
          <HolidayList listData={eventList}></HolidayList>
        </div>
      </main>
    </>
  );
}
