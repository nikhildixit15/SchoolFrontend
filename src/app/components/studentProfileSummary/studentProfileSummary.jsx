"use client";
import { useDispatch } from "react-redux";
import styles from "./studentProfileSummary.module.css";
import { useEffect } from "react";

export default function StudentProfileSummary({ student }) {
  const dispatch = useDispatch();

  console.log("###studentData1234", student);

  useEffect(() => {}, []);
  return (
    <main>
      <div className={styles.profileContainer}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>{"Admission Profile"}</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow}  ${styles.divider}`}>
              <label className={styles.rowItemText}>Form No :</label>
              <label className={styles.rowItemValue}>
                {student.adminInfo?.admissionNumber}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>D.O.A</label>
              <label className={styles.rowItemValue}>
                {new Date(student.createdAt).toLocaleDateString("en-IN")}
              </label>
            </div>
          </div>
        </div>
 
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <label>{"Basic Information"}</label>
            </div>

            <div className={styles.listRowContainer}>
              <div className={`${styles.listRow} ${styles.divider}`}>
                <label className={styles.rowItemText}>First Name :</label>
                <label className={styles.rowItemValue}>
                  {student.basicInfo?.firstName} {student.basicInfo?.lastName}
                </label>
              </div> 

              <div className={`${styles.listRow} ${styles.divider}`}>
                <label className={styles.rowItemText}>Date of Birth :</label>
                <label className={styles.rowItemValue}>
                  {student.basicInfo?.dob
                    ? new Date(student.basicInfo.dob).toLocaleDateString(
                        "en-IN",
                      )
                    : "-"}
                </label>
              </div>

              <div className={`${styles.listRow} ${styles.divider}`}>
                <label className={styles.rowItemText}>Email :</label>
                <label className={styles.rowItemValue}>
                  {student.familyInfo?.email}
                </label>
              </div>
              <div className={styles.listRow}>
                <label className={styles.rowItemText}>Gender :</label>
                <label className={styles.rowItemValue}>
                  {student.basicInfo?.gender}
                </label>
              </div>

              <div className={`${styles.listRow} ${styles.divider}`}>
                <label className={styles.rowItemText}>Aadhaar No :</label>
                <label className={styles.rowItemValue}>
                  {student.basicInfo?.adarNo}
                </label>
              </div>
              
              <div className={`${styles.listRow} ${styles.divider}`}>
                <label className={styles.rowItemText}>Contact Number :</label>
                <label className={styles.rowItemValue}>
                  {student.familyInfo?.mobileNumber}
                </label>
              </div>
              <div className={`${styles.listRow} ${styles.divider}`}>
                <label className={styles.rowItemText}>Blood Group :</label>
                <label className={styles.rowItemValue}>
                  {student.basicInfo?.bloodGroup}
                </label>
              </div>

              <div className={`${styles.listRow} ${styles.divider}`}>
                <label className={styles.rowItemText}>Class :</label>
                <label className={styles.rowItemValue}>
                  {student.basicInfo?.className}
                </label>
              </div>

              <div className={`${styles.listRow} ${styles.divider}`}>
                <label className={styles.rowItemText}>Section :</label>
                <label className={styles.rowItemValue}>
                  {student.basicInfo?.section}
                </label>
              </div>
            </div>
          </div>
        

        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>{"Family Profile"}</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow}  ${styles.divider}`}>
              <label className={styles.rowItemText}>Father Name</label>
              <label className={styles.rowItemValue}>
                {student.familyInfo?.fatherName}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Mother Name</label>
              <label className={styles.rowItemValue}>
                {student.familyInfo?.motherName}
              </label>
            </div>
          </div>

          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow}  ${styles.divider}`}>
              <label className={styles.rowItemText}>Father Occupation</label>
              <label className={styles.rowItemValue}>
                {student.familyInfo?.fatherOccupation}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Mother Occupation</label>
              <label className={styles.rowItemValue}>
                {student.familyInfo?.motherOccupation}
              </label>
            </div>
          </div>

          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow}  ${styles.divider}`}>
              <label className={styles.rowItemText}>Father Annual Income</label>
              <label className={styles.rowItemValue}>
                {student.familyInfo?.fatherIncome}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Mother Annual Income</label>
              <label className={styles.rowItemValue}>
                {student.familyInfo?.motherIncome}
              </label>
            </div>
          </div>

          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow}  ${styles.divider}`}>
              <label className={styles.rowItemText}>Religion</label>
              <label className={styles.rowItemValue}>
                {student.familyInfo?.religion}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Category</label>
              <label className={styles.rowItemValue}>
                {student.familyInfo?.category}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <label>{"Address"}</label>
        </div> 
         <div className={styles.listRowContainer}>
          <div className={`${styles.listRow} ${styles.divider}`}>
            <label className={styles.rowItemText}>Permanent Address :</label>
            <label className={styles.rowItemValue}>
              {`${student.address?.permanentAddress}, ${student.address?.permanentPinCode}`}
            </label>
         </div>
         
          <div className={`${styles.listRow} `}>
            <label className={styles.rowItemText}>Current Address :</label>
            <label className={styles.rowItemValue}>
              {`${student.address?.currentAddress}, ${student.address?.currentPinCode}`}
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
