import {
  teacherWiseTimeTable,
  classWiseTimeTable,
  dayWiseTimeTable,
} from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getTeacherWiseTimeTable(data) {
  if (isMock) {
    return teacherWiseTimeTable;
  }
  return await axiosClient.get("/student");
}

export async function getClassWiseTimeTable(data) {
  if (isMock) {
    return classWiseTimeTable;
  }
  return await axiosClient.get("/student");
}

export async function getDayWiseTimeTable(data) {
  if (isMock) {
    return dayWiseTimeTable;
  }
  return await axiosClient.get("/student");
}
