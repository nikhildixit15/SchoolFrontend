import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Select from "react-select";

export default function AddSection({
  classList,
  addSection,
}) {
  const [sectionList, setSectionList] = useState([]);
  const [sectionName, setSectionName] = useState();
  const [className, setClassName] = useState();
  const [classOptionList, setClassOptionList] = useState();

  useEffect(() => {
    loadClassList();
    if(className){
        const selectedClass = classList.find(item=>item._id == className._id )
        setSectionList(selectedClass.sec);
        console.log("###selectedClass", selectedClass);
        setClassName(selectedClass);
    }

  }, [classList]);

  async function loadClassList() {
    const results = classList?.map((item) => {
      return {
        _id: item._id,
        value: item.name,
        label: item.name,
        sec: item.sec
      };
    });

    setClassOptionList(results);
  }

  function addNewSection() {
    const secArr = [...className.sec ]
    secArr.push(sectionName)
    console.log("###className", className)
    const classData = { _id:className._id, sec: secArr, name: className.value }
    addSection(classData);
  }
  function handleClassSelection(value) {
    setClassName(value);
    setSectionList(value.sec)
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
        name="designation"
        onInput={onTextChanged}
      />
      <button onClick={addNewSection}>Add Record</button>

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
            <tr>
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
