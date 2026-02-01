"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StaffProfile from "@/app/components/staffProfile/staffProfile";
import StudentProfile from "@/app/components/studentProfile/page";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  
  const { studentId, staffId, role } = useSelector((state) => state.auth);
  console.log("Student",studentId)
  console.log("Staff",staffId)
  console.log("Role",role)
useEffect(() => setMounted(true), []);
if (!mounted) return null; 

return (
  <>
      {!role && <p>Loading...</p>}

      {role === "student" && <StudentProfile studentId={studentId} />}
      {role === "teacher" && <StaffProfile staffId={staffId} />}
    </>
  );
}
