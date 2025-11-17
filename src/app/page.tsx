"use client";
import { useState } from "react";
import TeacherDashboard from "./components/teacherDashboard/teacherDashboard";
import Login from "./pages/login/page";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main>
      {isLoggedIn ? (
        <TeacherDashboard />
      ) : (
        <Login />
      )}
    </main>
  );
}
