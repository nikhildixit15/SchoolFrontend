import {
  studentAttendanceList,
  classwiseAttendanceList,
  datewiseAttendanceList,
  attendanceRegisterData,
} from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getStudentAttendanceList(data) {
  if (isMock) {
    return studentAttendanceList;
  }
  return await axiosClient.get("/studentAttendanceList");
}

export async function getClasswiseAttendanceList(data) {
  if (isMock) {
    return classwiseAttendanceList;
  }
  return await axiosClient.get("/classwiseAttendance");
}

export async function getDatewiseAttendanceList(data) {
  if (isMock) {
    return datewiseAttendanceList;
  }
  return await axiosClient.get("/datewiseAttendanceList");
}

export async function getAttendanceRegisterData(data) {
  if (isMock) {
    return attendanceRegisterData;
  }
  return await axiosClient.get("/datewiseAttendanceList");
}
