"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { Calendar, Clock } from "lucide-react";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import {
  addExamSchedule,
  getSubjectList,
} from "@/app/services/admin/adminService";
import toast from "react-hot-toast";

const ExamScheduler = () => {
  const [selectedClass, setSelectedClass] = useState({
    classId: "",
    className: "",
  });

  const [selectedSection, setSelectedSection] = useState({
    sectionId: "",
    sectionName: "",
  });

  const [examType, setExamType] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [examSchedules, setExamSchedules] = useState({});

  // ✅ Called from ClassSecFilter
  const handleClassSection = async (data) => {
    if (!data?.className || !data?.sectionName) {
      toast.error("Please select class and section");
      return;
    }

    const classObj = {
      classId: data.className.id,
      className: data.className.label,
    };

    const sectionObj = {
      sectionId: data.sectionName.value,
      sectionName: data.sectionName.label,
    };

    setSelectedClass(classObj);
    setSelectedSection(sectionObj);
    setExamSchedules({});

    await loadSubjects(classObj.classId, sectionObj.sectionId);
  };

  // ✅ Load subjects from backend
  async function loadSubjects(classId, sectionId) {
    const response = await getSubjectList();

    const classDoc = response?.data?.find((cls) => cls.classId === classId);

    if (!classDoc) {
      setSubjects([]);
      return;
    }

    const section = classDoc.sections.find(
      (sec) => sec.sectionId === sectionId,
    );

    setSubjects(section?.subjects || []);
  }

  // ✅ FIXED: subjectId used as unique key
  const handleScheduleChange = (subjectId, field, value) => {
    setExamSchedules((prev) => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [field]: value,
      },
    }));
  };

  // ✅ Submit Handler
  const handleSubmit = async () => {
    const subjectSchedules = subjects.map((sub) => ({
      subjectId: sub._id,
      subjectName: sub.name,
      date: examSchedules[sub._id]?.date || "",
      startTime: examSchedules[sub._id]?.startTime || "",
      endTime: examSchedules[sub._id]?.endTime || "",
    }));

    const payload = {
      classId: selectedClass.classId,
      className: selectedClass.className,
      sectionId: selectedSection.sectionId,
      sectionName: selectedSection.sectionName,
      examType,
      subjects: subjectSchedules,
    };
    console.log("FINAL PAYLOAD", payload);

    try {
      const res = await addExamSchedule(payload);
      setSelectedClass({ className: "" });

      if (res?.data?.success) {
        toast.success(res.data.message || "Exam schedule saved successfully!");
      } else {
        toast.error(res?.data?.message || "Failed to save exam schedule");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>📘 Exam Scheduler</h1>

          <ClassSecFilter getStudentData={handleClassSection} />

          {selectedClass.classId && selectedSection.sectionId ? (
            <>
              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>
                  Class {selectedClass.className} – Section{" "}
                  {selectedSection.sectionName}
                </h3>
                <p className={styles.infoText}>
                  Set exam date & time for each subject
                </p>
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Exam Type</label>
                <input
                  className={styles.input }
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  placeholder="Half Tearly / Annualy"
                />
              </div>

              <div className={styles.subjectList}>
                {subjects.map((subject, index) => (
                  <div key={subject._id} className={styles.subjectCard}>
                    <div className={styles.subjectHeader}>
                      <span className={styles.subjectIndex}>{index + 1}</span>
                      {subject.name}
                    </div>

                    <div className={styles.subjectGrid}>
                      <div>
                        <label className={styles.label}>
                          <Calendar size={14} /> Date
                        </label>
                        <input
                          type="date"
                          className={styles.input}
                          value={examSchedules[subject._id]?.date || ""}
                          onChange={(e) =>
                            handleScheduleChange(
                              subject._id,
                              "date",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div>
                        <label className={styles.label}>
                          <Clock size={14} /> Start Time
                        </label>
                        <input
                          type="time"
                          className={styles.input}
                          value={examSchedules[subject._id]?.startTime || ""}
                          onChange={(e) =>
                            handleScheduleChange(
                              subject._id,
                              "startTime",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div>
                        <label className={styles.label}>
                          <Clock size={14} /> End Time
                        </label>
                        <input
                          type="time"
                          className={styles.input}
                          value={examSchedules[subject._id]?.endTime || ""}
                          onChange={(e) =>
                            handleScheduleChange(
                              subject._id,
                              "endTime",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.buttonRow}>
                <button className={styles.primaryBtn} onClick={handleSubmit}>
                  Save Schedule
                </button>

                <button
                  className={styles.secondaryBtn}
                  onClick={() => {
                    setSelectedClass({ classId: "", className: "" });
                    setSelectedSection({ sectionId: "", sectionName: "" });
                    setSubjects([]);
                    setExamSchedules({});
                  }}
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <Calendar size={64} className={styles.emptyIcon} />
              <p>Select class & section to start scheduling</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamScheduler;
