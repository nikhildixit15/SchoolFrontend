import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { useSelector } from "react-redux";

export default function AddSection({ classList, addSection }) {
  const [sectionList, setSectionList] = useState([]);
  const [sectionName, setSectionName] = useState();
  const [className, setClassName] = useState();
  const [classOptionList, setClassOptionList] = useState();

  const state = useSelector((state) => state.class.classes);

  function sectioData(value) {
    state.map((sec) => {
      const selectedClass = state.find((cls) => cls._id === value._id);
      if (selectedClass) {
        const sections = selectedClass.sections?.map((sec) => sec.name ) || [];
        setSectionList(sections);
      } else {
        setSectionList([]);
      }
    });
  }

  useEffect(() => {
    loadClassList();
  }, [classList]);

  async function loadClassList() {
    const results = classList?.map((item) => {
      return {
        _id: item._id,
        value: item.name,
        label: item.name,
        code: item.code,
      };
    });

    setClassOptionList(results);
  }

  function addNewSection() {
     if (sectionList.includes(sectionName)) {
    alert(`Section "${sectionName}" already exists in ${className.label}`);
    return;
  }
    const sectionData = {
      name: sectionName,
      classCode: className.code,
      classTeacherId: "68c08f38d107101376272bb8",
    };
    console.log("###sectionData", sectionData);
    addSection(sectionData);
    setSectionList([...sectionList, sectionName]);
    setSectionName("");
  }

  function handleClassSelection(value) {
    setClassName(value);
    sectioData(value);
  }

  function onTextChanged(event) {
    setSectionName(event.target.value);
  }
  return (
    <div>
      <div className={styles.dropdownContainer}>
        <span>Class:</span>
        <Select
          className={styles.classDropdown}
          value={className}
          onChange={handleClassSelection}
          options={classOptionList}
        />
      </div>
      <label>Section</label>

      <input
        className={styles.departmentInput}
        value={sectionName || ""}
        onInput={onTextChanged}
        disabled={!className}
      />
      <button onClick={addNewSection} disabled={!sectionName}>Add Record</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Section Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sectionList?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
