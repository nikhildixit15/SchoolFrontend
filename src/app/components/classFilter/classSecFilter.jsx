import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./classSecFilter.module.css";
import { useSelector } from "react-redux";
import { ClassSection, SelectOption } from "@/app/types/commonTypes";

export default function ClassSecFilter({ getStudentData }) {
  const [className, setClassName] = useState();
  const [sectionName, setSectionName] = useState();
  const [classOptionList, setClassOptionList] = useState();
  const [sectionOptionList, setSectionOptionList] = useState();

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
        value: item.name,
        label: item.name,
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
          onClick={() => getStudentData({ className, sectionName })}
          className={styles.btn}
        >
          Get data
        </button>
      </div>
    </>
  );
}
