"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import { getHomeWorkByClass } from "@/app/services/homeWork/homeWorkServices";
import HomeWorkList from "./homeWorkList"; // Homework card component
import style from "./page.module.css"

export default function HomeworkPage() {
  const [selectedDate, setSelectedDate] = useState( new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState({ classId: "", className: "" });
  const [selectedSection, setSelectedSection] = useState({ sectionId: "", sectionName: "" });
  const [homeworkData, setHomeworkData] = useState([]); // Subjects to display

  // Handle filter submit
 const handleSubmit = async (data) => {
  if (!data?.className || !data?.sectionName) {
    toast.error("Please select class and section");
    return;
  }

  const classObj = { classId: data.className.id, className: data.className.label };
  const sectionObj = { sectionId: data.sectionName.value, sectionName: data.sectionName.label };

  setSelectedClass(classObj);
  setSelectedSection(sectionObj);

  const payload = {
    classId: classObj.classId,
    sectionId: sectionObj.sectionId,
    date: selectedDate,
  };

  try {
    const response = await getHomeWorkByClass(payload); 

    if (response?.data?.success) {
      setHomeworkData(response.data.data || []); // ✅ Correct path to subjects
    } else {
      setHomeworkData([]);
      toast.error(response?.data?.message || "No homework found");
    }
  } catch (error) {
    console.error(error);
    setHomeworkData([]);
    toast.error("Failed to fetch homework");
  }
};


  return (
    <div >
      {/* Date picker */}
      <div className={style.filterRow}>
        <label >Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      <ClassSecFilter getStudentData={handleSubmit} />
      </div> 
      <HomeWorkList data={homeworkData} />
    </div>
  );
}
