"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function DownloadExcel() {
  return (
    <>
      <main>
        <div>
          <h1>This download excel page</h1>
          <Link href={"/pages/login"}>Got to Login</Link>
        </div>
      </main>
    </>
  );
}
