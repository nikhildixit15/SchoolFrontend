import styles from "./staffProfileSummary.module.css";

export default function StaffProfileSummary({ staff }) {
  return (
    <main>
      <div className={styles.profileContainer}>
        {/* Employment Profile */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>Employment Profile</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Emp Code</label>
              <label className={styles.rowItemValue}>
                {staff.adminInfo?.employeeId || "N/A"}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Date of Joining</label>
              <label className={styles.rowItemValue}>
                {staff.profileDetails?.dateOfJoining ||
                  staff.basicInfo?.joiningDate ||
                  staff.dateOfJoining ||
                  "N/A"}
              </label>
            </div>
          </div>
        </div>

        {/* Department & Designation */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>Department & Designation</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Department</label>
              <label className={styles.rowItemValue}>
                {staff.profileDetails?.department || staff.department || "N/A"}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Designation</label>
              <label className={styles.rowItemValue}>
                {staff.profileDetails?.designation || staff.designation || "N/A"}
              </label>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>Personal Info</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>DOB</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.dob || staff.dob || "N/A"}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Gender</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.gender || staff.gender || "N/A"}
              </label>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>Contact Info</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Mobile Number</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.mobileNumber ||
                  staff.mobileNumber ||
                  staff.familyInfo?.mobileNumber ||
                  "N/A"}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Email</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.email || staff.email || "N/A"}
              </label>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>Address</label>
          </div>
          <div className={styles.listRowContainerSingle}>
            <div className={styles.listRowSingle}>
              <label className={styles.rowItemText}>Address</label>
              <label className={styles.rowItemValue}>
                {staff.address?.permanentAddress ||
                  staff.address?.currentAddress ||
                  staff.address ||
                  "N/A"}
                {staff.address?.permanentPinCode
                  ? `, ${staff.address.permanentPinCode}`
                  : ""}
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}