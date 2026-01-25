"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import StudentDropdown from "@/app/components/studentDropdown/studentDropdown";
import { fetchNameWise } from "@/app/services/fees/feeServices";
import styles from "./studentSearch.module.css";

export default function StudentSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  /* ===== Debounced Search ===== */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetchNameWise(query);

        const flat = (res?.data || []).map((s) => ({
          _id: s._id,
          firstName: s.basicInfo?.firstName || "",
          lastName: s.basicInfo?.lastName || "",
          className: s.basicInfo?.className || "",
          section: s.basicInfo?.section || "",
          fatherName: s.familyInfo?.fatherName || "",
          userName: s.adminInfo?.userName || "",
        }));

        setResults(flat);
        setShowDropdown(flat.length > 0);
      } catch (err) {
        console.error(err);
      }
    }, 100);

    return () => clearTimeout(delay);
  }, [query]);

  function handleSelect(student) {
    onSelect(student);      // ✅ send to parent
    setQuery(student.firstName + " " + student.lastName);
    setShowDropdown(false);
    console.log("Students", student)
  }

  return (
    <div className={styles.searchWrapper}>
      <Search className={styles.searchIcon} />

      <input
        type="text"
        value={query}
        placeholder="Search student by name..."
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
        className={styles.input}
      />

      {showDropdown && (
        <StudentDropdown
          results={results}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
