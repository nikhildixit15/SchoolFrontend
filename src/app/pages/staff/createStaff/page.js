"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStudentBasicInfo } from "@/app/services/student/studentService";
import { Form } from "react-bootstrap";

export default function CreateStaff() {
  const [stdBasicInfo, setStdBasicInfo] = useState();

  useEffect(() => {
    fetchStudentBasicInfo();
  }, []);

  async function fetchStudentBasicInfo(data) {
    const result = await getStudentBasicInfo(data);
    setStdBasicInfo(result);
    console.log("####", result);
  }

  function onSaveBtnClicked() {
    alert("Data saved successfully");
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <label>Student Details</label>
          </div>
          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"First Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter First Name"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Last Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Last Name"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"DOB"}</label>
              <input
                className={styles.inputValue}
                type={"date"}
                placeholder={"Enter DOB"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Gender"}</label>
              <Form>
                <Form.Check inline label="Male" name="group1" type={"radio"} />
                <Form.Check
                  inline
                  label="Female"
                  name="group1"
                  type={"radio"}
                />
              </Form>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Class"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter class name"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Stream"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter stream"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"ADAR No."}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter ADAR number"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Blood Group"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter blood group"}
              ></input>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <label>Family Details</label>
          </div>
          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Father Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Father Name"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mother Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mother Name"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Father Occupation"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Occupation"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Father Occupation"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Occupation"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Father Income"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Father Income"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mother Income"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mother Income"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Religion"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Religion"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Category"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Category"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mobile Number"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mobile Number"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>
                {"Alternate Mobile Number"}
              </label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Alternate Mobile Number"}
              ></input>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <label>Student Address</label>
          </div>
          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Permanent Address"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Permanent Address"}
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PinCode"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PinCode"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Current Address"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Current Address"}
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PinCode"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PinCode"}
              ></input>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <label>Previous School Details</label>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"School Name"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter School Name"}
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Passout Year"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Passout Year"}
              ></input>
            </div>
          </div>
        </div>

        <button className={styles.saveButton} onClick={onSaveBtnClicked}>
          Save
        </button>
      </div>
    </div>
  );
}
