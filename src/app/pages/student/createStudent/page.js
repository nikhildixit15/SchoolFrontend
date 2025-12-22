"use client";

import Select from "react-select";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  saveStudentInfo,
  getStudentInfo,
} from "@/app/services/student/studentService";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getClassOptionList } from "@/app/utils/optionListUtils";
import { bloodGroups, categoryList, religionList } from "@/app/utils/constants";

export default function CreateStudent() {
  const [stdBasicInfo, setStdBasicInfo] = useState({gender:"Male"});
  const [stuAddress, setStuAddress] = useState({});
  const [stuFamilyDetails, setStuFamilyDetails] = useState({});
  const [previousSchoolInfo, setPreviousSchoolInfo] = useState({});
  const [classOptionList, setClassOptionList] = useState();

  const [bloodGroupValue, setBloodGroupValue] = useState();
  const [sectionValue, setSectionValue] = useState();
  const [classValue, setClassValue] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const [religiousValue, setReligiousValue] = useState();
  const [sectionList, setSectionList] = useState(); 

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

  function sectioData(value) {
    const selectedClass = classes.find((cls) => cls._id === value.id);
    if (selectedClass) {
      const sections =
        selectedClass.sections?.map((sec) => ({
          value: sec.name,
          label: sec.name,
        })) || [];
      setSectionList(sections);
    } else {
      setSectionList([]);
    }
  }

  function classValueChanged(value) {
    setStdBasicInfo({
      ...stdBasicInfo,
      className: value.value,
    });
    setClassValue(value);
    sectioData(value);
  }

  function bloodGroupValueChanged(value) {
    setStdBasicInfo({
      ...stdBasicInfo,
      bloodGroup: value.value,
    });
    setBloodGroupValue(value);
  }

  function sectionValueChanged(value) {
    setStdBasicInfo({
      ...stdBasicInfo,
      section: value.value,
    });
    setSectionValue(value);
  }

  function categoryValueChanged(value) {
    setStuFamilyDetails({
      ...stuFamilyDetails,
      category: value.value,
    });
    setCategoryValue(value);
  }

  function religionValueChanged(value) {
    setStuFamilyDetails({
      ...stuFamilyDetails,
      religion: value.value,
    });
    setReligiousValue(value);
  }

  async function validateStudentData() {
    if (!stdBasicInfo.firstName) {
      alert("please enter firstName");
      return false;
    }
    if (!stdBasicInfo.lastName) {
      alert("please enter lastName");
      return false;
    }
    if (!stdBasicInfo.className) {
      alert("please enter className");
      return false;
    }
    if (!stdBasicInfo.section) {
      alert("please enter section");
      return false;
    }
    if (!stdBasicInfo.dob) {
      alert("please enter dob");
      return false;
    }
    if (!stdBasicInfo.adarNo) {
      alert("please enter adarNo");
      return false;
    }
    if (!stuFamilyDetails.fatherName) {
      alert("please enter fatherName");
      return false;
    }
    if (!stuFamilyDetails.motherName) {
      alert("please enter motherName");
      return false;
    }
    if (!stuFamilyDetails.mobileNumber) {
      alert("please enter mobileNumber");
      return false;
    }
    if (!stuAddress.permanentAddress) {
      alert("please enter permanentAddress");
      return false;
    }

    return true;
  }

  async function postStudentData() {
    const isValid = await validateStudentData();

    const payload = {
      basicInfo: stdBasicInfo,
      address: stuAddress,
      familyInfo: stuFamilyDetails,
      previousSchoolInfo,
    };

    console.log("###payload", payload);
    if (isValid) {
      const response = await saveStudentInfo(payload);
      if (response.data) {
        alert("Data saved successfully");
      } else {
        alert("Error while saving");
      }
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
    type="radio"
    value="Male"
    checked={stdBasicInfo.gender === "Male"}    
    onChange={(event) =>
      setStdBasicInfo({
        ...stdBasicInfo,
        gender: event.target.value,   
      })
    }
  />
  <Form.Check
    inline
    label="Female"
    name="genderGroup"
    type="radio"
    value="Female"
    checked={stdBasicInfo.gender === "Female"}   
    onChange={(event) =>
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
                onChange={classValueChanged}
                options={classOptionList}
                instanceId="class-select"
              />
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Section"}</label>
              <Select
                className={styles.inputValue}
                value={sectionValue}
                placeholder={"Enter section"}
                onChange={sectionValueChanged}
                options={sectionList}
                instanceId="section-select"
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
                onChange={bloodGroupValueChanged}
                options={bloodGroups}
                instanceId="blood-group-select"
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
              <label className={styles.titleLabel}>{"Mother Occupation"}</label>
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
                onChange={religionValueChanged}
                options={religionList}
                instanceId="religion-select"
              />
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Category"}</label>

              <Select
                className={styles.inputValue}
                value={categoryValue}
                placeholder={"Enter Category"}
                onChange={categoryValueChanged}
                options={categoryList}
                instanceId="category-select"
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
                {"Email"}
              </label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Email"}
                value={stuFamilyDetails?.email}
                onInput={(event) =>
                  setStuFamilyDetails({
                    ...stuFamilyDetails,
                    email: event.target.value,
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
                value={previousSchoolInfo?.schoolName}
                onInput={(event) =>
                  setPreviousSchoolInfo({
                    ...previousSchoolInfo,
                    schoolName: event.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PassOut Year"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PassOut Year"}
                value={previousSchoolInfo?.passOutYear}
                onInput={(event) =>
                  setPreviousSchoolInfo({
                    ...previousSchoolInfo,
                    passOutYear: event.target.value,
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
