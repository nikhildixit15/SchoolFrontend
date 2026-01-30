"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { monthList } from "@/app/utils/constants";
import EventDetail from "./showEventDetail";

const EventList = ({ events = [], onDelete }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // store all events initially
  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  // month filter logic
  useEffect(() => {
    if (!selectedMonth) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((e) => {
        const month = new Date(e.date).getMonth();
        return month === Number(selectedMonth);
      });
      setFilteredEvents(filtered);
    }
  }, [selectedMonth, events]);

  const handleDelete = (id) => {
    setFilteredEvents((prev) => prev.filter((e) => e._id !== id));
    onDelete?.(id);
    setSelectedEvent(null);
  };

  // 👉 Row click
  const handleRowClick = (event) => {
    setSelectedEvent(event);
    console.log("Event", event);
  };

  // 👉 Show detail page
  if (selectedEvent) {
    return (
      <EventDetail
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <>
      {/* 🔽 Month Filter */}
      <h1 className={styles.title}>🏫 Academic Events</h1>
      <div className={styles.filterRow}>
        <select
          className={styles.select}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Months</option>
          {monthList.map((m, i) => (
            <option key={i} value={i}>
              {m.monthName}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Audience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="8" className={styles.empty}>
                  No events found
                </td>
              </tr>
            ) : (
              filteredEvents.map((e, index) => (
                <tr
                  key={e._id}
                  onClick={() => handleRowClick(e)}
                  className={styles.clickableRow}
                >
                  <td>{index + 1}</td>
                  <td className={styles.bold}>{e.title}</td>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                  <td>
                    {e.startTime}
                    {e.endTime && ` - ${e.endTime}`}
                  </td>
                  <td>{e.location}</td>

                  <td>
                    {e.audience?.map((a) => (
                      <span key={a} className={styles.badge}>
                        {a}
                      </span>
                    ))}
                  </td>

                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[e.status.toLowerCase()]
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>

                  {/* 🗑 Delete */}
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        handleDelete(e._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EventList;
