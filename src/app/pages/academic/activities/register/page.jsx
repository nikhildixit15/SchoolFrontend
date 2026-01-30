"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

const RegisterPage = () => {
  const [role, setRole] = useState("");

  const router = useRouter();

  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
console.log("Register Event", eventId)
  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);

    // 👉 Direct navigation on click
    router.push(
      `/pages/academic/activities/register/${selectedRole.toLowerCase()}?eventId=${eventId}`,
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Event Registration</h2>
        <p className={styles.subtitle}>Choose your role</p>

        <div className={styles.roleGroup}>
          {["Student", "Teacher", "Audience"].map((item) => (
            <div
              key={item}
              className={`${styles.roleCard} ${
                role === item ? styles.active : ""
              }`}
              onClick={() => handleSelectRole(item)}
            >
              <h4>{item}</h4>
              <span className={styles.arrow}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
