"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import EventList from "./eventList";
import AddEvent from "./addEvent";
import {
  getEventList,
  addNewEvent,
} from "@/app/services/academic/academicService";
import MonthWiseEvents from "./monthwiseEvents";

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
    console.log("####", result);
    setEventList(result);
  }

  return (
    <>
      <main>
        <AddEvent addEvent={addEvent}></AddEvent>

        <div>
          <EventList listData={eventList}></EventList>
        </div>
        <div>
          <MonthWiseEvents eventList={eventList}></MonthWiseEvents>
        </div>
      </main>
    </>
  );
}
