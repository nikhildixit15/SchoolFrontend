"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { getClassOptionList, getOptionList } from "@/app/utils/optionListUtils";
import { daysList, periodNumber } from "@/app/utils/constants";
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

  /* ---------- Options Setup ---------- */

  useEffect(() => {
    setClassOptionList(getClassOptionList(classes));
    setTeacherOptionList(getOptionList(teacherList));
  }, [classes, teacherList]);

  useEffect(() => {
    if (!selectedClass?.sections) {
      setSectionOptionList([]);
      setSelectedSection(null);
      return;
    }

    const sections = selectedClass.sections.map((sec) => ({
      value: sec.name,
      label: sec.name,
      id: sec._id,
    }));

    setSectionOptionList(sections);
    setSelectedSection(null);
  }, [selectedClass]);

  useEffect(() => {
    if (!selectedClass || !selectedSection) {
      setSubjectOptionList([]);
      setSelectedSubject(null);
      return;
    }

    const classData = subjectList.find(
      (item) => item.classId === selectedClass.id
    );

    const sectionData = classData?.sections.find(
      (sec) => sec.sectionId === selectedSection.id
    );

    if (!sectionData?.subjects) {
      setSubjectOptionList([]);
      return;
    }

    const subjects = sectionData.subjects.map((sub) => ({
      value: sub._id,
      label: sub.name,
      id: sub._id,
    }));

    setSubjectOptionList(subjects);
    setSelectedSubject(null);
  }, [selectedClass, selectedSection, subjectList]);

  /* ---------- Submit ---------- */

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
      sectionId: selectedSection.id,
      day: selectedDay.value,
      schedule: [
        {
          periodId: selectedPeriod.value,
          subjectId: selectedSubject.id,
          teacherId: selectedTeacher.id,
        },
      ],
    };

    addPeriodInTimeTable(payload);
  }

  /* ---------- UI ---------- */

  return (
    <div className={styles.mainContainer}>
      <h2>Assign Periods</h2>

      <SelectBlock label="Select Class" value={selectedClass} onChange={setSelectedClass} options={classOptionList} />
      <SelectBlock label="Select Section" value={selectedSection} onChange={setSelectedSection} options={sectionOptionList} />
      <SelectBlock label="Select Teacher" value={selectedTeacher} onChange={setSelectedTeacher} options={teacherOptionList} />
      <SelectBlock label="Select Subject" value={selectedSubject} onChange={setSelectedSubject} options={subjectOptionList} />

      <SelectBlock
        label="Select Day"
        value={selectedDay}
        onChange={setSelectedDay}
        options={daysList.map((d) => ({ value: d.dayName, label: d.dayName }))}
      />

      <SelectBlock
        label="Select Period Number"
        value={selectedPeriod}
        onChange={setSelectedPeriod}
        options={periodNumber}
      />

      <button className={styles.saveButton} onClick={handleAddPeriod}>
        Add Period
      </button>
    </div>
  );
}

/* ---------- Reusable Select ---------- */

function SelectBlock({ label, value, onChange, options }) {
  return (
    <div className={styles.formRow}>
      <label>{label}</label>
      <Select value={value} onChange={onChange} options={options} />
    </div>
  );
}
