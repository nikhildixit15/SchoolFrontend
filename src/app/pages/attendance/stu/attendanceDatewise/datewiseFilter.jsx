import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import {
  getClassOptionList,
  getSectionOptionList,
} from "@/app/utils/optionListUtils";
import { attendanceTypeList } from "@/app/utils/constants";

export default function AttendanceFilter({ getStudentData }) {
  const [className, setClassName] = useState(null);
  const [sectionName, setSectionName] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [classOptionList, setClassOptionList] = useState([]);
  const [sectionOptionList, setSectionOptionList] = useState([]);

  const classes = useSelector((state) => state.class.classes);

  useEffect(() => {
    setClassOptionList(getClassOptionList(classes));
  }, [classes]);

  function handleClassSelect(value) {
    setClassName(value);
    setSectionName(null);
    setSectionOptionList(getSectionOptionList(value));
  }
function handleTypeList(selectedOption){
  setStatus(selectedOption); // selectedOption has { value, label }
}

  function handleGetData() {
    if (!fromDate || !toDate || !className || !sectionName) {
      alert("Please select all fields");
      return;
    }

    getStudentData({
      fromDate,
      toDate,
      className: className.value,
      section: sectionName.value,
      status:status.value
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.dropdownContainer}>
        <label>From Date:</label>
        <input
          type="date"
          id="fromDate"
          onChange={(e) => setFromDate(e.target.value)}
        />

        <label>To Date:</label>
        <input
          type="date"
          id="toDate"
          onChange={(e) => setToDate(e.target.value)}
        />

        <label>Attendance Type:</label>
        <Select
          value={status}
          onChange={handleTypeList}
          options={attendanceTypeList}
        />
        <label>Class:</label>
        <Select
          value={className}
          onChange={handleClassSelect}
          options={classOptionList}
        />

        <label>Section:</label>
        <Select
          value={sectionName}
          onChange={setSectionName}
          options={sectionOptionList}
          isDisabled={!className}
        />
      <button className={styles.btn} onClick={handleGetData}>
        Get data
      </button>
      </div>

    </div>
  );
}
