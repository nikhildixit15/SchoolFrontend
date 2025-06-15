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
  return await axiosClient.get("/timetable/teacher_wise", data);
}

export async function getClassWiseTimeTable(data) {
  if (isMock) {
    return classWiseTimeTable;
  }
  return await axiosClient.get("/timetable/class_wise", data);
}

export async function getDayWiseTimeTable(data) {
  if (!isMock) {
    return dayWiseTimeTable;
  }
  console.log("###data", data);
  return await axiosClient.get("/timetable/day_wise", data);
}

export async function addPeriodInTimeTable(data) {
  if (!isMock) {
    return dayWiseTimeTable;
  }
  return await axiosClient.post("/timeTable", data);
}

