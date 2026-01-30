"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { updateStudentProfile } from "@/app/services/student/studentService";
import Field from "@/app/components/EditStudentField/editStudent";

export default function StudentProfileEdit({ student }) {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  // sync when student changes
  useEffect(() => {
    studentData();
    setFormData(student);
  }, [student]);

  const studentData = ()=>{
    
  }

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      await updateStudentProfile(student._id, {
        basicInfo: formData.basicInfo,
        familyInfo: formData.familyInfo,
        address: formData.address,
      });
      alert("Profile updated successfully");
      setIsEdit(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleCancel = () => {
    setFormData(student);
    setIsEdit(false);
  };

  if (!formData) return null;

  return (
    <div className={styles.profileContainer}>
      {/* ACTION BUTTONS */}
      <div className={styles.actionRow}>
        {!isEdit ? (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        ) : (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>

      {/* BASIC INFO */}
      <div className={styles.sectionContainer}>
        <h4>Basic Information</h4>

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
          label="Class"
          value={formData.basicInfo?.className}
          isEdit={isEdit}
          onChange={(v) => handleChange("basicInfo", "className", v)}
        />

        <Field
          label="Section"
          value={formData.basicInfo?.section}
          isEdit={isEdit}
          onChange={(v) => handleChange("basicInfo", "section", v)}
        />
      </div>

      {/* FAMILY INFO */}
      <div className={styles.sectionContainer}>
        <h4>Family Information</h4>

        <Field
          label="Father Name"
          value={formData.familyInfo?.fatherName}
          isEdit={isEdit}
          onChange={(v) => handleChange("familyInfo", "fatherName", v)}
        />

        <Field
          label="Mother Name"
          value={formData.familyInfo?.motherName}
          isEdit={isEdit}
          onChange={(v) => handleChange("familyInfo", "motherName", v)}
        />

        <Field
          label="Mobile Number"
          value={formData.familyInfo?.mobileNumber}
          isEdit={isEdit}
          onChange={(v) => handleChange("familyInfo", "mobileNumber", v)}
        />

        <Field
          label="Email"
          value={formData.familyInfo?.email}
          isEdit={isEdit}
          onChange={(v) => handleChange("familyInfo", "email", v)}
        />
      </div>

      {/* ADDRESS */}
      <div className={styles.sectionContainer}>
        <h4>Address</h4>

        <Field
          label="Permanent Address"
          value={formData.address?.permanentAddress}
          isEdit={isEdit}
          onChange={(v) => handleChange("address", "permanentAddress", v)}
        />

        <Field
          label="Permanent Pin Code"
          value={formData.address?.permanentPinCode}
          isEdit={isEdit}
          onChange={(v) => handleChange("address", "permanentPinCode", v)}
        />

        <Field
          label="Current Address"
          value={formData.address?.currentAddress}
          isEdit={isEdit}
          onChange={(v) => handleChange("address", "currentAddress", v)}
        />

        <Field
          label="Current Pin Code"
          value={formData.address?.currentPinCode}
          isEdit={isEdit}
          onChange={(v) => handleChange("address", "currentPinCode", v)}
        />
      </div>
    </div>
  );
}
