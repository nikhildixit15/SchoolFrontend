"use client";

import { useState } from "react";
import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import MessageBuilderView from "./messageBuilderView";
import StudentTable from "./studentTable";
import { getStudentsOfClass } from "@/app/services/student/studentService";
import { sendMessage } from "@/app/services/message/messageService";
import styles from "./page.module.css"

export default function SmartMessage() {
  const [studentList, setStudentList] = useState([]);
  const [senderName, setSenderName] = useState(null);
  const [messageText, setMessageText] = useState("");

  async function getStudentData(data) {
    if (!data?.className || !data?.sectionName) return;

    const res = await getStudentsOfClass({
      className: data.className.label,
      sectionName: data.sectionName.label,
    });

    setStudentList(res.data.students || []);
  }

async function performSendMessageApiCall(emailList) {
  const payload = {
    sender: senderName?.label,
    message: messageText,
    students: emailList, // already emails
  };

  console.log("SEND PAYLOAD", payload);
  await sendMessage(payload);
}



  return (
     
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.card3d}>
          <h3 className={styles.title}>Class & Section</h3>
          <ClassSecFilter getStudentData={getStudentData} />
        </div>

        <div className={styles.card3d}>
          <h3 className={styles.title}>Message Builder</h3>
          <MessageBuilderView
            senderName={senderName}
            customText={messageText}
            handleSenderSelect={setSenderName}
            onMessageTextChanged={setMessageText}
          />
        </div>

        <div className={styles.card3d}>
          <h3 className={styles.title}>Students</h3>
          <StudentTable
            students={studentList}
            sendMessage={performSendMessageApiCall}
          />
        </div>
      </div>
    </main>
  );
}
