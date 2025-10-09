"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import Accordion from "react-bootstrap/Accordion";
import { addMessageInTemplate, deleteTemplateMessage, getTemplateMessageList } from "@/app/services/message/messageService";

export default function addTemplateMessage({ tableData }) {
  const [message, setMessage] = useState();
  const [selectedCategoryName, setSelectedCategoryName] = useState();
  const [categoryOptionList, setCategoryOptionList] = useState();
  const [templateList, setTemplateList] = useState();


  useEffect(() => {
    loadCategoryOptionList();
    getTemplateMessages()
  }, [tableData]);

   function loadCategoryOptionList() {
    const results = tableData?.map((item) => {
      return { ...item, value: item.name, label: item.name };
    });
    setCategoryOptionList(results);
  }

  async function getTemplateMessages() {
    const list = await getTemplateMessageList();
    setTemplateList(list)
  }

  function deleteTemplateMessageItem() {
    deleteTemplateMessage({
      id:  1,
    });
  }
  function handleCategorySelect(value) {
    setSelectedCategoryName(value);
  }

  function onTextChanged(event) {
    setMessage(event.target.value);
  }

  function addNewTemplateMessage(){
    addMessageInTemplate({templateId:selectedCategoryName.id, message:message})
  }


  return (
    <div>
      <div className={styles.dropdownContainer}>
        <span>Category:</span>
        <Select
          className={styles.classDropdown}
          value={selectedCategoryName}
          onChange={handleCategorySelect}
          options={categoryOptionList}
        />
      </div>
      <label>Message</label>

      <input
        className={styles.departmentInput}
        name="message"
        onInput={onTextChanged}
      />
      <button onClick={addNewTemplateMessage}>Add Record</button>
      {templateList?.map((template,index) => (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey={""+index}>
            <Accordion.Header>{template.name}</Accordion.Header>
            <Accordion.Body>
              {template?.descriptionList?.map((item) => (
                <div>
                  <div className={styles.itemContainer}>
                  <label className={styles.listItem}>{item.message}</label>
                   <button onClick={()=>deleteTemplateMessageItem(item.id)}>delete</button>
                  </div>
                  <div className={styles.divider}></div>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
}
