"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Defaulters() {
  return (
    <>
      <main>
        <div>
          <h1>This Defaulter Student page</h1>
          <Link href={"/pages/login"}>Got to Login</Link>
        </div>
      </main>
    </>
  );
}
