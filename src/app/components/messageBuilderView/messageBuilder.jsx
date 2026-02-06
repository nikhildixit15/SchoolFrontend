"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageTemplateSelector from "../messageTemplateSelector/messageTemplateSelector"; 
import styles from "./messageBuilder.module.css";

export default function MessageBuilderView({
  senderName,
  customText,
  handleSenderSelect,
  onMessageTextChanged,
}) {
  const teacherList = useSelector((state) => state.class.teacherList);
  const [senderOptionList, setSenderOptionList] = useState([]);

  useEffect(() => {
    if (teacherList?.length) {
      setSenderOptionList(
        teacherList.map((t) => ({
          ...t,
          value: t.name,
          label: t.name,
        })),
      );
    }
  }, [teacherList]);

  return (
    <div>
      <div className={styles.container}>
        <label>Sender</label>
        <Select
          value={senderName}
          onChange={handleSenderSelect}
          options={senderOptionList}
        />
      </div>

      {/* 🔥 TEMPLATE SELECTOR */}
      <MessageTemplateSelector onMessageSelect={onMessageTextChanged} />
      <div className={styles.container}>
        <h3 className={styles.title}>OR</h3>

        <label>Custom Message</label>
        <textarea
          className={styles.customTextarea}
          value={customText || ""}
          onChange={(e) => onMessageTextChanged(e.target.value)}
        />
      </div>
    </div>
  );
}
