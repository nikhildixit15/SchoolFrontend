"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./classSecFilter.module.css";
import { useSelector } from "react-redux";
import { ClassSection, SelectOption } from "@/app/types/commonTypes";
import { getClassOptionList } from "@/app/utils/optionListUtils";

export default function ClassSecFilter({ getStudentData }) {
  const [className, setClassName] = useState();
  const [sectionName, setSectionName] = useState();
  const [classOptionList, setClassOptionList] = useState();
  const [sectionOptionList, setSectionOptionList] = useState();

  const classes = useSelector((state) => state.class.classes);

  useEffect(() => {
    console.log(classes);
    const list = getClassOptionList(classes);
    setClassOptionList(list);
  }, [classes]);

  function handleClassSelect(value) {
    //console.log(value)
    setClassName(value);
    createSectionOptionList(value);
  }
 
  function createSectionOptionList(data) {
    // find class by name and build sections
    const selectedClass = classes.find((c) => c.name === data.value);
    if (selectedClass) {
      const list = selectedClass.sections.map((sec) => ({
        value: sec._id,
        label: sec.name,
      }));
      setSectionOptionList(list); 
    }
  }

  // section select
  function handleSectionSelect(selected) {
    setSectionName(selected);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.dropdownContainer}>
          <label>Class:</label>
          <Select
            className={styles.classDropdown}
            value={className}
            onChange={handleClassSelect}
            options={classOptionList}
            instanceId="class-sec-filter-class"
          />
        </div>
        <div className={styles.dropdownContainer}>
          <span>Section:</span>
          <Select
            className={styles.classDropdown}
            value={sectionName}
            onChange={handleSectionSelect}
            options={sectionOptionList}
            instanceId="class-sec-filter-section"
          />
        </div>

        <button
          onClick={() => getStudentData({ className, sectionName })}
          className={styles.btn}
        >
          Get data
        </button>
      </div>
    </>
  );
}
