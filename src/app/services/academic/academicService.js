import { eventList, examList, subjectList, examTypeList } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getEventList(data) {
  if (isMock) {
    return eventList;
  }
  return await axiosClient.get("/eventList");
}

export async function addNewEvent(data) {
  if (isMock) {
    return [...eventList, { ...data, id: eventList.length }];
  }
  return await axiosClient.get("/eventList");
}

export async function getEventListByMonth(data) {
  if (isMock) {
    return eventList;
  }
  return await axiosClient.get("/eventList");
}

export async function getExamList(data) {
  if (isMock) {
    return examList;
  }
  return await axiosClient.get("/examList");
}

export async function getSubjectList(data) {
  if (isMock) {
    return subjectList;
  }
  return await axiosClient.get("/subjectList");
}

export async function addExam(data) {
  if (isMock) {
    return [...examList, { ...data, id: examList.length }];
  }
  return await axiosClient.post("/addExam");
}

export async function getExamTypeList(data) {
  if (isMock) {
    return examTypeList;
  }
  return await axiosClient.post("/addExam");
}
