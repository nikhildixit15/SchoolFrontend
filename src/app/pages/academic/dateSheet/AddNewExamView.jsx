import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";

export default function AddNewExamView({ addData }) {
  const [examDate, setExamDate] = useState();
  const [syllabus, setSyllabus] = useState();

  const [className, setClassName] = useState();
  const [sectionName, setSectionName] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedExamType, setSelectedExamType] = useState();
  const [classOptionList, setClassOptionList] = useState();
  const [sectionOptionList, setSectionOptionList] = useState();
  const [subjectOptionList, setSubjectOptionList] = useState();
  const [examTypesOptionList, setExamTypesOptionList] = useState();

  const { classes, examTypeList, subjectList } = useSelector((state) => {
    const { classes, examTypeList, subjectList } = state.class;
    return { classes, examTypeList, subjectList };
  });
  console.log("####23454657", examTypeList);

  useEffect(() => {
    console.log(classes);
    createClassOptionList();
    createExamTypeOptionList();
    createSubjectOptionList();
  }, [classes, examTypeList, subjectList]);

  function createClassOptionList() {
    const list = [];
    classes?.map((item) => {
      list.push({ ...item, value: item.className, label: item.className });
    });
    setClassOptionList(list);
  }

  function createExamTypeOptionList() {
    const list = [];
    examTypeList?.map((item) => {
      list.push({ ...item, value: item.name, label: item.name });
    });
    setExamTypesOptionList(list);
  }

  function createSubjectOptionList() {
    const list = [];
    subjectList?.map((item) => {
      list.push({ ...item, value: item.name, label: item.name });
    });
    setSubjectOptionList(list);
  }

  function handleClassSelect(value) {
    setClassName(value);
    createSectionOptionList(value);
  }

  function handleSectionSelect(value) {
    setSectionName(value);
  }

  function handleExamTypeSelect(value) {
    setSelectedExamType(value);
  }

  function handleSubjectSelect(value) {
    setSelectedSubject(value);
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
    setExamDate(event.target.value);
  }

  function onSyllabusChanged(event) {
    setSyllabus(event.target.value);
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
            value={selectedSubject}
            onChange={handleSubjectSelect}
            options={subjectOptionList}
          />
        </div>

        <div className={styles.dropdownContainer}>
          <span>Select Test:</span>
          <Select
            className={styles.classDropdown}
            value={selectedExamType}
            onChange={handleExamTypeSelect}
            options={examTypesOptionList}
          />
        </div>

        <span>Write Syllabus:</span>

        <input
          type="input"
          name="syllabus"
          value={syllabus}
          onInput={onSyllabusChanged}
        ></input>

        <button
          onClick={() =>
            addData({
              class: className.label,
              section: sectionName.label,
              examType: selectedExamType.label,
              subject: selectedSubject.label,
              examDate,
              syllabus,
            })
          }
          className={styles.btn}
        >
          Add Test
        </button>
      </div>
    </>
  );
}
