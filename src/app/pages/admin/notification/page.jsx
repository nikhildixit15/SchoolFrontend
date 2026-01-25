"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./page.module.css"; // CSS file for styling
import toast from "react-hot-toast";
import StudentSearch from "@/app/components/studentSearch/studentSearch";

const NotificationForm = () => {
  const [studentId, setStudentId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSendNotification = async () => {
    if (!studentId || !title || !body) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/notification/sendNotification", {
        studentId,
        title,
        body,
      });

      if (res.data.success) {
        toast.success("Notification sent successfully!");
        setTitle("");
        setBody("");
      } else {
        toast.error(res.data.message || "Failed to send notification");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error: Could not send notification");
    }
  };
 
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Send Notification</h2> 
      <div className={styles.field}>
        <label>Student ID</label>
        <input
          type="text"
          placeholder="Enter student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Notification title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Message</label>
        <textarea
          placeholder="Notification body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button className={styles.btn} onClick={handleSendNotification}>
        Send Notification
      </button>
    </div>
  );
};

export default NotificationForm;
