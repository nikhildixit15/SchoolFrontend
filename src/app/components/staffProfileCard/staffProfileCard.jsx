import styles from "./staffProfileCard.module.css";

export default function StaffProfileCard({ staff }) {
  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.profileHeaderBlue}>
        <span className={styles.profileHeaderIcon}>👤</span>
        <span className={styles.profileHeaderText}>Staff Profile</span>
      </div>
      <div className={styles.profileMain}>
        {/* Profile Image */}
        <div className={styles.profileImageBox}>
          <img
            className={styles.profileImage}
            src="/images/student-profile.jpg"
            alt="Profile"
          />
        </div>
        {/* Name */}
        <div className={styles.staffNameBox}>
          <span className={styles.staffName}>
            {staff.basicInfo?.firstName} {staff.basicInfo?.lastName}
          </span>
        </div>
        {/* Details */}
        <div className={styles.profileDetails}>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Emp Code</span>
            <span className={styles.value}>{staff.adminInfo?.employeeId}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Department</span>
            <span className={styles.value}>
              {staff.profileDetails?.department || staff.department || "N/A"}
            </span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Designation</span>
            <span className={styles.value}>
              {staff.profileDetails?.designation || staff.designation || "N/A"}
            </span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>DOB</span>
            <span className={styles.value}>{staff.basicInfo?.dob}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Gender</span>
            <span className={styles.value}>{staff.basicInfo?.gender}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Mobile</span>
            <span className={styles.value}>
              {staff.basicInfo?.mobileNumber || staff.mobileNumber || "N/A"}
            </span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Username</span>
            <span className={styles.value}>{staff.adminInfo?.userName}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Password</span>
            <span className={styles.value}>*{staff.adminInfo?.password?.slice(-4)}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.labelGreen}>Date of Joining</span>
            <span className={styles.value}>
              {staff.profileDetails?.dateOfJoining || staff.dateOfJoining || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}