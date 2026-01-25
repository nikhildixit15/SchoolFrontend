import { useState } from "react";
import styles from "./page.module.css";

export default function AttendanceFilter({ getStudentData }) {
  const [date, setDate] = useState("");

  function onDateSelected(e) {
    console.log("Selected date:", e.target.value);
    setDate(e.target.value);
  }

  function handleGetData() {
    if (!date) {
      alert("Please select a date");
      return;
    }

    console.log("Sending date to API:", date);

    getStudentData({ date }); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.dropdownContainer}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={onDateSelected}
        />

      <button onClick={handleGetData} className={styles.btn}>
        Get data
      </button>
      </div>
    </div>
  );
}
