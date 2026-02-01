"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { updateStudentProfile } from "@/app/services/student/studentService";
import Field from "../EditStudentField/editStudent"; 
import { getProfile } from "@/app/services/student/studentService";
import toast from "react-hot-toast";


export default function StudentProfileEdit({ studentId }) {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [student, setStudent] = useState({});
  console.log("Studentjkn", studentId);

  useEffect(() => {
    if (studentId) {
      studentData(studentId);
    }
  }, [studentId]);

  const studentData = async (id) => {
    const response = await getProfile(id);
    setStudent(response.data);
    setFormData(response.data);
  };

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
        password:formData.adminInfo.password
      });
      toast.success("Profile updated successfully");
      setIsEdit(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
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
            label="Adhar Number"
            value={formData.basicInfo?.adarNo}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "adarNo", v)}
          />

          <Field
            label="Blood Group"
            value={formData.basicInfo?.bloodGroup}
            isEdit={isEdit}
            onChange={(v) => handleChange("basicInfo", "bloodGroup", v)}
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
      </div>
      {/* FAMILY INFO */}
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
            label="Father Occupation"
            value={formData.familyInfo?.fatherOccupation}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "fatherOccupation", v)}
          />

          <Field
            label="Mother Name"
            value={formData.familyInfo?.motherName}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "motherName", v)}
          />
          <Field
            label="Mother Occupation"
            value={formData.familyInfo?.motherOccupation}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "motherOccupation", v)}
          />

          <Field
            label="Mobile Number"
            value={formData.familyInfo?.mobileNumber}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "mobileNumber", v)}
          />
          <Field
            label="Religion"
            value={formData.familyInfo?.religion}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "religion", v)}
          />

          <Field
            label="Category"
            value={formData.familyInfo?.category}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "category", v)}
          />

          <Field
            label="Email"
            value={formData.familyInfo?.email}
            isEdit={isEdit}
            onChange={(v) => handleChange("familyInfo", "email", v)}
          />
        </div>
      </div>
      {/* ADDRESS */}
      <div className={styles.sectionContainer}>
        <h4>Address</h4>
        <div className={styles.grid3}>
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
    </div>
  );
}
