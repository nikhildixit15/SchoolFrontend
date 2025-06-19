import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import { getClassOptionList } from "@/app/utils/optionListUtils";

export default function AttendanceFilter({ getStudentData }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date
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
    setClassOptionList(getClassOptionList(classes));
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
   const str = new Date(event.target.value).toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
    setSelectedDate(str);
    console.log("onDatedSelected", str);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.dropdownContainer}>
          <label>Date:</label>
          <input type="date" id="date" name="date" value={selectedDate} onInput={onDatedSelected} />
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
          onClick={() => getStudentData({selectedDate:selectedDate, classId:className.id, className: className.value, section: sectionName.value})}
          className={styles.btn}
        >
          Get data
        </button>
      </div>
    </>
  );
}
