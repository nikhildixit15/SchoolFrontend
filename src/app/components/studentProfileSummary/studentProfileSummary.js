import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./studentProfileSummary.module.css";
import { useEffect } from "react";

export default function StudentProfileSummary({ studentData }) {
  const dispatch = useDispatch();

  console.log("###studentData", studentData);

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
              <label className={styles.rowItemText}>Form No</label>
              <label className={styles.rowItemValue}>{"12345"}</label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>D.O.A</label>
              <label className={styles.rowItemValue}>{"12-10-2023"}</label>
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
              <label className={styles.rowItemValue}>{"Ajay kumar"}</label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Mother Name</label>
              <label className={styles.rowItemValue}>{"Nidhi Kumari"}</label>
            </div>
          </div>

          <div className={styles.listRowContainer}>
            <div className={`${styles.listRow}  ${styles.divider}`}>
              <label className={styles.rowItemText}>Father Occupation</label>
              <label className={styles.rowItemValue}>{"Businessman"}</label>
            </div>
            <div className={styles.listRow}>
              <label className={styles.rowItemText}>Mother Occupation</label>
              <label className={styles.rowItemValue}>{"House Wife"}</label>
            </div>
          </div>
        </div>

        <div className={styles.listRowContainer}>
          <div className={`${styles.listRow}  ${styles.divider}`}>
            <label className={styles.rowItemText}>Father Annual Income</label>
            <label className={styles.rowItemValue}>{"10000000"}</label>
          </div>
          <div className={styles.listRow}>
            <label className={styles.rowItemText}>Mother Annual Income</label>
            <label className={styles.rowItemValue}>{"0"}</label>
          </div>
        </div>

        <div className={styles.listRowContainer}>
          <div className={`${styles.listRow}  ${styles.divider}`}>
            <label className={styles.rowItemText}>Religion</label>
            <label className={styles.rowItemValue}>{"Hindu"}</label>
          </div>
          <div className={styles.listRow}>
            <label className={styles.rowItemText}>Category</label>
            <label className={styles.rowItemValue}>{"Gen"}</label>
          </div>
        </div>

        <div className={styles.listRowContainer}>
          <div className={`${styles.listRow}  ${styles.divider}`}>
            <label className={styles.rowItemText}>Guardian Name</label>
            <label className={styles.rowItemValue}>{"Ajay Kumar"}</label>
          </div>
          <div className={styles.listRow}>
            <label className={styles.rowItemText}>Guardian Contact No.</label>
            <label className={styles.rowItemValue}>{"8874432123"}</label>
          </div>
        </div>

        <div className={styles.listRowContainer}>
          <div className={`${styles.listRow}`}>
            <label className={styles.rowItemText}>Guardian Relation</label>
            <label className={styles.rowItemValue}>{"Father"}</label>
          </div>
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <label>{"Address"}</label>
        </div>
        <div className={styles.listRowContainerSingle}>
          <div className={`${styles.listRowSingle}`}>
            <label className={styles.rowItemText}>Address</label>
            <label className={styles.rowItemValue}>
              {"H-1239, Vivek Nager, Kanpur, 208019"}
            </label>
          </div>
          <div className={styles.listRowSingle}>
            <label className={styles.rowItemText}>Contact Number</label>
            <label className={styles.rowItemValue}>{"7563987609"}</label>
          </div>
        </div>
      </div>
    </main>
  );
}
