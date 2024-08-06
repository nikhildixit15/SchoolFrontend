"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div>
        <h1>This Home page</h1>

        <Link href={"/pages/student/studentList"}>Got to Login</Link>
      </div>
    </main>
  );
}
