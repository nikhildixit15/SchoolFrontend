"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./messageTemplateSelector.module.css";
import {  getTemplateMessageList } from "@/app/services/message/messageService";

export default function MessageTemplateSelector({ getStudentData }) {
  const [categoryName, setCategoryName] = useState();
  const [templateMessage, setTemplateMessage] = useState();
  const [categoryOptionList, setCategoryOptionList] = useState();



  useEffect(() => {
    getTemplateMessages();
  }, []);

  async function getTemplateMessages() {
    const list = await getTemplateMessageList();
    loadCategoryOptionList(list);
  }


  async function loadCategoryOptionList(list) {
    const results = list?.map((item) => {
      return { ...item, value: item.name, label: item.name };
    });
    setCategoryOptionList(results);
  }


  function handleCategorySelect(value) {
    setCategoryName(value);
    setTemplateMessage(value.descriptionList[0].message)
  }

  function onTextChanged(event){
    setTemplateMessage(event.target.value)
  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.dropdownContainer}>
          <label>Category:</label>
          <Select
            className={styles.classDropdown}
            value={categoryName}
            onChange={handleCategorySelect}
            options={categoryOptionList}
          />
        </div>


        <textarea disabled={true}  value={templateMessage} type="input" onInput={onTextChanged}></textarea>
      </div>
    </>
  );
}
