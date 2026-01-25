"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./classSecFilter.module.css";
import { useSelector } from "react-redux";
import { getClassOptionList } from "@/app/utils/optionListUtils";
import toast from "react-hot-toast";

export default function ClassSecFilter({ getStudentData }) {
  const [className, setClassName] = useState(null);
  const [sectionName, setSectionName] = useState(null);
  const [classOptionList, setClassOptionList] = useState([]);
  const [sectionOptionList, setSectionOptionList] = useState([]); 

  const classes = useSelector((state) => state.class.classes);

  useEffect(() => {
    const list = getClassOptionList(classes);
    setClassOptionList(list);
  }, [classes]);

  function handleClassSelect(value) {
    setClassName(value);
    setSectionName(null);    
    createSectionOptionList(value);
  }

  function createSectionOptionList(data) {
    const selectedClass = classes.find(
      (c) => c.name === data.value
    );

    if (selectedClass) {
      const list = selectedClass.sections.map((sec) => ({
        value: sec._id,
        label: sec.name,
      }));
      setSectionOptionList(list);
    } else {
      setSectionOptionList([]);
    }
  }

  function handleSectionSelect(selected) {
    setSectionName(selected); 
  }

  function handleSubmit() {
    if (!className || !sectionName) {
      toast.error("Please select both class and section");
      return;
    }

    getStudentData({ className, sectionName });
  }

  return (
    <div className={styles.container}>
      <div className={styles.dropdownContainer}>
        <label>Class:</label>
        <Select
          className={styles.classDropdown}
          value={className}
          onChange={handleClassSelect}
          options={classOptionList}
          placeholder="Select Class"
          instanceId="class-sec-filter-class"
        />
      </div>

      <div className={styles.dropdownContainer}>
        <label>Section:</label>
        <Select
          className={styles.classDropdown}
          value={sectionName}
          onChange={handleSectionSelect}
          options={sectionOptionList}
          placeholder="Select Section"
          isDisabled={!className}
          instanceId="class-sec-filter-section"
        />
      </div>

      <button onClick={handleSubmit} className={styles.btn}>
        Get data
      </button>
    </div>
  );
}
