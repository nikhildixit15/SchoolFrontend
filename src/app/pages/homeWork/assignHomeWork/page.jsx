"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import toast from "react-hot-toast";
import { getSubjectList } from "@/app/services/admin/adminService";
import { saveHomeWorkByClass } from "@/app/services/homeWork/homeWorkServices";
import { useSelector } from "react-redux";

export default function HomeworkPage() {
  const [selectedClass, setSelectedClass] = useState({
    classId: "",
    className: "",
  });

  const [selectedSection, setSelectedSection] = useState({
    sectionId: "",
    sectionName: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [homework, setHomework] = useState({});
  const [showSubjects, setShowSubjects] = useState(false);

  const AssignId = useSelector((state) => state.auth.userId);
  console.log("Assign", AssignId);

  const handleSubmit = async (data) => {
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
    setShowSubjects(true);

    await loadSubjects(classObj.classId, sectionObj.sectionId);
  };

  async function loadSubjects(classId, sectionId) {
    const response = await getSubjectList(classId); // Do correct here

    const classDoc = response?.data?.find((cls) => cls.classId === classId);

    if (!classDoc) {
      setSubjects([]);
      return;
    }

    const section = classDoc.sections.find(
      (sec) => sec.sectionId === sectionId
    );

    setSubjects(section?.subjects || []);
  }

  const handleAssign = async () => {
    try {
      const payload = {
        class: selectedClass.classId,
        className: selectedClass.className,
        section: selectedSection.sectionId,
        sectionName: selectedSection.sectionName,
        userId: AssignId,

        subjects: Object.entries(homework).map(([subjectId, content]) => {
          const subjectObj = subjects.find((s) => s._id === subjectId);

          return {
            subject: subjectId,
            subjectName: subjectObj?.name || "", // ✅ FIX
            content: content, // ✅ FIX
          };
        }),
      };

      console.log("Homework", homework);
      console.log("Payload", payload);
      const res = await saveHomeWorkByClass(payload);
      toast.success(res.data.message);
      handleReset();
    } catch (error) {
      if (error.response) {
        // ✅ Backend error (400)
        toast.error(error.response.data.message);
      } else {
        // ❌ Network / unknown error
        toast.error("Something went wrong");
      }
    }
  };

  const handleReset = () => {
    setSelectedClass({ classId: "", className: "" });
    setSelectedSection({ sectionId: "", sectionName: "" });
    setShowSubjects(false);
    setHomework({});
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Homework Assignment</h1>

        {!showSubjects ? (
          <ClassSecFilter getStudentData={handleSubmit} />
        ) : (
          <div className={styles.subjects}>
            <div className={styles.infoBox}>
              <strong>Class:</strong> {selectedClass.className} &nbsp;
              <strong>Section:</strong> {selectedSection.sectionName}
            </div>

            <h2 className={styles.subtitle}>Subjects</h2>

            {subjects.length === 0 ? (
              <p>No subjects found</p>
            ) : (
              subjects.map((subject) => (
                <div key={subject._id} className={styles.formGroup}>
                  <label>{subject.name}</label>

                  <textarea
                    rows="3"
                    placeholder={`Enter homework for ${subject.name}`}
                    value={homework[subject._id] || ""}
                    onChange={(e) =>
                      setHomework((prev) => ({
                        ...prev,
                        [subject._id]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))
            )}

            <div className={styles.buttonRow}>
              <button className={styles.successBtn} onClick={handleAssign}>
                Assign Homework
              </button>
              <button className={styles.resetBtn} onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
