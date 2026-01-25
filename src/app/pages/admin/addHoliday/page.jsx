"use client"
import React, { useState } from "react";
import styles from "./page.module.css";
import { addHoliday } from "@/app/services/admin/adminService";

const HolidayPage = () => {
  const [holidays, setHolidays] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isRecurring: false,
    applicableTo: ["All"],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleApplicableChange = (e) => {
    const options = [...e.target.options]
      .filter(o => o.selected)
      .map(o => o.value);
    setForm({ ...form, applicableTo: options });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setHolidays([...holidays, { ...form, createdAt: new Date() }]);
    console.log("response", form);
    const response = await addHoliday(form);
    console.log("response", response);
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      isRecurring: false,
      applicableTo: ["All"],
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h1 className={styles.title}>🎉 Holiday Management</h1>
          <p>Add & manage holidays</p>
        </div>

        {/* Add Holiday */}
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <input
              className={`${styles.input} ${styles.smallInput}`}
              name="title"
              placeholder="Holiday Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              className={`${styles.input} ${styles.smallInput}`}
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              className={`${styles.input} ${styles.smallInput}`}
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />

            <select 
              className={`${styles.select} ${styles.smallInput}`}
              value={form.applicableTo}
              onChange={handleApplicableChange}
            >
              <option value="All">All</option>
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <textarea
            className={styles.textarea}
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="isRecurring"
              checked={form.isRecurring}
              onChange={handleChange}
            />
            <label>Recurring every year</label>
          </div>

          <button className={styles.btn}>Save Holiday</button>
        </form>

        {/* Holiday List */}
        <div className={styles.list}>
          {holidays.map((h, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTitle}>{h.title}</div>
              <p>{h.description}</p>
              <small>
                {new Date(h.startDate).toDateString()} →{" "}
                {new Date(h.endDate).toDateString()}
              </small>
              <div>
                {h.applicableTo.map((a) => (
                  <span key={a} className={styles.badge}>{a}</span>
                ))}
                {h.isRecurring && (
                  <span className={styles.badge}>Recurring</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HolidayPage;
