"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import StudentTable from "./studentTable";

import {
  addFeeByAdmin,
  getStudentsByClass,
} from "@/app/services/fees/feeServices";
import toast from "react-hot-toast";

export default function AddFee() {
  /* ================= BASIC STATES ================= */
  const [classInfo, setClassInfo] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [feeType, setFeeType] = useState("Tuition");
 
  /* ================= STUDENT STATES ================= */
  const [students, setStudents] = useState([]); // ✅ ALWAYS ARRAY
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  /* ================= CLASS + SECTION FILTER ================= */
  async function handleClassData(data) {
    setClassInfo(data);
 
    try {
      const response = await getStudentsByClass({
        className: data.className.value,
        section: data.sectionName.label,
      });

      // ✅ IMPORTANT FIX
      setStudents(response?.data || []);
      setSelected({});
      setSelectAll(false);
    } catch (err) {
      console.error(err);
    }
  }

  /* ================= SEARCH SELECT (FROM StudentSearch) ================= */
  function handleSearchSelect(student) {
    setStudents((prev) => {
      const exists = prev.some((s) => s._id === student._id);
      return exists ? prev : [...prev, student];
    });

    setSelected((prev) => ({
      ...prev,
      [student._id]: true,
    }));
  }

  /* ================= CHECKBOX LOGIC ================= */
  function toggleSelectAll(checked) {
    const next = {};
    if (checked) {
      students.forEach((s) => {
        next[s._id] = true;
      });
    }
    setSelected(next);
    setSelectAll(checked);
  }

  function toggleStudent(_id) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[_id]) delete next[_id];
      else next[_id] = true;
      return next;
    });
  }

  useEffect(() => {
    setSelectAll(
      students.length > 0 &&
        Object.keys(selected).length === students.length
    );
  }, [students, selected]);

  /* ================= SUBMIT ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    const studentIds = Object.keys(selected);
    if (studentIds.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    const payload = {
      className: classInfo?.className?.value,
      sectionName: classInfo?.sectionName?.label,
      dueDate,
      amount,
      remark,
      feeType,
      studentIds,
    };

    try {
      const res = await addFeeByAdmin(payload); 
      toast.success(res.data.message)
 
      setDueDate("");
      setAmount("");
      setRemark("");
      setFeeType("Tuition");
    } catch (err) {
       toast.error("Something went wrong");
    }
  }

  return (
    <main className={styles.container}>
      <h2>Add Fee</h2>

      {/* ================= CLASS FILTER ================= */}
      <div className={styles.filterRow}>
        <ClassSecFilter getStudentData={handleClassData} />
      </div>

      <strong>OR</strong>

      {/* ================= STUDENT SEARCH ================= */}
      <StudentSearch onSelect={handleSearchSelect} />

      {/* ================= STUDENT TABLE ================= */}
      {students.length > 0 && (
        <StudentTable
          students={students}
          selected={selected}
          selectAll={selectAll}
          onToggleStudent={toggleStudent}
          onToggleSelectAll={toggleSelectAll}
        />
      )}

      {/* ================= FORM ================= */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <label>Fee Type</label>
          <select
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
          >
            <option>Tuition</option>
            <option>Exam</option>
            <option>Transport</option>
            <option>Misc</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Remark</label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            rows={3}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit">Save</button>
         </div>
      </form>
    </main>
  );
}
