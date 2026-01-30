"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { getOptionList } from "@/app/utils/optionListUtils";
import { saveStaffParticipant } from "@/app/services/academic/academicService";
import toast from "react-hot-toast";
import styles from "./page.module.css";

const Page = () => {
  const [staffOptionList, setStaffOptionList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);

  const staffList = useSelector((state) => state.class.teacherList);

  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    setStaffOptionList(getOptionList(staffList));
  }, [staffList]);

  const handleSave = async () => {
    if (selectedStaff.length === 0) {
      toast.error("Please select at least one staff");
      return;
    }

    const participantIds = selectedStaff.map((item) => item.id);

    const payload = {
      eventId,
      participantIds,
    };

    try {
      const res = await saveStaffParticipant(payload);
      if (res.data.success) {
        toast.success(res.data.message);
        setSelectedStaff([]);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Staff Event Participation</h3>

      <div className={styles.selectBox}>
        <Select
          isMulti
          value={selectedStaff}
          placeholder="Select Staff"
          options={staffOptionList}
          onChange={setSelectedStaff}
        />
      </div>

      <button
        onClick={handleSave}
        className={styles.button}
        disabled={!eventId}
      >
        Save Participants
      </button>
    </div>
  );
};

export default Page;
