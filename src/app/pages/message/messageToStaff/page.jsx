"use client";

import { useState } from "react";
import MessageBuilderView from "@/app/components/messageBuilderView/messageBuilder";
import StaffFilter from "./StaffFilter";
import StaffTable from "./staffTable";
import StaffSearch from "@/app/components/staffSearch/page";
import { getStaffByDepart } from "@/app/services/staff/staffService";
import { sendMessage } from "@/app/services/message/messageService";
import { toast } from "react-hot-toast";

export default function MessageToStaff() {
  const [staffList, setStaffList] = useState([]);
  const [singleStaffMember, setSingleStaffMember] = useState([]);
  const [category, setCategory] = useState("");
  const [senderName, setSenderName] = useState(null);
  const [customText, setCustomText] = useState("");

  function normalizeStaff(staff) {
    return {
      id: staff._id,
      name: `${staff.basicInfo?.firstName || staff.firstName || ""} ${staff.basicInfo?.lastName ||staff.lastName || ""}`.trim() ,
      fatherName: staff.familyInfo?.fatherName || staff.fatherName || "-",
      department: staff.profileDetails?.department || staff.department || "-",
      designation: staff.profileDetails?.designation || staff.designation || "-",
      mobileNumber: staff.basicInfo?.mobileNumber || staff.mobileNumber || "-",
      email: staff.basicInfo?.email ||staff.email || "",
      employeeId: staff.adminInfo?.employeeId || staff.employeeId || "-",
      isSelected: false,
    };
  }

  // 🏢 Department / designation search
  async function getStaffData(filter) {
    const res = await getStaffByDepart(filter);
    const rawList = res?.data || [];
    const normalizedList = rawList.map(normalizeStaff);
    setStaffList(normalizedList);
  }

  // 🔍 Search by name
  function handleStaffSelect(staff) {
    const normalized = normalizeStaff(staff);
    setSingleStaffMember([normalized]);
    setStaffList([]);
  }

  // 📩 Message builder callback
  function categoryPayload(data) {
    if (data.message !== undefined) {
      setCustomText(data.message);
    }
    if (data.category !== undefined) {
      setCategory(data.category);
    }
  }

  // 🚀 FINAL SEND MESSAGE
  async function performSendMessageApiCall(selectedStaff) {
      console.log("befnei", selectedStaff)
    if (!customText.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    const payload = {
      sender: senderName?.label,
      message: customText,
      categoryName: category,
      students:selectedStaff.ids,
      emails:selectedStaff.emails,
    };
    console.log("Data", payload)

    const result = await sendMessage(payload);

    if (result?.data?.success) {
      toast.success(result.data.message);
    } else {
      toast.error("Failed to send message");
    }
  }

  return (
    <main>
      <StaffFilter getData={getStaffData} />
      <StaffSearch onSelect={handleStaffSelect} />

      <MessageBuilderView
        senderName={senderName}
        customText={customText}
        handleSenderSelect={setSenderName}
        onMessageTextChanged={categoryPayload}
      />

      {/* 🔍 Search by name */}
      {singleStaffMember.length > 0 && (
        <StaffTable
          staffData={singleStaffMember}
          sendMessage={performSendMessageApiCall}
        />
      )}

      {/* 🏢 Search by department/designation */}
      {staffList.length > 0 && (
        <StaffTable
          staffData={staffList}
          sendMessage={performSendMessageApiCall}
        />
      )}
    </main>
  );
}
