"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";

export default function AddEvent({ addEvent }) {
  const [className, setClassName] = useState();
  const [eventDate, setEventDate] = useState();
  const [description, setDescription] = useState();
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classOptionList, setClassOptionList] = useState([]);

  const classes = useSelector((state) => state.class.classes);

  useEffect(() => {
    console.log(classes);
    createOptionList();
  }, [classes]);

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
    setSelectedClasses([value.label]);
  }

  function onDatedSelected(event) {
    setEventDate(event.target.value);
    console.log("onDatedSelected", event.target.value);
  }

  function onTextChanged(event) {
    setDescription(event.target.value);
    console.log("onDatedSelected", event.target.value);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.dropdownContainer}>
          <label>Choose Date:</label>
          <input type="date" id="date" name="date" onInput={onDatedSelected} />
        </div>
        <div className={styles.dropdownContainer}>
          <label>Write Message:</label>
          <input type="input" id="date" name="date" onInput={onTextChanged} />
        </div>
        <div className={styles.dropdownContainer}>
          <label>Select Standard:</label>
          <Select
            className={styles.classDropdown}
            value={className}
            onChange={handleClassSelect}
            options={classOptionList}
          />
        </div>

        <button
          onClick={() =>
            addEvent({ eventDate, description, classes: selectedClasses })
          }
          className={styles.btn}
        >
          Add Event
        </button>
      </div>
    </>
  );
}
