import { feeDetailsByMonthAndClass, studentFeeSummary } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function updateStudentFeeStatus(data) {
  if (isMock) {
    return { success: true };
  }
  return await axiosClient.post("/profile", data);
}


export async function getFeeDetailsByMonthAndClass(data) {
  if (isMock) {
    return feeDetailsByMonthAndClass;
  }
  return await axiosClient.get("/feeDetailsByClass");
}

export async function submitStudentFee(data) {
  if (isMock) {
    //logic to be in backend

    // return {
    //   success: true,
    //   dueAmount:
    //     data.paidAmount < data.totalAmount
    //       ? data.totalAmount - data.paidAmount
    //       : 0,
    //   receiptUrl: "url",
    //   paidAmount: data.totalAmount > data.paidAmount ? data.paidAmount : 0,
    //   creditInAdvance:
    //     data.paidAmount > data.totalAmount
    //       ? data.paidAmount - data.totalAmount
    //       : 0,
    // };
    return studentFeeSummary;
  }
  return await axiosClient.post("/submitStudentFee", data);
}

export async function addFeeByAdmin(data) {
  return await axiosClient.post("/fee/addFeeByAdmin", data);
}

export async function getStudentFeeDetail(studentId) {
  if (!isMock) {
    return studentFeeSummary;
  }
  return await axiosClient.get(`/fee/getFeeById/${studentId}`);
}

export async function getStudentFeePaymentHistory(studentId) {
  if (!isMock) {
    return studentFeeSummary;
  }
  return await axiosClient.get(`/fee/getFeePaymentById/${studentId}`);
}

export async function fetchNameWise(query) {
  return axiosClient.get("/fee/fetchNameWise", {
    params: { query },
  });
}

export async function getStudentsByClass(data) { 
  return await axiosClient.get("/fee/studentByClass", data);
}

export async function getStudentAmount(data) { 
  return await axiosClient.get("/fee/studentFeeData", data);
}

export async function getSeeDetail(data) { 
  return await axiosClient.get("/fee/seeDetail", data);
}
export async function submitFeeByAdmin(data) { 
  return await axiosClient.post("/fee/submitFeeByAdmin", data);
}

export async function downloadFeeReceipt(data) {
  if (isMock) {
    return {
      success: true,
      dueAmount: "base64",
    };
  }
  return await axiosClient.get("/downloadFeeReceipt", data);
}
