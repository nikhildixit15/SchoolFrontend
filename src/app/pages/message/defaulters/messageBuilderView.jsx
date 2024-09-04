"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";


import MessageTemplateSelector from "@/app/components/messageTemplateSelector/messageTemplateSelector";
import Select from 'react-select';
import { useSelector } from "react-redux";

export default function MessageBuilderView({senderName, customText, handleSenderSelect, onMessageTextChanged}) {

  const teacherList = useSelector((state) => {

    return state.class.teacherList;
  });


  const [senderOptionList, setSenderOptionList] = useState();



  useEffect(() => {
    loadSenderOptionList();
  }, [teacherList]);



  async function loadSenderOptionList() {
    const results = teacherList?.map((item) => {
      return { ...item, value: item.name, label: item.name };
    });
    setSenderOptionList(results);
  }



  return (
        
        <div>

        <div style={styles.customTextMessage}>
        <label>Custom Message:</label>

            <textarea value={customText} onInput={onMessageTextChanged}></textarea>
        </div>
        
  


        </div>
  );
}
