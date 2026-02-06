"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import MessageBuilderView from "@/app/components/messageBuilderView/messageBuilder";

import StaffFilter from "./StaffFilter";
import StaffTable from "./staffTable";
import { getStaffList } from "@/app/services/staff/staffService";
import StaffSearch from "@/app/components/staffSearch/page";
import StaffTableByNAme from "./stafTable";

export default function MessageToStaff() {
  const [staffList, setStaffList] = useState([]);
  const [singleStaffMember, setSingleStaffMember] = useState([]);

  const [senderName, setSenderName] = useState();
  const [customText, setCustomText] = useState();

  useEffect(() => {}, []);

  async function getStaffData(data) {
    const list = await getStaffList(data);
    setStaffList(list);
  }

  function performSendMessageApiCall(selectedList) {
    const selectedStaff = selectedList.map((item) => {
      return { id: item.id };
    });
    sendMessage({
      selectedStaff,
      message: customText,
      sender: senderName.label,
    });
  }

  function handleSenderSelect(value) {
    setSenderName(value);
  }

  function onMessageTextChanged(event) {
    setCustomText(event.target.value);
  }

  function handleStaffSelect(staff) {
    console.log("Syvuyv", staff);
    setSingleStaffMember(staff);
  }

  return (
    <main>
      <div>
        <StaffFilter getData={getStaffData}></StaffFilter>
        <StaffSearch onSelect={handleStaffSelect} />

        <div>
          <MessageBuilderView
            senderName={senderName}
            customText={customText}
            handleSenderSelect={handleSenderSelect}
            onMessageTextChanged={onMessageTextChanged}
          ></MessageBuilderView>
        </div>
        <div>
          <StaffTableByNAme staffs={singleStaffMember} />
        </div>
        <StaffTable
          staffData={staffList}
          sendMessage={performSendMessageApiCall}
        ></StaffTable>
      </div>
    </main>
  );
}
