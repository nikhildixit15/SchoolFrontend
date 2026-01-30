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
              <label className={styles.rowItemText}>Emp Code :</label>
              <label className={styles.rowItemValue}>
                {staff.adminInfo?.employeeId || "N/A"}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Date of Joining :</label>
              <label className={styles.rowItemValue}>
                {new Date(staff.dateOfJoining).toLocaleDateString("en-IN") ||
                  "N/A"}
              </label>
            </div>
          </div>
        </div>

        {/* Department & Designation */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>Basic Information</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Name :</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.firstName} {staff.basicInfo?.lastName}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Gender :</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.gender}
              </label>
            </div>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>D. O. B. :</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.dob}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Adhar Number :</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.adarNumber}
              </label>
            </div>
          </div>

          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Stream :</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.stream}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Email :</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.email}
              </label>
            </div>
          </div>

          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Mobile Number :</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.mobileNumber}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Mobile Number :</label>
              <label className={styles.rowItemValue}>
                {staff.basicInfo?.altMobileNumber}
              </label>
            </div>
          </div>
          <div className={`${styles.listRow} ${styles.divider}`}>
            <label className={styles.rowItemText}>Pan Number :</label>
            <label className={styles.rowItemValue}>
              {staff.basicInfo?.panNumber}
            </label>
          </div>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>Department & Designation</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Departmnet :</label>
              <label className={styles.rowItemValue}>{staff.department}</label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Designation :</label>
              <label className={styles.rowItemValue}>{staff.designation}</label>
            </div>
          </div>
        </div>
        {/* Personal Info */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label>Family Info</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Father Name :</label>
              <label className={styles.rowItemValue}>
                {staff.familyInfo?.fatherName}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Spouse Name :</label>
              <label className={styles.rowItemValue}>
                {staff.familyInfo?.spouseName}
              </label>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <label> Address</label>
          </div>
          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow} ${styles.divider}`}>
              <label className={styles.rowItemText}>Current Address :</label>
              <label className={styles.rowItemValue}>
                {`${staff.addressObj?.currentAddress},
                ${staff.addressObj?.currentPinCode}`}
              </label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Permanent Address :</label>
              <label className={styles.rowItemValue}>
                {`${staff.addressObj?.permanentAddress}, 
                 ${staff.addressObj?.permanentPinCode}`}
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
