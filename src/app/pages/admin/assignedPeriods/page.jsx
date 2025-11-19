"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { getClassOptionList, getOptionList } from "@/app/utils/optionListUtils";
import { daysList,periodNumber } from "@/app/utils/constants";
import { addPeriodInTimeTable } from "@/app/services/timeTable/timeTableService";

export default function AssignedPeriods() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

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
    if (selectedClass && selectedClass.sections) {
      const list = selectedClass.sections.map((item) => ({
        value: item.name,
        label: item.name,
        id:item._id
      }));
      setSectionOptionList(list);
    } else {
      setSectionOptionList([]);
    }
    console.log("###periodOptionList", selectedSection);
  }, [selectedClass,selectedSection]); 

  function handleAddPeriod() {
    if (
      !selectedClass ||
      !selectedSection ||
      !selectedTeacher ||
      !selectedSubject ||
      !selectedDay ||
      !selectedPeriod
    ) {
      alert("Please fill all fields.");
      return;
    }
    const payload = {
      classId: selectedClass.id,
      sectionId: selectedSection.id, // 👈 section ki actual _id bhejna hoga
      day: selectedDay.value,
      schedule: [
        {
          periodId: selectedPeriod.value,
          subjectId: selectedSubject.id,
          teacherId: selectedTeacher.id,
        },
      ],
    };
    console.log("Payload for adding period:", payload);
    addPeriodInTimeTable(payload);
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
        <label>Select Day</label>
        <Select
          value={selectedDay}
          onChange={setSelectedDay}
          options={daysList.map((day) => ({
            value: day.dayName,
            label: day.dayName,
          }))}
          placeholder="Select Day"
        />
      </div>
      <div className={styles.formRow}>
        <label>Select Period Number</label>
        <Select
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          options={periodNumber.map((num) => ({
            value: num.value,
            label: num.label,
          }))}
          placeholder="Select Period Number"
        />
      </div>
      <button className={styles.saveButton} onClick={handleAddPeriod}>
        Add Period
      </button>
    </div>
  );
}
