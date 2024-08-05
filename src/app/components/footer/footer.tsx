"use client";

import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <h1 className={styles.description}>This is custom footer</h1>
    </div>
  );
}
