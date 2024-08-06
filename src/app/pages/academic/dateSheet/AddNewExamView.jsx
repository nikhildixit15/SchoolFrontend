import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";

export default function AddNewExamView({ addData }) {
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

  function createSectionOptionList(value) {
    const list = [];
    const result = value.sec;
    result.map((item) => {
      list.push({ value: item, label: item });
    });

    setSectionOptionList(list);
  }

  function onDatedSelected(event) {
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
          <label>Select Class:</label>
          <Select
            className={styles.classDropdown}
            value={className}
            onChange={handleClassSelect}
            options={classOptionList}
          />
        </div>
        <div className={styles.dropdownContainer}>
          <span>Select Section:</span>
          <Select
            className={styles.classDropdown}
            value={sectionName}
            onChange={handleSectionSelect}
            options={sectionOptionList}
          />
        </div>

        <div className={styles.dropdownContainer}>
          <span>Select Subject:</span>
          <Select
            className={styles.classDropdown}
            value={sectionName}
            onChange={handleSectionSelect}
            options={sectionOptionList}
          />
        </div>

        <div className={styles.dropdownContainer}>
          <span>Select Test:</span>
          <Select
            className={styles.classDropdown}
            value={sectionName}
            onChange={handleSectionSelect}
            options={sectionOptionList}
          />
        </div>

        <input type="input" name="syllabus"></input>

        <button
          onClick={() => getStudentData({ className, sectionName })}
          className={styles.btn}
        >
          Add Test
        </button>
      </div>
    </>
  );
}
