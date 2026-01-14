"use client";
import React from "react";
import styles from "./page.module.css"; // CSS module

const HomeWorkList = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No homework assigned yet.</p>;
  }

  return (
    <div className={styles.list}>
      {data.map((item) => (
        <div key={item._id} className={styles.card}>
          <h3 className={styles.subjectName}>{item.subjectName}<p className={styles.assignedBy}>
            Assigned by: {item.assignedBy}
          </p></h3>
          <p className={styles.content}>{item.content}</p>
          
        </div>
      ))}
    </div>
  );
};

export default HomeWorkList;
