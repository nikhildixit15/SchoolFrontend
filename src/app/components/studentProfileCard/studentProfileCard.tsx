import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./studentProfileCard.module.css";
import { useEffect } from "react";
import { classList } from "@/mocks";
import { getBirthdayFromDOB } from "@/app/utils/dateUtils";

export default function StudentProfileCard({ student }: any) {

  const birthDay = getBirthdayFromDOB(student?.dob)

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
        <label className={styles.userProfileRowItem}>Admission No</label>
        <label className={styles.itemValue}>{student.adminInfo?.admissionNumber}</label>
      </div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Class</label>
        <label className={styles.itemValue}>{student.basicInfo?.className}</label>
      </div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Birthday</label>
        <label className={styles.itemValue}>{birthDay}</label>
      </div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Username</label>
        <label className={styles.itemValue}>{student.adminInfo?.userName}</label>
      </div>

      <div className={styles.userProfileRow}>
        <label className={styles.userProfileRowItem}>Password</label>
        <label className={styles.itemValue}>{student.adminInfo?.password}</label>
      </div>
    </div>
  );
}
