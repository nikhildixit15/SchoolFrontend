"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getClassWiseTimeTable } from "@/app/services/timeTable/timeTableService";
import Select from "react-select";
import { useSelector } from "react-redux";
import ClassWiseTimeTable from "./classWiseTimeTable";

export default function ClassWise() {
  const [tableData, setTableData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [classOptionList, setClassOptionList] = useState([]);
  const [sectionOptionList, setSectionOptionList] = useState([]);

  const classList = useSelector((state) => state.class.classes);

  useEffect(() => {
    createClassOptionList();
  }, [classList]);

  // ✅ Create Class Dropdown
  function createClassOptionList() {
    const list = classList?.map((item) => ({
      value: item._id,
      label: item.name,
      sections: item.sections, // full section array
    }));

    setClassOptionList(list || []);
  }

  // ✅ When user selects Class
  function handleClassSelect(selected) {
    setSelectedClass(selected);
    setSelectedSection(null); // reset section dropdown

    const secList = selected.sections?.map((sec) => ({
      value: sec._id,
      label: sec.name,
      classId: selected.value,
      sectionId: sec._id,
    }));

    setSectionOptionList(secList || []);
  }

  // ✅ When user selects Section
  function handleSectionSelect(selected) {
    setSelectedSection(selected);
  }

  // ✅ When user clicks Search button
  function handleSubmit() {
    if (!selectedClass || !selectedSection) return;

    const data = {
      classId: selectedSection.classId,
      sectionId: selectedSection.sectionId,
    };
    getTableData(data);
  }

  // ✅ API Call Function
  async function getTableData(data) {
    try {
      const result = await getClassWiseTimeTable(data);

      setTableData(result.data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setTableData([]);
    }
  }
  return (
    <>
      <main>
        <div>
          {/* Class Dropdown */}
          <div className={styles.dropdownContainer}>
            <label>Class Name:</label>
            <Select
              className={styles.classDropdown}
              value={selectedClass}
              onChange={handleClassSelect}
              options={classOptionList}
              placeholder="Select Class"
            />
          </div>

          {/* Section Dropdown */}
          {selectedClass && (
            <div className={styles.dropdownContainer}>
              <label>Section Name:</label>
              <Select
                className={styles.classDropdown}
                value={selectedSection}
                onChange={handleSectionSelect}
                options={sectionOptionList}
                placeholder="Select Section"
              />
            </div>
          )}

          {/* Search Button */}
          {selectedSection && <button onClick={handleSubmit}>Search</button>}
        </div>

        {/* Table Component */}
        <ClassWiseTimeTable tableData={tableData} />
      </main>
    </>
  );
}
