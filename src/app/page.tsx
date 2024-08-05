"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./page.module.css";
import { useEffect } from "react";
import { classList } from "@/mocks";
import { setClasses } from "./redux/slices/classSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setClasses(classList));
  }, []);
  return (
    <main>
      <div>
        <h1>This Home page</h1>

        <Link href={"/pages/student/studentList"}>Got to Login</Link>
      </div>
    </main>
  );
}
