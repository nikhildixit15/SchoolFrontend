"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import StaffDropdown from "../staffDropdown/page";
import { fetchNameWiseStaff } from "@/app/services/admin/adminService";
import styles from "./page.module.css";

export default function StaffSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetchNameWiseStaff(query);
        const staffList = res?.data || [];
        console.log("Sta",res)
        const flat = staffList.map((s) => ({
          _id: s._id,
          firstName: s.basicInfo?.firstName || "",
          lastName: s.basicInfo?.lastName || "",
          stream: s.basicInfo?.stream || "",
          department: s.profileDetails?.department || "",
          designation: s.profileDetails?.designation || "",
          employeeId: s.adminInfo?.employeeId || "",
        }));

        setResults(flat);
        setShowDropdown(flat.length > 0);
      } catch (err) {
        console.error("Staff search failed:", err);
        setResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }, 200); // ✅ better debounce

    return () => clearTimeout(delay);
  }, [query]);

  function handleSelect(staff) {
    onSelect(staff);
    setQuery([staff.firstName, staff.lastName].filter(Boolean).join(" "));
    setShowDropdown(false);
  }

  return (
    <div className={styles.searchWrapper}>
      <Search className={styles.searchIcon} />

      <input
        type="text"
        value={query}
        placeholder="Search staff by name..."
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setShowDropdown(true)}
        className={styles.input}
      />

      {showDropdown && (
        <StaffDropdown
          results={results}
          onSelect={handleSelect}
          loading={loading}
        />
      )}
    </div>
  );
}
