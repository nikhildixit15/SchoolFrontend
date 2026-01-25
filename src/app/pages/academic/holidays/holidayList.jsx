"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { deleteHoliday } from "@/app/services/academic/academicService";
import { monthList } from "@/app/utils/constants";
 
const HolidayListPage = ({ listData }) => {
  const [allHolidays, setAllHolidays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  // ✅ sync props → state
  useEffect(() => {
    if (Array.isArray(listData)) {
      setAllHolidays(listData);
      setHolidays(listData);
    }
  }, [listData]);

  // 🔽 Month filter logic
  useEffect(() => {
    if (selectedMonth === "") {
      setHolidays(allHolidays);
    } else {
      const filtered = allHolidays.filter((h) => {
        const month = new Date(h.startDate).getMonth();
        return month === Number(selectedMonth);
      });
      setHolidays(filtered);
    }
  }, [selectedMonth, allHolidays]);

  // 🗑️ Delete Handler
  const handleDelete = async(id) => {  
    setAllHolidays((prev) => prev.filter((h) => h._id !== id));
    setHolidays((prev) => prev.filter((h) => h._id !== id));
    await deleteHoliday(id);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>🎉 Holiday List</h1>

        {/* 🔽 Month Select */}
        <div className={styles.filterRow}>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {monthList.map((m, i) => (
              <option key={i} value={i}>{m.monthName}</option>
            ))}
          </select>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Applicable To</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {holidays.length === 0 ? (
                <tr>
                  <td colSpan="8" className={styles.empty}>
                    No holidays found
                  </td>
                </tr>
              ) : (
                holidays.map((h, index) => (
                  <tr key={h._id}>
                    <td>{index + 1}</td>
                    <td className={styles.bold}>{h.title}</td>
                    <td>{h.description || "-"}</td>
                    <td>{new Date(h.startDate).toLocaleDateString()}</td>
                    <td>{new Date(h.endDate).toLocaleDateString()}</td>
                    <td>
                      {h.applicableTo?.map((a) => (
                        <span key={a} className={styles.badge}>{a}</span>
                      ))}
                    </td>
                    <td>{new Date(h.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(h._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HolidayListPage;
