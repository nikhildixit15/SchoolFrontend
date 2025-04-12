"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStudentBasicInfo, saveStudentInfo, getStudentInfo } from "@/app/services/student/studentService";
import { Form } from "react-bootstrap";

export default function CreateStudent() {
  const [stdBasicInfo, setStdBasicInfo] = useState({});
  const [stuAddress, setStuAddress] = useState({});
  const [stuFamilyDetails, setStuFamilyDetails] = useState({});
  const [previousSchoolInfo, setPreviousSchoolInfo] = useState({});

  useEffect(() => {
    fetchStudentBasicInfo();
  }, []);

  async function fetchStudentBasicInfo(data) {
    const result = await getStudentInfo(data);
    setStdBasicInfo(result.stdBasicInfo);
    setStdBasicInfo(result.stuAddress);
    setStdBasicInfo(result.stuFamilyDetails);
    setStdBasicInfo(result.previousSchoolInfo);
    console.log("####", result);
  }

  async function postStudentData() {
    // await validateStudentData()
    const payload = {
      stdBasicInfo,
      stuAddress,
      stuFamilyDetails,
      previousSchoolInfo
    }
    await saveStudentInfo(payload)
  }
  

  function onSaveBtnClicked() {
    postStudentData()
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
                value={stdBasicInfo?.fName}
                required={true}
                onInput={(event)=>setStdBasicInfo({...stdBasicInfo, fName:event.target.value})}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Last Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Last Name"}
                value={stdBasicInfo?.lName}
                required={true}
                onInput={(event)=>setStdBasicInfo({...stdBasicInfo, lName:event.target.value})}
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
                value={stdBasicInfo?.dob}
                required={true}
                onInput={(event)=>setStdBasicInfo({...stdBasicInfo, dob:event.target.value})}
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
                  value={stdBasicInfo?.gender}
                  onInput={(event)=>setStdBasicInfo({...stdBasicInfo, gender:event.target.value})}
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
                value={stdBasicInfo?.class}
                onInput={(event)=>setStdBasicInfo({...stdBasicInfo, class:event.target.value})}              
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Stream"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter stream"}
                value={stdBasicInfo?.stream}
                onInput={(event)=>setStdBasicInfo({...stdBasicInfo, stream:event.target.value})}  
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"ADAR No."}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter ADAR number"}
                value={stdBasicInfo?.adarNo}
                onInput={(event)=>setStdBasicInfo({...stdBasicInfo, adarNo:event.target.value})}  
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Blood Group"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter blood group"}
                value={stdBasicInfo?.bloodGroup}
                onInput={(event)=>setStdBasicInfo({...stdBasicInfo, bloodGroup:event.target.value})}  
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
                value={stuFamilyDetails?.fatherName}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, fatherName:event.target.value})}  
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mother Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mother Name"}
                value={stuFamilyDetails?.motherName}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, motherName:event.target.value})}  
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Father Occupation"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Occupation"}
                value={stuFamilyDetails?.motherOccupation}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, motherOccupation:event.target.value})}  
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Father Occupation"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Occupation"}
                value={stuFamilyDetails?.fatherOccupation}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, fatherOccupation:event.target.value})}  
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Father Income"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Father Income"}
                value={stuFamilyDetails?.fatherIncome}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, fatherIncome:event.target.value})}  
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mother Income"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mother Income"}
                value={stuFamilyDetails?.motherIncome}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, motherIncome:event.target.value})}  
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Religion"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Religion"}
                value={stuFamilyDetails?.religion}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, religion:event.target.value})}  
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Category"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Category"}
                value={stuFamilyDetails?.category}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, category:event.target.value})}  
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mobile Number"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mobile Number"}
                value={stuFamilyDetails?.mobileNumber}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, mobileNumber:event.target.value})}  
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>
                {"Alternate Mobile Number"}
              </label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Alternate Mobile Number"}
                value={stuFamilyDetails?.altMobileNumber}
                onInput={(event)=>setStuFamilyDetails({...stuFamilyDetails, altMobileNumber:event.target.value})}  
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
                value={stuAddress?.permanentAddress}
                onInput={(event)=>setStuAddress({...stuAddress, permanentAddress:event.target.value})}  
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PinCode"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PinCode"}
                value={stuAddress?.permanentPinCode}
                onInput={(event)=>setStuAddress({...stuAddress, permanentPinCode:event.target.value})}  
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Current Address"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Current Address"}
                value={stuAddress?.currentAddress}
                onInput={(event)=>setStuAddress({...stuAddress, currentAddress:event.target.value})}  
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PinCode"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PinCode"}
                value={stuAddress?.currentPinCode}
                onInput={(event)=>setStuAddress({...stuAddress, currentPinCode:event.target.value})}  
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
                value={previousSchoolInfo?.previousSchoolName}
                onInput={(event)=>setPreviousSchoolInfo({...previousSchoolInfo, previousSchoolName:event.target.value})}  
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PassOut Year"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PassOut Year"}
                value={previousSchoolInfo?.previousSchoolPassOut}
                onInput={(event)=>setPreviousSchoolInfo({...previousSchoolInfo, previousSchoolPassOut:event.target.value})}  
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
