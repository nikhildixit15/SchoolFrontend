"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { saveAudienceParticipant } from "@/app/services/academic/academicService";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const MessageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });

const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId"); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { name, email, mobile } = formData;
    if (!name || !email || !mobile ) {
      alert("Please fill all fields");
      return;
    }
  const res = await saveAudienceParticipant({
    name, email, mobile, eventId
  });
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    } 
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Book Event Sheet</h3>

      <div className={styles.inputGroup}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Mobile Number</label>
        <input
          type="tel"
          name="mobile"
          placeholder="Enter mobile number"
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>

      <button className={styles.submitBtn} type="submit">
        Submit
      </button>
    </form>
  );
};

export default MessageForm;
