"use client";

import Select from "react-select";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  getStudentBasicInfo,
  saveStudentInfo,
  getStudentInfo,
} from "@/app/services/student/studentService";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getClassOptionList } from "@/app/utils/optionListUtils";
import { bloodGroups, categoryList, religionList, sectionList } from "@/app/utils/constants";

export default function CreateStudent() {
  const [stdBasicInfo, setStdBasicInfo] = useState({firstName:"", lastName:"", adarNo:"", dob:"", class:"", bloodGroup:"", section:""});
  const [stuAddress, setStuAddress] = useState({});
  const [stuFamilyDetails, setStuFamilyDetails] = useState({});
  const [previousSchoolInfo, setPreviousSchoolInfo] = useState({});
  const [classOptionList, setClassOptionList] = useState();

  const [bloodGroupValue, setBloodGroupValue] = useState();
  const [sectionValue, setSectionValue] = useState();
  const [classValue, setClassValue] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const [religiousValue, setReligiousValue] = useState();

  const classes = useSelector((state) => state.class.classes);

  useEffect(() => {
    console.log(classes);
    const list = getClassOptionList(classes);
    setClassOptionList(list);
  }, [classes]);

  async function fetchStudentBasicInfo(data) {
    const result = await getStudentInfo(data);
    setStdBasicInfo(result.stuBasicInfo);
    setStuAddress(result.stuAddress);
    setStuFamilyDetails(result.stuFamilyDetails);
    setPreviousSchoolInfo(result.previousSchoolInfo);
    console.log("####", result);
  }

  function classValueChanged(value){
      setStdBasicInfo({
        ...stdBasicInfo,
        class: value.value,
      })
      setClassValue(value)
  }

  function bloodGroupValueChanged(value){
      setStdBasicInfo({
        ...stdBasicInfo,
        bloodGroup: value.value,
      })
      setBloodGroupValue(value)
  }

  function sectionValueChanged(value){
      setStdBasicInfo({
        ...stdBasicInfo,
        section: value.value,
      })
      setSectionValue(value)
  }

  function categoryValueChanged(value){
      setStuFamilyDetails({
        ...stuFamilyDetails,
        category: value.value,
      })
      setCategoryValue(value)
  }

  function religionValueChanged(value){
      setStuFamilyDetails({
        ...stuFamilyDetails,
        religion: value.value,
      })
      setReligiousValue(value)
  }

  async function validateStudentData() {
    if(!stdBasicInfo.firstName){
      alert("please enter firstName");
      return;
    }
    if(!stdBasicInfo.lastName){
      alert("please enter lastName")
      return;
    }
    // if(!stdBasicInfo.className){
    //   alert("please enter className")
    //   return;
    // }
    if(!stdBasicInfo.section){
      alert("please enter section")
      return;
    }
    if(!stdBasicInfo.dob){
      alert("please enter dob")
      return;
    }
    if(!stdBasicInfo.adarNo){
      alert("please enter adarNo")
      return;
    }
    if(!stuFamilyDetails.fatherName){
      alert("please enter fatherName")
      return;
    }
    if(!stuFamilyDetails.motherName){
      alert("please enter motherName")
      return;
    }
    if(!stuFamilyDetails.mobileNumber){
      alert("please enter mobileNumber")
      return;
    }
    if(!stuAddress.permanentAddress){
      alert("please enter permanentAddress")
      return;
    }


  }

  async function postStudentData() {
   const isValid = await validateStudentData();

    const payload = {
      stdBasicInfo,
      stuAddress,
      stuFamilyDetails,
      previousSchoolInfo,
    };
    console.log("###payload", payload)
    if(isValid){
     await saveStudentInfo(payload);
      alert("Data saved successfully");
      
    }
  }

  async function onSaveBtnClicked() {
    await postStudentData();
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
                value={stdBasicInfo?.firstName}
                required={true}
                onInput={(event) =>
                  setStdBasicInfo({
                    ...stdBasicInfo,
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
                value={stdBasicInfo?.lastName}
                required={true}
                onInput={(event) =>
                  setStdBasicInfo({
                    ...stdBasicInfo,
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
                value={stdBasicInfo?.dob}
                required={true}
                onInput={(event) =>
                  setStdBasicInfo({ ...stdBasicInfo, dob: event.target.value })
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
                  value={stdBasicInfo?.gender}
                  onInput={(event) =>
                    setStdBasicInfo({
                      ...stdBasicInfo,
                      gender: event.target.value,
                    })
                  }
                  defaultChecked
                />
                <Form.Check
                  inline
                  label="Female"
                  name="genderGroup"
                  type={"radio"}
                  value={stdBasicInfo?.gender}
                  onInput={(event) =>
                    setStdBasicInfo({
                      ...stdBasicInfo,
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
              <Select
                className={styles.inputValue}
                value={classValue}
                placeholder={"Enter class name"}
                onChange={classValueChanged
                }
                options={classOptionList}
              />
  
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Section"}</label>
              <Select
                className={styles.inputValue}
                value={sectionValue}
                placeholder={"Enter section"}
                onChange={sectionValueChanged
                }
                options={sectionList}
              />
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"ADAR No."}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter ADAR number"}
                value={stdBasicInfo?.adarNo}
                onInput={(event) =>
                  setStdBasicInfo({
                    ...stdBasicInfo,
                    adarNo: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Blood Group"}</label>

              <Select
                className={styles.inputValue}
                value={bloodGroupValue}
                placeholder={"Enter blood group"}
                onChange={bloodGroupValueChanged
                }
                options={bloodGroups}
              />

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
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
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
                value={stuFamilyDetails?.motherName}
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
                    motherName: event.target.value,
                  })
                }
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
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
                    motherOccupation: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Father Occupation"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Occupation"}
                value={stuFamilyDetails?.fatherOccupation}
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
                    fatherOccupation: event.target.value,
                  })
                }
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
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
                    fatherIncome: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Mother Income"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mother Income"}
                value={stuFamilyDetails?.motherIncome}
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
                    motherIncome: event.target.value,
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
                onChange={religionValueChanged 
                }
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
              <label className={styles.titleLabel}>{"Mobile Number"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Mobile Number"}
                value={stuFamilyDetails?.mobileNumber}
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
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
                value={stuFamilyDetails?.altMobileNumber}
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
                    altMobileNumber: event.target.value,
                  })
                }
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
                onInput={(event) =>
                  setStuAddress({
                    ...stuAddress,
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
                value={stuAddress?.permanentPinCode}
                onInput={(event) =>
                  setStuAddress({
                    ...stuAddress,
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
                value={stuAddress?.currentAddress}
                onInput={(event) =>
                  setStuAddress({
                    ...stuAddress,
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
                value={stuAddress?.currentPinCode}
                onInput={(event) =>
                  setStuAddress({
                    ...stuAddress,
                    currentPinCode: event.target.value,
                  })
                }
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
                onInput={(event) =>
                  setPreviousSchoolInfo({
                    ...previousSchoolInfo,
                    previousSchoolName: event.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PassOut Year"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PassOut Year"}
                value={previousSchoolInfo?.previousSchoolPassOut}
                onInput={(event) =>
                  setPreviousSchoolInfo({
                    ...previousSchoolInfo,
                    previousSchoolPassOut: event.target.value,
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
