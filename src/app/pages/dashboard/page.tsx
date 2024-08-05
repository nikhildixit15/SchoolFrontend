"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect } from "react";
import { getProfileData } from "@/app/services/dashboard/dashboardService";
export default function Dashboard() {
  useEffect(() => {
    loadProfileData();
  }, []);

  function loadProfileData() {
    const data = getProfileData();
    console.log(data);
  }

  return (
    <>
      <main>
        <div className={styles.description}>
          <div className={styles.title1}>This Dashboard page</div>
          <Link href={"/pages/login"}>Go to Login</Link>
        </div>
      </main>
    </>
  );
}
