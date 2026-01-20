"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import Accordion from "react-bootstrap/Accordion";
import {
  deleteTemplateMessage,
  getTemplateMessageList,
  addTemplateMessage,
} from "@/app/services/message/messageService";

export default function AddTemplateMessage({ tableData }) {
  const [message, setMessage] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [categoryOptionList, setCategoryOptionList] = useState([]);
  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    loadCategoryOptionList();
    getTemplateMessages();
  }, [tableData]);

  function loadCategoryOptionList() {
    const unique = new Map();

    tableData?.forEach((item) => {
      unique.set(item.categoryName, {
        value: item._id,
        label: item.categoryName,
        categoryName: item.categoryName,
      });
    });

    setCategoryOptionList([...unique.values()]);
  }

  async function getTemplateMessages() {
    const list = await getTemplateMessageList();
    setTemplateList(list.data || []);
  }

  async function deleteTemplateMessageItem(templateId, messageId) {
    await deleteTemplateMessage({ templateId, messageId });
    getTemplateMessages();
  }

  async function addNewTemplateMessage() {
    if (!selectedCategoryName || !message.trim()) return;

    await addTemplateMessage({
      categoryName: selectedCategoryName.categoryName,
      message,
    });

    setMessage("");
    getTemplateMessages();
  }

  return (
    <div > 
      {/* CATEGORY SELECT */}
      <div className={styles.dropdownContainer}>
        <span className={styles.selectLabel}>Category:</span>

        <Select
          value={selectedCategoryName}
          onChange={setSelectedCategoryName}
          options={categoryOptionList}
          className={styles.customSelect}
          classNamePrefix="react-select"  // 🔥 REQUIRED
        />
      </div>

      {/* MESSAGE INPUT */}
      <label className={styles.formLabel}>Message</label>
      <input
        className={styles.departmentInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />

      {/* BUTTON */}
      <button
        className={styles.actionButton}
        onClick={addNewTemplateMessage}
      >
        Add Record
      </button>

      {/* ACCORDION */}
      <Accordion className={styles.styledAccordion}>
        {templateList.map((template, index) => (
          <Accordion.Item eventKey={String(index)} key={template._id}>
            <Accordion.Header>
              {template.categoryName}
            </Accordion.Header>

            <Accordion.Body>
              {template.categoryMessage?.map((item) => (
                <div key={item._id}>
                  <div className={styles.itemContainer}>
                    <label>{item.message}</label>

                    <button
                      onClick={() =>
                        deleteTemplateMessageItem(template._id, item._id)
                      }
                    >
                      Delete
                    </button>
                  </div>

                  <div className={styles.divider} />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
