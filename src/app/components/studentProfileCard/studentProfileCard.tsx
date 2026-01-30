import Link from "next/link";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { classList } from "@/mocks";
import { getBirthdayFromDOB } from "@/app/utils/dateUtils";
import styles from "./studentProfileCard.module.css";

export default function StudentProfileCard({ student }: any) {
  const birthDay = getBirthdayFromDOB(student?.dob);  
  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.profileHeaderBlue}>
        <span className={styles.profileHeaderIcon}>👤</span>
        <span className={styles.profileHeaderText}>Student Profile</span>
      </div>
      <div className={styles.profileMain}>
        {/* Profile Image */}
        <div className={styles.profileImageBox}>
          {/* You can use student.photo if available */}
          <img
            className={styles.profileImage}
            src="/images/student-profile.jpg"
            alt="Profile"
          />
        </div>
        {/* Name */}
        <div className={styles.studentNameBox}>
          <span className={styles.studentName}>
            {student.basicInfo?.firstName} {student.basicInfo?.lastName}
          </span>
        </div>
        {/* Details */}
        <div className={styles.profileDetails}>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Admission No.</span>
            <span className={styles.value}>
              {student.adminInfo?.admissionNumber}
            </span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Class</span>
            <span className={styles.value}>{student.basicInfo?.className}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Birthday</span>
            <span className={styles.value}>{student.basicInfo?.dob}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Gender</span>
            <span className={styles.value}>{student.basicInfo?.gender}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Username</span>
            <span className={styles.value}>{student.adminInfo?.userName}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Password</span>
            <span className={styles.value}>
              {student.adminInfo?.password }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
