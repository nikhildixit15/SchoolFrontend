import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./studentProfile.module.css";
import { useEffect } from "react";
import { classList } from "@/mocks";

export default function StudentProfile({ studentData }: any) {
  const dispatch = useDispatch();

  console.log("###studentData", studentData);

  useEffect(() => {}, []);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img className={styles.userIcon}></img>
        <label className={styles.profileHeaderText}>Student Profile</label>
      </div>
      <div className={styles.userPic}></div>
      <div className={styles.userName}></div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Admission No.</label>
        <label className={styles.itemValue}>{studentData?.admissionNo}</label>
      </div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Class</label>
        <label className={styles.itemValue}>{studentData?.class}</label>
      </div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Birthday</label>
        <label className={styles.itemValue}>{studentData?.dob}</label>
      </div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Username</label>
        <label className={styles.itemValue}>{studentData?.userName}</label>
      </div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Password</label>
        <label className={styles.itemValue}>{studentData?.password}</label>
      </div>
    </div>
  );
}
