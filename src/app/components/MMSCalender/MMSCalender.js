import React, { useState } from "react";
import {
  startOfMonth,
  addDays,
  startOfWeek,
  endOfWeek,
  format,
  endOfMonth,
  isSameDay,
  subMonths,
  addMonths,
  isSameMonth,
} from "date-fns";
import styles from "./MMSCalender.module.css";

function MMSCalender() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const Header = function () {
    const dateFormat = "MMM yyyy";

    return (
      <div className={`${styles.header} ${styles.row} ${styles.flex_middle}`}>
        <div className={`${styles.col} ${styles.col_start}`}>
          <div className={styles.icon} onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className={`${styles.col}  ${styles.col_center}`}>
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className={`${styles.col}  ${styles.col_end}`} onClick={nextMonth}>
          <div className={`${styles.icon}`}>chevron_right</div>
        </div>
      </div>
    );
  };

  const Days = function () {
    const dateFormat = "E";

    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={`${styles.col}  ${styles.col_center}`} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className={`${styles.row}  ${styles.days}`}>{days}</div>;
  };

  const Cells = function () {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`${styles.col} ${styles.cell} ${
              !isSameMonth(day, monthStart)
                ? styles.disabled
                : isSameDay(day, selectedDate)
                ? styles.selected
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(dateFns.parse(cloneDay))}
          >
            <span className={`${styles.number}`}>{formattedDate}</span>
            {/* <span className={`${styles.bg}`}>{formattedDate}</span> */}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className={`${styles.row}`} key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={`${styles.body} `}>{rows}</div>;
  };

  return (
    <div className={`${styles.calendar} `}>
      <Header></Header>
      <Days></Days>
      <Cells></Cells>
    </div>
  );
}

export default MMSCalender;
