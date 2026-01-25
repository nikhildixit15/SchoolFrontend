"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  addSubject,
  deleteSubject,
  getSubjectList,
} from "@/app/services/admin/adminService";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";

export default function AddSubject() {
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [showSubjects, setShowSubjects] = useState(false);

  const [selectedClass, setSelectedClass] = useState({
    classId: "",
    className: ""
  });

  const [selectedSection, setSelectedSection] = useState({
    sectionId: "",
    sectionName: ""
  });

  useEffect(() => {
    if (showSubjects) loadSubjects();
  }, [showSubjects]);

  // 🔹 Load only subjects of selected class & section
  async function loadSubjects() {
  const response = await getSubjectList(selectedClass.classId);

  const classList = response?.data || [];

  // 🔹 find class document
  const classDoc = classList.find(
    cls => cls.classId === selectedClass.classId
  );

  if (!classDoc) {
    setSubjects([]);
    return;
  }

  // 🔹 find section
  const section = classDoc.sections.find(
  sec => sec.sectionName === selectedSection.sectionName
);


  setSubjects(section?.subjects || []);
}


  async function handleSubmit(data) {
    setSelectedClass({
      classId: data.className.id,
      className: data.className.label
    });

    setSelectedSection({
      sectionId: data.sectionName.value,
      sectionName: data.sectionName.label
    });

    setShowSubjects(true);
  }

  async function handleAddSubject() {
    if (!subjectName.trim()) return;

    try {
      await addSubject({
        classId: selectedClass.classId,
        className: selectedClass.className, 
        sectionName: selectedSection.sectionName,
        subjectName
      });

      setSubjectName("");
      loadSubjects();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add subject");
    }
  }

  async function handleDeleteSubject(subjectName) {
    await deleteSubject({
      classId: selectedClass.classId,
      sectionName: selectedSection.sectionName,
      subjectName
    });
    loadSubjects();
  }

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.heading}>Add Subject</h2>

      {!showSubjects ? (
        <ClassSecFilter getStudentData={handleSubmit} />
      ) : (
        <div>
          <div className={styles.infoBox}>
            <strong>Class:</strong> {selectedClass.className} &nbsp;
            <strong>Section:</strong> {selectedSection.sectionName}
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Subject Name</label>
            <input
              className={styles.inputValue}
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter Subject Name"
            />
            <button className={styles.saveButton} onClick={handleAddSubject}>
              Add Subject
            </button> 
          </div>

          <div className={styles.subjectListSection}>
            <h4 className={styles.subHeading}>Subjects</h4>

            <ul className={styles.subjectList}>
              {subjects.length === 0 ? (
                <li className={styles.noSubject}>No subjects found.</li>
              ) : (
                subjects.map((subj) => (
                  <li key={subj._id} className={styles.subjectItem}>
                    <span className={styles.subjectName}>{subj.name}</span>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteSubject(subj.name)}
                    >
                      Delete
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
