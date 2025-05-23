"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStudentBasicInfo } from "@/app/services/student/studentService";
import { Form } from "react-bootstrap";
import Select from "react-select";
import {
  getDepartmentList,
  getDesignationList,
} from "@/app/services/staff/staffService";

export default function CreateStaff() {
  const [stdBasicInfo, setStdBasicInfo] = useState();
  const [teacherBasicInfo, setTeacherBasicInfo] = useState({});
  const [teacherAddress, setTeacherAddress] = useState({});
  const [teacherFamilyDetails, setTeacherFamilyDetails] = useState({});
  const [departmentName, setDepartmentName] = useState();
  const [departmentOptionList, setDepartmentOptionList] = useState();
  const [designationName, setDesignationName] = useState();
  const [designationOptionList, setDesignationOptionList] = useState();

  useEffect(() => {
    fetchStudentBasicInfo();
    fetchDepartments();
  }, []);

  async function fetchStudentBasicInfo(data) {
    const result = await getStudentBasicInfo(data);
    setStdBasicInfo(result);
    console.log("####", result);
  }
  
  async function fetchDepartments() {
    const departments = await getDepartmentList();
    const formattedOptions = departments.map(function(dept) {
      return {
        value: dept.id,
        label: dept.name
      };
    });
    setDepartmentOptionList(formattedOptions);
  }

  function handleDepartmentSection(selectedOption) {
    setStdBasicInfo({
      ...stdBasicInfo,
      department: selectedOption.value
    });
    setDepartmentName(selectedOption);
    fetchDesignations(selectedOption.value);
    setDesignationName(null); // Reset designation when department changes
  }

  async function fetchDesignations(departmentId) {
    const designations = await getDesignationList({ departmentId });
    
    // Only filter if departmentName exists
    const filteredDesignations = departmentName?.label 
      ? designations.filter((desig) => desig.departmentName === departmentName.label)
      : [];
      
    const formattedOptions = filteredDesignations.map(function(desig) {
      return {
        value: desig.id,
        label: desig.name
      };
    });
    setDesignationOptionList(formattedOptions);
  }

  function handleDesignationSelect(selectedOption) {
    setStdBasicInfo({
      ...stdBasicInfo,
      designation: selectedOption.value
    });
    setDesignationName(selectedOption);
  }

  async function onSaveBtnClicked() {
    // First validate the data
    const isValid = await validateTeacherData();
    if (!isValid) {
      return;
    }

    const payload = {
      basicInfo: teacherBasicInfo,
      address: teacherAddress,
      familyInfo: teacherFamilyDetails,
      department: departmentName?.value,
      designation: designationName?.value
    };
    alert("Data saved successfully");
  }  

  async function validateTeacherData() {
    if(!teacherBasicInfo.firstName){
      alert("please enter firstName");
      return false;
    }
    if(!teacherBasicInfo.lastName){
      alert("please enter lastName")
      return false;
    }
    if(!teacherBasicInfo.className){
      alert("please enter className")
      return false;
    }
    if(!teacherBasicInfo.stream){
      alert("please enter section")
      return false;
    }
    if(!teacherBasicInfo.dob){
      alert("please enter dob")
      return false;
    }
    if(!teacherBasicInfo.adarNo){
      alert("please enter adarNo")
      return false;
    }
    if(!teacherFamilyDetails.fatherName){
      alert("please enter fatherName")
      return false;
    }
    if(!teacherFamilyDetails.motherName){
      alert("please enter motherName")
      return false;
    }
    if(!teacherFamilyDetails.mobileNumber){
      alert("please enter mobileNumber")
      return false;
    }
    if(!teacherAddress.permanentAddress){
      alert("please enter permanentAddress")
      return false;
    }

  return true;
  }

  return (
    <div className={styles.mainContainer}>
      <label>Employee Information</label>

      <div className={styles.container}>
        <div className={styles.halfRow}>
          <label className={styles.titleLabel}>{"Emp ID"}</label>
          <input
            className={styles.inputValue}
            placeholder={"Enter Employee ID"}
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
                value={teacherBasicInfo?.firstName}
                required={true}
                onInput={(event) =>
                  setTeacherBasicInfo({
                    ...teacherBasicInfo,
                    firstName: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Last Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Last Name"}
                value={teacherBasicInfo?.lastName}
                required={true}
                onInput={(event) =>
                  setTeacherBasicInfo({
                    ...teacherBasicInfo,
                    lastName: event.target.value,
                  })
                }
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
                value={teacherBasicInfo?.dob}
                required={true}
                onInput={(event) =>
                  setTeacherBasicInfo({ ...teacherBasicInfo, dob: event.target.value })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Gender"}</label>
              <Form>
              <Form.Check
                inline
                label="Male"
                name="genderGroup"
                type={"radio"}
                value="male"
                onInput={(event) =>
                  setTeacherBasicInfo({
                    ...teacherBasicInfo,
                    gender: event.target.value,
                  })
                }
              />
              <Form.Check
                inline
                label="Female"
                name="genderGroup"
                type={"radio"}
                value="female"
                onInput={(event) =>
                  setTeacherBasicInfo({
                    ...teacherBasicInfo,
                    gender: event.target.value,
                  })
                }
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
                value={teacherBasicInfo?.className}
                onInput={(event) =>
                  setTeacherBasicInfo({
                    ...teacherBasicInfo,
                    className: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Stream"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter stream"}
                value={teacherBasicInfo?.stream}
                onInput={(event) =>
                  setTeacherBasicInfo({
                    ...teacherBasicInfo,
                    stream: event.target.value,
                  })
                }
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
                placeholder={"Enter AADHAAR number"}
                value={teacherBasicInfo?.adarNo}
                onInput={(event) =>
                  setTeacherBasicInfo({
                    ...teacherBasicInfo,
                    adarNo: event.target.value,
                  })
                }
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
                value={teacherFamilyDetails?.mobileNumber}
                onInput={(event) =>
                  setTeacherFamilyDetails({
                    ...teacherFamilyDetails,
                    mobileNumber: event.target.value,
                  })
                }
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
                value={teacherFamilyDetails?.fatherName}
                onInput={(event) =>
                  setTeacherFamilyDetails({
                    ...teacherFamilyDetails,
                    fatherName: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mother Name"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mother Name"}
                value={teacherFamilyDetails?.motherName}
                onInput={(event) =>
                  setTeacherFamilyDetails({
                    ...teacherFamilyDetails,
                    motherName: event.target.value,
                  })
                }
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
                value={teacherAddress?.permanentAddress}
                onInput={(event) =>
                  setTeacherAddress({
                    ...teacherAddress,
                    permanentAddress: event.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PinCode"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PinCode"}
                value={teacherAddress?.permanentPinCode}
                onInput={(event) =>
                  setTeacherAddress({
                    ...teacherAddress,
                    permanentPinCode: event.target.value,
                  })
                }
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Current Address"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Current Address"}
                value={teacherAddress?.currentAddress}
                onInput={(event) =>
                  setTeacherAddress({
                    ...teacherAddress,
                    currentAddress: event.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PinCode"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PinCode"}
                value={teacherAddress?.currentPinCode}
                onInput={(event) =>
                  setTeacherAddress({
                    ...teacherAddress,
                    currentPinCode: event.target.value,
                  })
                }
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
                <Select
                  className={styles.inputValue}
                  value={departmentName}
                  placeholder={"Enter Department"}
                  onChange={handleDepartmentSection}
                  options={departmentOptionList}
                /> 
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Designation"}</label>
                <Select
                  className={styles.inputValue}
                  value={designationName}
                  placeholder={"Select Designation"}
                  onChange={handleDesignationSelect}
                  options={designationOptionList}
                  isDisabled={!departmentName} // Disable if no department selected
                />
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Date Of Joining"}</label>
              <input
                className={styles.inputValue}
                type={"date"}
                placeholder={"Enter Date Of Joining"}
              ></input>
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
