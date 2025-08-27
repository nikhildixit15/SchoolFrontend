"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./classSecFilter.module.css";
import { useSelector } from "react-redux";
import { monthList } from "@/app/utils/constants";

export default function MonthClassFilter({ getData }) {
  const [className, setClassName] = useState();
  const [sectionName, setSectionName] = useState();
  const [classOptionList, setClassOptionList] = useState();
  const [sectionOptionList, setSectionOptionList] = useState();

  const classes = useSelector((state) => state.class.classes);

  const [monthOptionList, setMonthOptionList] = useState();

  const [monthName, setMonthName] = useState();

  useEffect(() => {
    console.log(classes);
    createOptionList();
    createMonthOptionList();
  }, [classes]);

  function createMonthOptionList() {
    const list = monthList.map((item) => {
      return {
        label: item.monthName,
        value: item.monthName,
        monthCount: item.monthCount,
      };
    });
    setMonthOptionList(list);
  }

  function createOptionList() {
    const list = [];
    classes.map((item) => {
      list.push({
        id: item.id,
        value: item.className,
        label: item.className,
        sec: item.sec,
      });
    });
    setClassOptionList(list);
  }

  function handleClassSelect(value) {
    setClassName(value);
    createSectionOptionList(value);
  }

  function handleSectionSelect(value) {
    setSectionName(value);
  }

  function handleMonthSelect(value) {
    setMonthName(value);
  }

  function createSectionOptionList(value) {
    const list = [];
    const result = value.sec;
    result.map((item) => {
      list.push({ value: item, label: item });
    });

    setSectionOptionList(list);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.dropdownContainer}>
          <label>Select Month</label>
          <Select
            className={styles.classDropdown}
            value={monthName}
            onChange={handleMonthSelect}
            options={monthOptionList}
          />
        </div>
        <div className={styles.dropdownContainer}>
          <label>Class:</label>
          <Select
            className={styles.classDropdown}
            value={className}
            onChange={handleClassSelect}
            options={classOptionList}
          />
        </div>
        <div className={styles.dropdownContainer}>
          <span>Section:</span>
          <Select
            className={styles.classDropdown}
            value={sectionName}
            onChange={handleSectionSelect}
            options={sectionOptionList}
          />
        </div>

        <button
          onClick={() => getData({ className, sectionName, monthName })}
          className={styles.btn}
        >
          Get data
        </button>
      </div>
    </>
  );
}
