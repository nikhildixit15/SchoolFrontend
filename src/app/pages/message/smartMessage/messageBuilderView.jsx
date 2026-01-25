"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageTemplateSelector from "@/app/components/messageTemplateSelector/messageTemplateSelector";
 

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
        }))
      );
    }
  }, [teacherList]);

  return (
    <div>
      <label>Sender</label>
      <Select
        value={senderName}
        onChange={handleSenderSelect}
        options={senderOptionList}
      />

      {/* 🔥 TEMPLATE SELECTOR */}
      <MessageTemplateSelector onMessageSelect={onMessageTextChanged} />

      <h3>OR</h3>

      <label>Custom Message</label>
      <textarea
        value={customText || ""}
        onChange={(e) => onMessageTextChanged(e.target.value)}
      />
    </div>
  );
}
