"use client";

import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./messageTemplateSelector.module.css";
import {
  getCategoryList,
  getTemplateMessage,
} from "@/app/services/message/messageService";

export default function MessageTemplateSelector({ onMessageSelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [categoryOptionList, setCategoryOptionList] = useState([]);
  const [messageTemplateList, setMessageTemplateList] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const res = await getCategoryList();
    setCategoryOptionList(
      res.data.map((item) => ({
        value: item._id,
        label: item.categoryName,
      }))
    );
  }

  async function handleCategorySelect(category) {
    setSelectedCategory(category);
    setSelectedMessage(null);

    const res = await getTemplateMessage({
      categoryName: category.label,
    });

    const options = res.data.flatMap((cat) =>
      cat.categoryMessage.map((msg) => ({
        value: msg._id,
        label: msg.message,
        message: msg.message,
      }))
    );

    setMessageTemplateList(options);
  }

  function handleMessageSelect(message) {
    setSelectedMessage(message);

    onMessageSelect({message:message.message, category:selectedCategory}); // 🔥 SEND UP
  }

  return (
    <div className={styles.container}>
      <label>Category</label>
      <Select
        value={selectedCategory}
        onChange={handleCategorySelect}
        options={categoryOptionList}
        placeholder="Select category"
      />

      <label>Message</label>
      <Select
        value={selectedMessage}
        onChange={handleMessageSelect}
        options={messageTemplateList}
        placeholder="Select message"
        isDisabled={!messageTemplateList.length}
      />
    </div>
  );
}
