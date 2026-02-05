"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStudentBasicInfo } from "@/app/services/student/studentService";
import { saveStudentInfo } from "@/app/services/staff/staffService";
import FileChooser from "@/app/components/fileChooser/fileChooser";

import { Form } from "react-bootstrap";
import Select from "react-select";
import {
  getDepartmentList,
  getDesignationList,
} from "@/app/services/staff/staffService";
import { getOptionList } from "@/app/utils/optionListUtils";
import {
  categoryList,
  martialStatusList,
  religionList,
  bloodGroups,
  trainedList,
} from "@/app/utils/constants";

export default function CreateStaff() {
  const [basicInfo, setBasicInfo] = useState({ gender: "Male" });
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
  const [bloodValue, setBloodValue] = useState();
  const [streamOptionList, setStreamOptionList] = useState();
  const [streamValue, setStreamValue] = useState();
  const [classValue, setClassValue] = useState();
  const [classOptionList, setClassOptionList] = useState();
  const [trainedValue, setTrainedValue] = useState();
  const [profileValue, setProfileValue] = useState();

  const streams = useSelector((state) => state.class.streamList);
  const classes = useSelector((state) => state.class.classes);

  useEffect(() => {
    console.log(streams);
    // fetchStudentBasicInfo();//for edit flow
    fetchDepartments();
    fetchDesignations();
    const list = getOptionList(streams);
    setStreamOptionList(list);
    const classlist = getOptionList(classes);
    setClassOptionList(classlist);
  }, [streams, classes]);

  async function onFileSelected(event, item) {
    const file = event.target.files[0];
    console.log("####subjectList", file);

    const formData = new FormData();
    formData.append("file", file);
    const attachmentData = {
      attachment: formData,
      name: file.name,
      type: file.type,
    };
    setProfileValue(attachmentData);
    console.log(profileValue);
  }

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
    setDesignationList(designations);
    const formattedOptions = getOptionList(designations);
    setDesignationOptionList(formattedOptions);
  }

  function streamValueChanged(value) {
    setBasicInfo({
      ...basicInfo,
      stream: value.value,
    });
    setStreamValue(value);
  }

  function religionValueChanged(value) {
    setBasicInfo({
      ...basicInfo,
      religion: value.value,
    });
    setReligiousValue(value);
  }

  function classValueChanged(value) {
    setBasicInfo({
      ...basicInfo,
      className: value.value,
    });
    setClassValue(value);
  }

  function bloodValueChanged(value) {
    setBasicInfo({
      ...basicInfo,
      blood: value.value,
    });
    setBloodValue(value);
  }

  function martialStatusValueChanged(value) {
    setFamilyInfo({
      ...familyInfo,
      martialStatus: value.value,
    });
    setMartialStatusValue(value);
  }
  function trainedValueChanged(value) {
    setProfileDetails({
      ...profileDetails,
      trained: value.value,
    });
    setTrainedValue(value);
  }

  function handleDepartmentSection(selectedOption) {
    setProfileDetails({
      ...profileDetails,
      department: selectedOption.value,
    });
    setDepartmentName(selectedOption);

    // Use selectedOption.label instead of departmentName.label
    const filteredList = selectedOption?.label
      ? designationList.filter(
          (item) => item.departmentName === selectedOption.label,
        )
      : [];
    const formattedOptions = getOptionList(filteredList);

    setDesignationOptionList(formattedOptions);
    setDesignationName(null); // Reset designation when department changes
  }

  function handleDesignationSelect(selectedOption) {
    setProfileDetails({
      ...profileDetails,
      designation: selectedOption.value,
    });
    setDesignationName(selectedOption);
  }

  function categoryValueChanged(value) {
    setBasicInfo({
      ...basicInfo,
      category: value.value,
    });
    setCategoryValue(value);
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
      experience,
    };

    await saveStudentInfo(payload);

    console.log("###payload", payload);
    alert("Data saved successfully");
  }

  async function validateTeacherData() {
    if (!basicInfo.firstName) {
      alert("please enter firstName");
      return false;
    }
    if (!basicInfo.lastName) {
      alert("please enter lastName");
      return false;
    }
    if (!basicInfo.className) {
      alert("please enter className");
      return false;
    }
    if (!basicInfo.stream) {
      alert("please enter section");
      return false;
    }
    if (!basicInfo.salary) {
      alert("please enter salary");
      return false;
    }
    if (!basicInfo.dob) {
      alert("please enter dob");
      return false;
    }
    if (!basicInfo.adarNumber) {
      alert("please enter adarNo");
      return false;
    }
    if (!familyInfo.fatherName) {
      alert("please enter fatherName");
      return false;
    }
    if (!familyInfo.motherName) {
      alert("please enter motherName");
      return false;
    }
    if (!familyInfo.mobileNumber) {
      alert("please enter mobileNumber");
      return false;
    }
    if (!address.permanentAddress) {
      alert("please enter permanentAddress");
      return false;
    }

    return true;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
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
                value={basicInfo?.firstName || ""}
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
                value={basicInfo?.lastName || ""}
                required={true}
                onInput={(event) => {
                  console.log("###event.target.value", event.target.value);
                  setBasicInfo({
                    ...basicInfo,
                    lastName: event.target.value,
                  });
                }}
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
                value={basicInfo?.dob || ""}
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
                  type="radio"
                  value="Male"
                  checked={basicInfo.gender === "Male"}
                  onChange={(event) =>
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
                  type="radio"
                  value="Female"
                  checked={basicInfo.gender === "Female"}
                  onChange={(event) =>
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
              <label className={styles.titleLabel}>{"Email "}</label>
              <input
                className={styles.inputValue}
                value={basicInfo?.email || ""}
                placeholder={"Enter email address"}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    email: event.target.value,
                  })
                }
              ></input>
            </div>

            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Stream"}</label>
              <Select
                className={styles.inputValue}
                value={streamValue}
                placeholder={"Enter Stream"}
                onChange={streamValueChanged}
                options={streamOptionList}
              />
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
                onChange={categoryValueChanged}
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
                value={basicInfo?.adarNumber || ""}
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
              <Select
                className={styles.inputValue}
                value={bloodValue}
                placeholder={"Enter Blood Group"}
                onChange={bloodValueChanged}
                options={bloodGroups}
              />
            </div>
          </div>
          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"PAN Number"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter PAN number"}
                value={basicInfo?.panNumber || ""}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    panNumber: event.target.value,
                  })
                }
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Salary"}</label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Salary"}
                value={basicInfo?.salary || ""}
                onInput={(event) =>
                  setBasicInfo({
                    ...basicInfo,
                    salary: event.target.value,
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
                value={basicInfo?.mobileNumber || ""}
                onInput={(event) => {
                  setBasicInfo({
                    ...basicInfo,
                    mobileNumber: event.target.value,
                  });
                }}
              ></input>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>
                {"Alternate Mobile Number"}
              </label>
              <input
                className={styles.inputValue}
                placeholder={"Enter Alternate Mobile Number"}
                value={basicInfo?.altMobileNumber || ""}
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
                value={familyInfo?.fatherName || ""}
                onInput={(event) =>
                  setFamilyInfo({
                    ...familyInfo,
                    fatherName: event.target.value,
                  })
                }
              ></input>
            </div>
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
          </div>
          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Spouse Name"}</label>
              <input
                className={styles.inputValue}
                value={familyInfo?.spouseName || ""}
                onInput={(event) =>
                  setFamilyInfo({
                    ...familyInfo,
                    spouseName: event.target.value,
                  })
                }
                placeholder={"Enter Spouse Name"}
              ></input>
            </div>
            <div className={styles.halfRow}></div>
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
                value={address?.permanentAddress || ""}
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
                value={address?.permanentPinCode || ""}
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
                value={address?.currentAddress || ""}
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
                value={address?.currentPinCode || ""}
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
                value={profileDetails?.dateOfJoining || ""}
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
              <Select
                className={styles.inputValue}
                value={trainedValue}
                placeholder={"Enter Trained/Untrained"}
                onChange={trainedValueChanged}
                options={trainedList}
              />
            </div>
          </div>

          <div className={styles.fullRow}>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>{"Profile Pic"}</label>
              <FileChooser
                onChange={(event) => onFileSelected(event, item)}
              ></FileChooser>
            </div>
            <div className={styles.halfRow}></div>
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
                value={experience?.organizationName || ""}
                onInput={(event) =>
                  setExperience({
                    ...experience,
                    organizationName: event.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className={styles.halfRow}>
              <label className={styles.titleLabel}>
                {"Years of experience"}
              </label>
              <input
                className={styles.inputValue}
                placeholder={"Enter years of experience"}
                value={experience?.experienceYear || ""}
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
