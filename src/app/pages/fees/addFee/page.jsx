"use client";
import { useState } from "react";
import styles from "./page.module.css";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import { getStudents } from "@/app/services/student/studentService";

export default function AddFee() {
  const [classInfo, setClassInfo] = useState();
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [feeType, setFeeType] = useState("Tuition");
  const [status, setStatus] = useState("");

  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);


  async function handleClassData(data) {
    setClassInfo(data);
    setStatus("");
    try {
      const response = await getStudents({ className: data.className, sectionName: data.sectionName });
      setStudents(response.data || []);
      // reset any previous selections
      setSelected({});
      setSelectAll(false);
    } catch (err) {
      console.error(err);
    }
  }

  function toggleSelectAll(checked) {
    const next = {};
    if (checked) {
      students.forEach((s) => (next[s._id] = true));
    }
    setSelected(next);
    setSelectAll(checked);
  }

  function toggleStudent(_id) {
    const next = { ...selected };
    if (next[_id]) delete next[_id];
    else next[_id] = true;
    setSelected(next);
    setSelectAll(students.length > 0 && Object.keys(next).length === students.length);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      className: classInfo?.className,
      sectionName: classInfo?.sectionName,
      dueDate,
      amount,
      remark,
      feeType,
    };
    // TODO: call backend service to persist fee structure
    console.log("Add Fee payload:", payload);
    setStatus("Fee added (mock)");
    // reset form (keeps selected class/section)
    setDueDate("");
    setAmount("");
    setRemark("");
    setFeeType("Tuition");
  }

  console.log("Students:", students);
  console.log("Selected students:", selected);


  function addFee() {  
    // studentIds,amount, description, dueDate, recipientId:staffId, feeType  
    alert("Fee added successfully!");
  }

  return (
    <main className={styles.container}>
      <h2>Add Fee</h2>
      <div className={styles.filterRow}>
        <ClassSecFilter getStudentData={handleClassData} />
      </div>

    {students && students.length > 0 && (
        <div className={styles.studentList}>
          <h3>Students</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Father Name</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!selected[s._id]}
                      onChange={() => toggleStudent(s._id)}
                    />
                  </td>
                  <td>{s._id}</td>
                  <td>{s.name || `${s.fName || ""} ${s.lName || ""}`}</td>
                  <td>{s.fatherName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )}
    
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
            placeholder="0.00"
            required
          />
        </div>

        <div className={styles.row}>
          <label>Fee Type</label>
          <select value={feeType} onChange={(e) => setFeeType(e.target.value)}>
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
          <button type="submit" onClick={addFee} className={styles.btn}>
            Save
          </button>
          <span className={styles.status}>{status}</span>
        </div>
      </form>
    </main>
  );
}
