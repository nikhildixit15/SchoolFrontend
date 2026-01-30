"use client";

import React from "react";
import { useState, useEffect } from "react";
import StudentTable from "./studentCheckbox";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import { getStudentsByClass } from "@/app/services/fees/feeServices";
import { useSearchParams } from "next/navigation";
import { saveStudentParticipant } from "@/app/services/academic/academicService";
import toast from "react-hot-toast";

const page = () => {
  const [classInfo, setClassInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectAll(
      students.length > 0 && Object.keys(selected).length === students.length,
    );
  }, [students, selected]);

  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId"); 

  async function handleClassData(data) {
    setClassInfo(data);

    try {
      const response = await getStudentsByClass({
        className: data.className.value,
        section: data.sectionName.label,
      });

      // ✅ IMPORTANT FIX
      setStudents(response?.data || []);
      setSelected({});
      setSelectAll(false);
    } catch (err) {
      console.error(err);
    }
  }
  /* ================= SEARCH SELECT (FROM StudentSearch) ================= */
  function handleSearchSelect(student) {
    setStudents((prev) => {
      const exists = prev.some((s) => s._id === student._id);
      return exists ? prev : [...prev, student];
    });

    setSelected((prev) => ({
      ...prev,
      [student._id]: true,
    }));
  }

  /* ================= CHECKBOX LOGIC ================= */
  function toggleSelectAll(checked) {
    const next = {};
    if (checked) {
      students.forEach((s) => {
        next[s._id] = true;
      });
    }
    setSelected(next);
    setSelectAll(checked);
  }

  function toggleStudent(_id) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[_id]) delete next[_id];
      else next[_id] = true;
      return next;
    });
  }

  async function saveParticipate(e) {
    e.preventDefault();

    const studentIds = Object.keys(selected);
    if (studentIds.length === 0) {
      setStatus("Please select at least one student");
      return;
    }

    const payload = {
      participantIds:studentIds,
      eventId,
    };
    console.log("Payload",payload)
    const res = await saveStudentParticipant(payload)
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    } 
  }

  return (
    <div>
      <h3>Student Event Participate</h3>
      <ClassSecFilter getStudentData={handleClassData} />
      <h3>OR</h3>
      <StudentSearch onSelect={handleSearchSelect} />
      {students.length > 0 && (
        <StudentTable
          students={students}
          selected={selected}
          selectAll={selectAll}
          onToggleStudent={toggleStudent}
          onToggleSelectAll={toggleSelectAll}
          saveParticipate={saveParticipate}
        />
      )}
    </div>
  );
};

export default page;
