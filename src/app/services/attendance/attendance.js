import {
  studentAttendanceList,
  classwiseAttendanceList,
  datewiseAttendanceList,
  attendanceRegisterData,
  studentAttendances,
} from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getStudentAttendanceList(data) {
  return await axiosClient.get("/attendance", data);
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

export async function getStudentAttendanceById(data) {
  if (isMock) {
    return studentAttendances;
  }
  return await axiosClient.get("/studentAttendance");
}

export async function saveAttendance(data) {
  return await axiosClient.post("/attendance", data);
}

export async function updateAttendance(data) {
  return await axiosClient.put("/attendance", data);
}

