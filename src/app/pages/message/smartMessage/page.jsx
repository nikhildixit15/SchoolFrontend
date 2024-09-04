"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";


import ClassSecFilter from "@/app/components/classFilter/classSecFilter";
import { getStudents } from "@/app/services/student/studentService";
import StudentTable from "./studentTable";
import MessageBuilderView from "./messageBuilderView";

export default function SmartMessage() {
  const [studentList, setStudentList] = useState();

  const [senderName, setSenderName] = useState();
  const [customText, setCustomText] = useState();

  useEffect(() => {
   // loadCategoryList();
  }, []);

  async function loadCategoryList() {
  }

  async function getStudentData(data) {
    const list = await getStudents(data);
    setStudentList(list);
  }


  function performSendMessageApiCall(selectedList){

    const selectedStudent = selectedList.map((item)=>{
      return ({id:item.id})
    })
    sendMessage({selectedStudent, message:customText, sender:senderName.label})

  }

  function handleSenderSelect(value) {
    setSenderName(value);
  }

  function onMessageTextChanged(event) {
    setCustomText(event.target.value);
  }



  return (
      <main>
        
        <div>
          <div>
          <ClassSecFilter getStudentData={getStudentData}></ClassSecFilter>
          </div>
          <div>
          <MessageBuilderView senderName={senderName}  customText={customText} handleSenderSelect={handleSenderSelect} onMessageTextChanged={onMessageTextChanged}></MessageBuilderView>
          </div>
          <StudentTable
            students={studentList}
            sendMessage={performSendMessageApiCall}
          ></StudentTable>
        </div>
      </main>
  );
}
