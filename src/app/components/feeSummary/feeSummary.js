"use client";

import styles from "./feeSummary.module.css";
import { useEffect, useMemo, useState } from "react";
import {
  getStudentFeeSummary,
  submitStudentFee,
} from "@/app/services/fees/feeServices";
import PaymentHistoryTable from "../paymentHistoryTable/paymentHistoryTable";

export default function FeeSummary() {
  const [paidAmount, setPaidAmount] = useState();
  const [paymentList, setPaymentList] = useState();
  const [dueSummary, setDueSummary] = useState();

  useEffect(() => {
    getFeeSummary();
  }, []);

  const totalDueAmount = useMemo(() => {
    const initialValue = 0;
    let result = dueSummary?.duesList?.reduce(
      (accumulator, currentItem) => accumulator + parseInt(currentItem.amount),
      initialValue
    );

    if (dueSummary?.paidAmount) {
      result -= dueSummary?.paidAmount;
    }
    return result;
  }, [dueSummary]);

  async function getFeeSummary(data) {
    const result = await getStudentFeeSummary(data);
    setDueSummary(result?.duePaymentInfo);
    setPaymentList(result?.paymentHistory);

    console.log("####", result);
  }

  function onTextChanged(event) {
    let num = parseInt(event.target.value);

    setPaidAmount(num || 0);
  }

  async function onSubmitBtnClicked(event) {
    // api call to fee submission
    const postData = {
      paidAmount,
      totalDue: totalDueAmount,
      userName: "",
      collectedBy: "",
    };
    const result = await submitStudentFee(postData);
    setDueSummary(result?.duePaymentInfo);
    setPaymentList(result?.paymentHistory);
    console.log(result.success);
  }

  return (
    <>
      <main>
        <div className={styles.dueFeeContainer}>
          {dueSummary?.dueAmount != 0 && (
            <div>
              <div className={styles.dueRow}>
                <label className={styles.dueFeeLabel}>{"Due Amount"}</label>
              </div>
              <div>
                {dueSummary?.duesList?.map((item) => {
                  return (
                    <div>
                      <div className={styles.dueRow}>
                        <label className={styles.dueFeeLabel}>
                          {item.name}
                        </label>
                        <label className={styles.dueFee}>{item?.amount}</label>
                      </div>
                    </div>
                  );
                })}
                {dueSummary?.paidAmount > 0 && (
                  <div className={styles.totalDue}>
                    <label className={styles.dueFeeLabel}>
                      {"Paid Amount"}
                    </label>
                    <label className={styles.dueFee}>
                      {-dueSummary?.paidAmount}
                    </label>
                  </div>
                )}
                <div className={styles.totalDue}>
                  <label className={styles.dueFeeLabel}>{"Total Due"}</label>
                  <label className={styles.dueFee}>{totalDueAmount}</label>
                </div>
              </div>
            </div>
          )}
          {dueSummary?.dueAmount == 0 && (
            <div>
              <label>
                There is no dues, still you can collect fee in advance if
                student submit
              </label>
            </div>
          )}
        </div>

        <div className={styles.collectFeeRow}>
          <label className={styles.dueFeeLabel}>Collect fee</label>
          <input
            value={paidAmount}
            pattern="[0-9]"
            onInput={onTextChanged}
            className={styles.dueFee}
          ></input>
          <button onClick={onSubmitBtnClicked}>Submit</button>
        </div>

        <div className={styles.feeHistory}>
          <div className={styles.feeHistoryHeader}>
            <label>Fee History</label>
          </div>
          <div>
            <PaymentHistoryTable
              paymentList={paymentList}
            ></PaymentHistoryTable>
          </div>
        </div>
      </main>
    </>
  );
}
