import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import { getClassOptionList, getSectionOptionList} from "@/app/utils/optionListUtils";
import { getMonthOptions } from "@/app/utils/constants";

export default function AttendanceFilter({ getStudentData }) {
  const [className, setClassName] = useState(null);
  const [sectionName, setSectionName] = useState(null);
  const [monthName, setMonthName] = useState(null);

  const [classOptionList, setClassOptionList] = useState([]);
  const [sectionOptionList, setSectionOptionList] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);

  const classes = useSelector((state) => state.class.classes);

  useEffect(() => {
    // ✅ create month options once
    const currentYear = new Date().getFullYear();
    setMonthOptions(getMonthOptions(currentYear));
    setClassOptionList(getClassOptionList(classes));
  }, [classes]);

  function handleClassSelect(value) {
    setClassName(value);
    setSectionName(null);
    setSectionOptionList(getSectionOptionList(value));
  }

  function handleSectionSelect(value) {
    setSectionName(value);
  }

  function handleMonthSelect(data) {
    setMonthName(data);
    console.log(data)
  }

  function handleGetData() {
    if (!className || !sectionName || !monthName) {
      alert("Please select Month, Class and Section");
      return;
    }

    getStudentData({
      className: className.value,
      section: sectionName.label,
      attendanceDate: monthName.value, // "2025-12-01"
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.dropdownContainer}>
        <label>Month:</label>
        <Select
          className={styles.classDropdown}
          value={monthName}
          onChange={handleMonthSelect}
          options={monthOptions}
          placeholder="Select Month"
        />
    
 
        <label>Class:</label>
        <Select
          className={styles.classDropdown}
          value={className}
          onChange={handleClassSelect}
          options={classOptionList}
          placeholder="Select Class"
        />
       
 
        <label>Section:</label>
        <Select
          className={styles.classDropdown}
          value={sectionName}
          onChange={handleSectionSelect}
          options={sectionOptionList}
          placeholder="Select Section"
        />

      <button onClick={handleGetData} className={styles.btn}>
        Get data
      </button>
      </div>
    </div>
  );
}
