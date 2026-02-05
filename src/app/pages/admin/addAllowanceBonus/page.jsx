"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import SalaryRow from "./salaryRow";
import StaffSearch from "@/app/components/staffSearch/page";
import {
  addAllowance,
  getStaffSalarySingle,
} from "@/app/services/admin/adminService";
import toast from "react-hot-toast";

export default function SalaryPage() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [allowance, setAllowance] = useState({ title: "", amount: "" });
  const [bonus, setBonus] = useState({ title: "", amount: "" });
  const [deduction, setDeduction] = useState({ title: "", amount: "" });
  const [basicSalary, setBasicSalary] = useState("");
  const [isEditingBasic, setIsEditingBasic] = useState(false);

  useEffect(() => {
    if (!selectedStaff) return;
    fetchSalary();
  }, [selectedStaff]);

  const fetchSalary = async () => {
    try {
      const res = await getStaffSalarySingle({
        staffId: selectedStaff._id,
        month: 2,
        year: 2026,
      });

      if (res.data.data) {
        setBasicSalary(res.data.data.salary.basic);
      } else {
        setBasicSalary(selectedStaff.salary);
      }
    } catch (err) {
      toast.error("Failed to fetch salary");
    }
  };

  const validateField = (field, label) => {
    if (field.title && !field.amount) {
      toast.error(`Please enter ${label} amount`);
      return false;
    }

    if (!field.title && field.amount) {
      toast.error(`Please enter ${label} Description`);
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!selectedStaff) {
      toast.error("Please select staff");
      return;
    }

    if (
      !validateField(allowance, "allowance") ||
      !validateField(bonus, "bonus") ||
      !validateField(deduction, "deduction")
    ) {
      return;
    }

    const payload = {
      staffId: selectedStaff._id,
      basic: basicSalary,
    };

    if (allowance.title && allowance.amount) {
      payload.allowance = {
        title: allowance.title,
        amount: Number(allowance.amount),
      };
    }

    if (bonus.title && bonus.amount) {
      payload.bonus = {
        title: bonus.title,
        amount: Number(bonus.amount),
      };
    }

    if (deduction.title && deduction.amount) {
      payload.deduction = {
        title: deduction.title,
        amount: Number(deduction.amount),
      };
    }

    try {
      const res = await addAllowance(payload);
      toast.success(res.data.message);
      setBonus({ title: "", amount: "" });
      setDeduction({ title: "", amount: "" });
      setAllowance({ title: "", amount: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };
  return (
    <div className={styles.container}>
      <StaffSearch onSelect={setSelectedStaff} />

      {selectedStaff && <input value={selectedStaff.employeeId} disabled />}

      <h2>Salary Breakdown</h2>

      <div className={styles.basicRow}>
        <label>Basic Salary</label>

        <input
          type="number"
          value={basicSalary}
          disabled={!isEditingBasic}
          onChange={(e) => setBasicSalary(Number(e.target.value))}
        />

        <button
          type="button"
          className={styles.editBtn}
          onClick={() => setIsEditingBasic(!isEditingBasic)}
        >
          {isEditingBasic ? "Done" : "Edit"}
        </button>
      </div>

      <SalaryRow title="Allowance" data={allowance} setData={setAllowance} />
      <SalaryRow title="Bonus" data={bonus} setData={setBonus} />
      <SalaryRow title="Deduction" data={deduction} setData={setDeduction} />

      <button onClick={handleSave} disabled={isEditingBasic}>
        Save Salary
      </button>
    </div>
  );
}
