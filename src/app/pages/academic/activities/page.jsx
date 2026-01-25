"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import EventList from "./eventList"; 
import {
  getEventList,deleteEvent
} from "@/app/services/academic/academicService"; 

export default function Activities() {
  const [eventList, setEventList] = useState();

  useEffect(() => {
    getEvent();
  }, []);

  const handleDeleteEvent = async (id) => {
    await deleteEvent(id); // backend API
    console.log("Id",id)
    setEventList((prev) => prev.filter((e) => e._id !== id));
  };

  async function getEvent(data) {
    const result = await getEventList(data);
    console.log("####", result.data);
    setEventList(result.data);
  }

  return (
    <>
      <main><h1 className={styles.title}>🏫 Academic Events</h1> 

        <EventList events={eventList} onDelete={handleDeleteEvent} />
      </main>
    </>
  );
}
