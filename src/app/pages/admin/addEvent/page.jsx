"use client"

import React, { useState } from "react";
import styles from "./page.module.css";
import { addEvent } from "@/app/services/admin/adminService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddEvent = () => {
  const loginUser = useSelector((state)=> state.auth.userId)
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    audience: ["All"], 
    role: "Audience",
    status: "Scheduled",
    targetClass: [], 
    createdBy:loginUser
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      audience: checked
        ? [...prev.audience, value]
        : prev.audience.filter((v) => v !== value),
    }));
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Optional: basic frontend validation
    if (!form.title || !form.date || !form.startTime) {
      toast.error("Please fill all required fields");
      return;
    }
 
    const res = await addEvent(form);
    toast.success("Event created successfully 🎉"); 
    setForm({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      audience: ["All"],
      role: "Audience",
      status: "Scheduled",
      targetClass: [],
      createdBy:loginUser
    });
  } catch (error) { 
    toast.error(
      error?.response?.data?.message || "Failed to create event"
    );
  }
};


  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h1 className={styles.title}>📅 Create New Event</h1>
          <p>Add school / college events</p>
        </div>

        <form className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <input
              className={styles.input}
              name="title"
              placeholder="Event Title"
              required
              value={form.title}
              onChange={handleChange}
            />

            <input
              type="date"
              className={styles.input}
              name="date"
              required
              value={form.date}
              onChange={handleChange}
            />

            <input
              type="time"
              className={styles.input}
              name="startTime"
              required
              value={form.startTime}
              onChange={handleChange}
            />

            <input
              type="time"
              className={styles.input}
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
            />

            <input
              className={styles.input}
              name="location"
              placeholder="Location"
              required
              value={form.location}
              onChange={handleChange}
            />

            <select
              className={styles.select}
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option>Performer</option>
              <option>Volunteer</option>
              <option>Guest</option>
              <option>Audience</option>
            </select>

            <select
              className={styles.select}
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <textarea
            className={styles.textarea}
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
          /> 

          <h4>Audience</h4>
          <div className={styles.checkboxGroup}>
            {["All", "Students", "Teachers", "Parents"].map((a) => (
              <label key={a}>
                <input
                  type="checkbox"
                  value={a}
                  checked={form.audience.includes(a)}
                  onChange={handleCheckbox}
                />
                {a}
              </label>
            ))}
          </div>
 
          <button className={styles.btn}>Save Event</button>
        </form>

      </div>
    </div>
  );
};

export default AddEvent;
