"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { getClassOptionList, getOptionList } from "@/app/utils/optionListUtils";

export default function AssignedPeriods() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const classes = useSelector((state) => state.class.classes);
  const teacherList = useSelector((state) => state.class.teacherList);
  const subjectList = useSelector((state) => state.class.subjectList);

  const [classOptionList, setClassOptionList] = useState([]);
  const [sectionOptionList, setSectionOptionList] = useState([]);
  const [teacherOptionList, setTeacherOptionList] = useState([]);
  const [subjectOptionList, setSubjectOptionList] = useState([]);

  // Populate class, teacher, subject options from redux
  useEffect(() => {
    setClassOptionList(getClassOptionList(classes));
    setTeacherOptionList(getOptionList(teacherList));
    setSubjectOptionList(getOptionList(subjectList));
  }, [classes, teacherList, subjectList]);

  // When class changes, update section options
  useEffect(() => {
    if (selectedClass && selectedClass.sec) {
      const list = selectedClass.sec.map((item) => ({ value: item, label: item }));
      setSectionOptionList(list);
    } else {
      setSectionOptionList([]);
    }
  }, [selectedClass]);

  function handleAddPeriod() {
    // Add period logic here
    alert("Period assigned!");
  }

  return (
    <div className={styles.mainContainer}>
      <h2>Assign Periods</h2>
      <div className={styles.formRow}>
        <label>Select Class</label>
        <Select
          value={selectedClass}
          onChange={setSelectedClass}
          options={classOptionList}
          placeholder="Select Class"
        />
      </div>
      <div className={styles.formRow}>
        <label>Select Section</label>
        <Select
          value={selectedSection}
          onChange={setSelectedSection}
          options={sectionOptionList}
          placeholder="Select Section"
        />
      </div>
      <div className={styles.formRow}>
        <label>Select Teacher</label>
        <Select
          value={selectedTeacher}
          onChange={setSelectedTeacher}
          options={teacherOptionList}
          placeholder="Select Teacher"
        />
      </div>
      <div className={styles.formRow}>
        <label>Select Subject</label>
        <Select
          value={selectedSubject}
          onChange={setSelectedSubject}
          options={subjectOptionList}
          placeholder="Select Subject"
        />
      </div>
      <div className={styles.formRow}>
        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
      </div>
      <div className={styles.formRow}>
        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />
      </div>
      <button className={styles.saveButton} onClick={handleAddPeriod}>
        Add Period
      </button>
    </div>
  );
}
