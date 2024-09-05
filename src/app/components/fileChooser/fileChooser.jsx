"use client";

import Link from "next/link";
import styles from "./fileChooser.module.css";
import { useRef } from "react";

export default function FileChooser({ onClick }) {
  const inputRef = useRef(null);

  return (
    <div className={styles.chooseFile}>
      <button onClick={() => inputRef.current.click()}> Choose file</button>
      <input
        ref={inputRef}
        type={"file"}
        onInput={onClick}
        multiple
        style={{ display: "none" }}
      ></input>
    </div>
  );
}
