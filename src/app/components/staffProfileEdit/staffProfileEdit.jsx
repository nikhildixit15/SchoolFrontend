"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import toast from "react-hot-toast";
import Field from "../EditStudentField/editStudent";
import { getStaffById } from "@/app/services/staff/staffService";
import { updateStaffProfile } from "@/app/services/staff/staffService";

export default function StaffProfileEdit({ staffId }) {
  const [isEdit, setIsEdit] = useState(false);
  const [staff, setStaff] = useState({});
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (staffId) fetchSaff(staffId);
  }, [staffId]);

  async function fetchSaff(staffId) {
    const response = await getStaffById({ id: staffId });
    setStaff(response);
    setFormData(response);
  }

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value,
      },
    }));
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    try {
      await updateStaffProfile(staff._id, {
        basicInfo: formData.basicInfo,
        familyInfo: formData.familyInfo,
        address: formData.addressObj,
        password: formData.adminInfo?.password, // ✅ only password
        profileDetail: formData.profileDetail,
      });

      toast.success("Profile updated successfully");
      setIsEdit(false);
      fetchSaff(staff._id); // refresh data
    } catch (err) {
      toast.error("Update failed");
    }
  };

  /* ---------------- CANCEL ---------------- */
  const handleCancel = () => {
    setFormData(staff);
    setIsEdit(false);
  };

  if (!formData) return null;

  return (
    <div className={styles.profileContainer}>
      {/* ================= ACTION BAR ================= */}
      <div className={styles.actionRow}>
        {!isEdit ? (
          <button onClick={() => setIsEdit(true)}>✏️ Edit</button>
        ) : (
          <>
            <button onClick={handleSave}>💾 Save</button>
            <button onClick={handleCancel}>❌ Cancel</button>
          </>
        )}
      </div>

      {/* ================= BASIC INFO ================= */}
      <div className={styles.sectionContainer}>
        <h4>Basic Information ({formData.adminInfo?.userName})</h4>

        <div className={styles.grid3}>
          <Field
            label="First Name"
            value={formData.basicInfo?.firstName}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "firstName", v)}
          />

          <Field
            label="Last Name"
            value={formData.basicInfo?.lastName}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "lastName", v)}
          />

          <Field
            label="Password"
            value={formData.adminInfo?.password}
            isEdit={isEdit}
            onChange={(v) => handleChange("adminInfo", "password", v)}
          />

          <Field
            label="Date of Birth"
            type="date"
            value={formData.basicInfo?.dob}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "dob", v)}
          />

          <Field
            label="Gender"
            value={formData.basicInfo?.gender}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "gender", v)}
          />
          <Field
            label="Email"
            value={formData.basicInfo?.email}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "email", v)}
          />

          <Field
            label="Aadhaar No"
            value={formData.basicInfo?.adarNumber}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "adarNumber", v)}
          />

          <Field
            label="Blood Group"
            value={formData.basicInfo?.bloodGroup}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "bloodGroup", v)}
          />

          <Field
            label="PAN Number"
            value={formData.basicInfo?.panNumber}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "panNumber", v)}
          />

          <Field
            label="Mobile Number"
            value={formData.basicInfo?.mobileNumber}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "mobileNumber", v)}
          />
        </div>
      </div>

      {/* ================= FAMILY INFO ================= */}
      <div className={styles.sectionContainer}>
        <h4>Family Information</h4>

        <div className={styles.grid3}>
          <Field
            label="Father Name"
            value={formData.familyInfo?.fatherName}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "fatherName", v)}
          />

          <Field
            label="Spouse Name"
            value={formData.familyInfo?.spouseName}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "spouseName", v)}
          />
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <h4>Profile Details</h4>

        <div className={styles.grid3}>
          <Field
            label="Department "
            value={formData.profileDetail?.department}
            isEdit={isEdit}
            onChange={(v) => handleChange("profileDetail", "department", v)}
          />

          <Field
            label="Designation"
            value={formData.profileDetail?.designation}
            isEdit={isEdit}
            onChange={(v) => handleChange("profileDetail", "designation", v)}
          />
          <Field
            label="Trained"
            value={formData.profileDetail?.trained}
            isEdit={isEdit}
            onChange={(v) => handleChange("profileDetail", "trained", v)}
          />
        </div>
      </div>
      {/* ================= ADDRESS ================= */}
      <div className={styles.sectionContainer}>
        <h4>Address</h4>

        <div className={styles.grid3}>
          <Field
            label="Permanent Address"
            value={formData.addressObj?.permanentAddress}
            isEdit={isEdit}
            onChange={(v) => handleChange("addressObj", "permanentAddress", v)}
          />

          <Field
            label="Permanent Pin Code"
            value={formData.addressObj?.permanentPinCode}
            isEdit={isEdit}
            onChange={(v) => handleChange("addressObj", "permanentPinCode", v)}
          />

          <Field
            label="Current Address"
            value={formData.addressObj?.currentAddress}
            isEdit={isEdit}
            onChange={(v) => handleChange("addressObj", "currentAddress", v)}
          />

          <Field
            label="Current Pin Code"
            value={formData.addressObj?.currentPinCode}
            isEdit={isEdit}
            onChange={(v) => handleChange("addressObj", "currentPinCode", v)}
          />
        </div>
      </div>
    </div>
  );
}
