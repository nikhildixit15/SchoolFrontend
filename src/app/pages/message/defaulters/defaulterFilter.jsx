import Select from "react-select";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import { ClassSection, SelectOption } from "@/app/types/commonTypes";
import { monthList } from "@/app/utils/constants";

export default function DefaulterFilter({ getStudentData }) {
  const [monthName, setMonthName] = useState();
  const [amount, setAmount] = useState();
  const [monthOptionList, setMonthOptionList] = useState();


  useEffect(() => {
    createOptionList();
  }, []);

  function createOptionList() {
    const list = [];
    monthList.map((item) => {
      list.push({
        ...item,
        value: item.monthName,
        label: item.monthName,
      });
    });
    setMonthOptionList(list);
  }

  function handleMonthSelect(value) {
    setMonthName(value);
  }

  function onAmountTextChanged(event) {
    setAmount(event.target.value);
  }



  return (
    <>
      <div className={styles.container}>
        <div className={styles.dropdownContainer}>
          <label>Month:</label>
          <Select
            className={styles.classDropdown}
            value={monthName}
            onChange={handleMonthSelect}
            options={monthOptionList}
          />
        </div>
        <div className={styles.dropdownContainer}>
          <span>Amount:</span>
          <input type="input" onInput={onAmountTextChanged} ></input>
        </div>

        <button
          onClick={() => getStudentData({ monthName,  amount })}
          className={styles.btn}
        >
          Get data
        </button>
      </div>
    </>
  );
}
