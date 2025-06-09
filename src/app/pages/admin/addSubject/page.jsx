"use client" 
import {  useEffect, useState } from "react";
import styles from "./page.module.css";
import { addSubject, deleteSubject as deleteSubjectApi, getSubjectList } from "@/app/services/admin/adminService";

export default function AddSubject() {
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    const response = await getSubjectList();
    setSubjects(response?.data);
  }

  async function handleAddSubject() {
    if (subjectName.trim() === "") return;
    await addSubject({ subjectName: subjectName });
    setSubjectName("");
    loadSubjects();
  }

  async function handleDeleteSubject(id) {
    await deleteSubjectApi(id);
    loadSubjects();
  }

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.heading}>Add Subject</h2>
      <div className={styles.formRow}>
        <label className={styles.label}>Subject Name</label>
        <input
          className={styles.inputValue}
          value={subjectName}
          onChange={e => setSubjectName(e.target.value)}
          placeholder="Enter Subject Name"
        />
        <button className={styles.saveButton} onClick={handleAddSubject}>
          Add Subject
        </button>
      </div>
      <div className={styles.subjectListSection}>
        <h4 className={styles.subHeading}>Subjects</h4>
        <ul className={styles.subjectList}>
          {subjects?.length === 0 ? (
            <li className={styles.noSubject}>No subjects found.</li>
          ) : (
            subjects?.map((subj, idx) => (
              <li key={subj.id || idx} className={styles.subjectItem}>
                <span className={styles.subjectName}>{subj.subjectName}</span>
                <button className={styles.deleteButton} onClick={() => handleDeleteSubject(subj._id)}>
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
