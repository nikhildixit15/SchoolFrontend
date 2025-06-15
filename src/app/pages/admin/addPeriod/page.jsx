"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { addPeriod, getPeriodList } from "@/app/services/admin/adminService";

export default function AddPeriod() {
  const [periodNumber, setPeriodNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    loadPeriods();
  }, []);

  async function loadPeriods() {
    const response = await getPeriodList();
    setPeriods(response?.data || []);
  }

  async function handleAddPeriod() {
    if (!periodNumber.trim() || !startTime || !endTime) return;
    await addPeriod({ name:periodNumber, startTime, endTime });
    setPeriodNumber("");
    setStartTime("");
    setEndTime("");
    loadPeriods();
  }

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.heading}>Add Period</h2>
      <form className={styles.formRow} onSubmit={e => { e.preventDefault(); handleAddPeriod(); }}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Period Name</label>
          <input
            className={styles.inputValue}
            value={periodNumber}
            onChange={e => setPeriodNumber(e.target.value)}
            placeholder="Enter Period Name"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Start Time</label>
          <input
            className={styles.inputValue}
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>End Time</label>
          <input
            className={styles.inputValue}
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />
        </div>
        <button className={styles.saveButton} type="submit">
          Add Period
        </button>
      </form>
      <div className={styles.periodListSection}>
        <h4 className={styles.subHeading}>Periods</h4>
        <ul className={styles.periodList}>
          {periods.length === 0 ? (
            <li className={styles.noPeriod}>No periods found.</li>
          ) : (
            periods.map((period, idx) => (
              <li key={period._id || idx} className={styles.periodItem}>
                <span className={styles.periodName}>{period.name}</span>
                <span className={styles.periodTime}>{period.startTime} - {period.endTime}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
