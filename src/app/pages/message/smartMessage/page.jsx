"use client";

import { useState } from "react";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import MessageBuilderView from "./messageBuilderView";
import StudentTable from "./studentTable";
import { getStudentsOfClass } from "@/app/services/student/studentService";
import { sendMessage } from "@/app/services/message/messageService";
import styles from "./page.module.css";
import StudentSearch from "@/app/components/studentSearch/studentSearch";
import StudentTableByNAme from "./studentTableByName";
import toast from "react-hot-toast";

export default function SmartMessage() {
  const [studentList, setStudentList] = useState([]);
  const [senderName, setSenderName] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [singleStudent, setSingleStudent] = useState(null);
  const [category, setCategory] = useState("");

  // ⭐ New state to control which table to show
  const [viewMode, setViewMode] = useState(null); // "name" or "class"

  async function getStudentData(data) {
    if (!data?.className || !data?.sectionName) return;

    const res = await getStudentsOfClass({
      className: data.className.label,
      sectionName: data.sectionName.label,
    });

    setStudentList(res.data.students || []);
    setViewMode("class"); // ⭐ Show class table
    setSingleStudent(null); // reset single student
  }

  function categoryPayload(data){
    setMessageText(data.message);
    setCategory(data.category)
  }

  async function performSendMessageApiCall(emailList) {
    const payload = {
      sender: senderName?.label,
      message: messageText,
      students: emailList,
      categoryName:category
    };
console.log("vjhub",payload)
    // const result = await sendMessage(payload);
    // if(result.data.success){
    //   toast.success(result.data.message)
    // }else{
    //   toast.error(res.data.success)
    // }
  }

  function handleStudentSelect(student) {
    setSingleStudent(student);
    setViewMode("name"); // ⭐ Show single student table
    setStudentList([]); // reset class list
  }

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        
        <div className={styles.card3d}>
          <h3 className={styles.title}>Class & Section</h3>
          <ClassSecFilter getStudentData={getStudentData} />

          <div className={styles.container}>
          <label className={styles.label}>Student Name</label>

          <StudentSearch onSelect={handleStudentSelect}  />
          </div>
         
          <h3 className={styles.title}>Message Builder</h3>
          <MessageBuilderView
            senderName={senderName}
            customText={messageText}
            handleSenderSelect={setSenderName}
            onMessageTextChanged={categoryPayload}
          />
        </div>

        {/* ⭐ Conditional Tables */}

        {viewMode === "name" && singleStudent && (
          <StudentTableByNAme
            students={singleStudent}
            onEmailSelect={performSendMessageApiCall}
          />
        )}

        {viewMode === "class" && (
          <div className={styles.card3d}>
            <h3 className={styles.title}>Students</h3>
            <StudentTable
              students={studentList}
              sendMessage={performSendMessageApiCall}
            />
          </div>
        )}

      </div>
    </main>
  );
}
