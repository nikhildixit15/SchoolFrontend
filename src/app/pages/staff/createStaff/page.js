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
      <label>Employee Information</label>

      <div className={styles.container}>
        <div className={styles.halfRow}>
          <label className={styles.titleLabel}>{"Emp ID"}</label>
          <input
            className={styles.inputValue}
            placeholder={"Enter Designation"}
          ></input>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <label>Personal Information</label>
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

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PAN No."}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PAN number"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Email "}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter email address"}
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
              <label className={styles.titleLabel}>{"Marital Status"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Marital Status"}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Spouse Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Spouse Name"}
              ></input>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <label>Employee Address</label>
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
            <label>Employee Profile Details</label>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Department"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Department"}
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Designation"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Designation"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Date Of Joining"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Date Of Joining"}
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Trained/Untrained"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Designation"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Class Teacher"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Class"}
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Section"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Section"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Profile Pic"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Class"}
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Resume"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Section"}
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Pan Card"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Class"}
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"AADAR Card"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Section"}
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
