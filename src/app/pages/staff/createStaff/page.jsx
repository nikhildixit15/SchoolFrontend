"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getStudentBasicInfo } from "@/app/services/student/studentService";
import { saveStudentInfo } from "@/app/services/staff/staffService";


import { Form } from "react-bootstrap";
import Select from "react-select";
import {
  getDepartmentList,
  getDesignationList,
} from "@/app/services/staff/staffService";
import { getOptionList } from "@/app/utils/optionListUtils";
import { categoryList, martialStatusList, religionList } from "@/app/utils/constants";

export default function CreateStaff() {
  const [basicInfo, setBasicInfo] = useState({});
  const [address, setAddress] = useState({});
  const [familyInfo, setFamilyInfo] = useState({});
  const [profileDetails, setProfileDetails] = useState({});
  const [adminInfo, setAdminInfo] = useState({});
  const [experience, setExperience] = useState({});

  const [departmentName, setDepartmentName] = useState();
  const [departmentOptionList, setDepartmentOptionList] = useState();
  const [designationName, setDesignationName] = useState();
  const [designationOptionList, setDesignationOptionList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [religiousValue, setReligiousValue] = useState();
  const [martialStatusValue, setMartialStatusValue] = useState();
  const [categoryValue, setCategoryValue] = useState();

  useEffect(() => {
    // fetchStudentBasicInfo();//for edit flow
    fetchDepartments();
    fetchDesignations();
  }, []);

  async function fetchStudentBasicInfo(data) {
    const result = await getStudentBasicInfo(data);
    setProfileDetails(result);
    console.log("####", result);
  }
  
  async function fetchDepartments() {
    const response = await getDepartmentList();
    const departments = response.data;

    const formattedOptions = getOptionList(departments);
    setDepartmentOptionList(formattedOptions);
  }

  async function fetchDesignations() {
    const response = await getDesignationList();
    const designations = response.data;
    setDesignationList(designations)
    const formattedOptions =  getOptionList(designations);
    setDesignationOptionList(formattedOptions);
  }

  function religionValueChanged(value){
      setBasicInfo({
        ...familyInfo,
        religion: value.value,
      })
      setReligiousValue(value)
  }

  function martialStatusValueChanged(value){
      setFamilyInfo({
        ...familyInfo,
        martialStatus: value.value,
      })
      setMartialStatusValue(value)
  }

  function handleDepartmentSection(selectedOption) {
    setProfileDetails({
      ...profileDetails,
      department: selectedOption.value
    });
    setDepartmentName(selectedOption);

    // Use selectedOption.label instead of departmentName.label
    const filteredList = selectedOption?.label 
      ? designationList.filter((item) => item.departmentName === selectedOption.label)
      : [];
    const formattedOptions = getOptionList(filteredList);

      
    setDesignationOptionList(formattedOptions);
    setDesignationName(null); // Reset designation when department changes
  }

  function handleDesignationSelect(selectedOption) {
    setProfileDetails({
      ...profileDetails,
      designation: selectedOption.value
    });
    setDesignationName(selectedOption);
  }

    function categoryValueChanged(value){
      setBasicInfo({
        ...basicInfo,
        category: value.value,
      })
      setCategoryValue(value)
  }

  async function onSaveBtnClicked() {
    // First validate the data
    // const isValid = await validateTeacherData();
    // if (!isValid) {
    //   return;
    // }

    const payload = {
      basicInfo,
      address,
      familyInfo,
      profileDetails,
      experience
    };

    await saveStudentInfo(payload)

    console.log("###payload", payload)
    alert("Data saved successfully");
  }  

  async function validateTeacherData() {
    if(!basicInfo.firstName){
      alert("please enter firstName");
      return false;
    }
    if(!basicInfo.lastName){
      alert("please enter lastName")
      return false;
    }
    if(!basicInfo.className){
      alert("please enter className")
      return false;
    }
    if(!basicInfo.stream){
      alert("please enter section")
      return false;
    }
    if(!basicInfo.dob){
      alert("please enter dob")
      return false;
    }
    if(!basicInfo.adarNumber){
      alert("please enter adarNo")
      return false;
    }
    if(!familyInfo.fatherName){
      alert("please enter fatherName")
      return false;
    }
    if(!familyInfo.motherName){
      alert("please enter motherName")
      return false;
    }
    if(!familyInfo.mobileNumber){
      alert("please enter mobileNumber")
      return false;
    }
    if(!address.permanentAddress){
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
            value={adminInfo?.employeeId}
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
                value={basicInfo?.firstName}
                required={true}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
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
                value={basicInfo?.lastName}
                required={true}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
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
                value={basicInfo?.dob}
                required={true}
                onInput={(event) =>
                  setBasicInfo({ ...basicInfo, dob: event.target.value })
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
                  setBasicInfo({
                    ...basicInfo,
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
                  setBasicInfo({
                    ...basicInfo,
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
                value={basicInfo?.className}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
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
                value={basicInfo?.stream}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    stream: event.target.value,
                  })
                }
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Religion"}</label>
              <Select
                className={styles.inputValue}
                value={religiousValue}
                placeholder={"Enter Religion"}
                onChange={religionValueChanged}
                options={religionList}
              />
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Category"}</label>

              <Select
                className={styles.inputValue}
                value={categoryValue}
                placeholder={"Enter Category"}
                onChange={categoryValueChanged
                }
                options={categoryList}
              />
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"ADAR No."}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter AADHAAR number"}
                value={basicInfo?.adarNumber}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    adarNumber: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Blood Group"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter blood group"}
                value={basicInfo?.bloodGroup}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    bloodGroup: event.target.value,
                  })
                }
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PAN Number"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PAN number"}
                value={basicInfo?.panNumber}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    panNumber: event.target.value,
                  })
                }

              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Email "}</label>
              <input
                className={styles.inputValue}
                value={basicInfo?.email}
                placeholder={"Enter email address"}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    email: event.target.value,
                  })
                }
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mobile Number"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mobile Number"}
                value={basicInfo?.mobileNumber}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
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
                value={basicInfo?.altMobileNumber}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    altMobileNumber: event.target.value,
                  })
                }
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
                value={familyInfo?.fatherName}
                onInput={(event) =>
                  setFamilyInfo({
                    ...familyInfo,
                    fatherName: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Religion"}</label>
               <Select
                className={styles.inputValue}
                value={religiousValue}
                placeholder={"Enter Religion"}
                onChange={religionValueChanged}
                options={religionList}
              />
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Marital Status"}</label>
               <Select
                className={styles.inputValue}
                value={martialStatusValue}
                placeholder={"Enter Marital status"}
                onChange={martialStatusValueChanged}
                options={martialStatusList}
              />
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Spouse Name"}</label>
              <input
                className={styles.inputValue}
                value={familyInfo?.spouseName}
                onInput={(event) =>
                  setFamilyInfo({
                    ...familyInfo,
                    spouseName: event.target.value,
                  })
                }
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
                value={address?.permanentAddress}
                onInput={(event) =>
                  setAddress({
                    ...address,
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
                value={address?.permanentPinCode}
                onInput={(event) =>
                  setAddress({
                    ...address,
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
                value={address?.currentAddress}
                onInput={(event) =>
                  setAddress({
                    ...address,
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
                value={address?.currentPinCode}
                onInput={(event) =>
                  setAddress({
                    ...address,
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
                value={profileDetails?.dateOfJoining}
                onInput={(event) =>
                  setProfileDetails({
                    ...profileDetails,
                    dateOfJoining: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Trained/Untrained"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Trained/Untrained"}
                value={profileDetails?.trained}
                onInput={(event) =>
                  setProfileDetails({
                    ...profileDetails,
                    trained: event.target.value,
                  })
                }
              ></input>
            </div>
          </div>

          {/* <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Class Teacher"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Class"}
                onInput={(event) =>
                  setProfileDetails({
                    ...profileDetails,
                    classTeacher: event.target.value,
                  })
                }              
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Section"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Section"}
                onInput={(event) =>
                  setProfileDetails({
                    ...profileDetails,
                    section: event.target.value,
                  })
                }
              ></input>
            </div>
          </div> */}

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Profile Pic"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter profile pic"}
                value={profileDetails?.profilePicUrl}
                onInput={(event) =>
                  setProfileDetails({
                    ...profileDetails,
                    profilePicUrl: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Resume"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter resume"}
                value={profileDetails?.resumeUrl}
                onInput={(event) =>
                  setProfileDetails({
                    ...profileDetails,
                    resumeUrl: event.target.value,
                  })
                }
              ></input>
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Pan Card"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Upload Pan card"}
                value={profileDetails?.panCardUrl}
                onInput={(event) =>
                  setProfileDetails({
                    ...profileDetails,
                    panCardUrl: event.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"AADHAR Card"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Upload AADHAR"}
                value={profileDetails?.aadharUrl}
                onInput={(event) =>
                  setProfileDetails({
                    ...profileDetails,
                    aadharUrl: event.target.value,
                  })
                }
              ></input>
            </div>
          </div>
        </div>


        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <label>Experience</label>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Organization Name"}</label>
              <textarea
                className={styles.inputValue}
                placeholder={"Enter Organization Name"}
                value={experience?.organizationName}
                onInput={(event) =>
                  setExperience({
                    ...experience,
                    organizationName: event.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Years of experience"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter years of experience"}
                value={experience?.experienceYear}
                onInput={(event) =>
                  setExperience({
                    ...experience,
                    experienceYear: event.target.value,
                  })
                }
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
