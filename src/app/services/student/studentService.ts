import { studentListByClass, defaulterStudents, student } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getStudents(data: any) {
  if (isMock) {
    return studentListByClass;
  }
  return await axiosClient.get("/student");
}

export async function getDefaulterStudents(data: any) {
  if (isMock) {
    return defaulterStudents;
  }
  return await axiosClient.get("/student");
}

export async function getStudentById(data: any) {
  if (isMock) {
    return student;
  }
  return await axiosClient.get("/student");
}

export async function getStudentBasicInfo(data: any) {
  if (isMock) {
    return student;
  }
  return await axiosClient.get("/student");
}

export async function getStudentInfo(data: any) {
  if (isMock) {
    return student;
  }
  return await axiosClient.get("/student");
}


export async function saveStudentInfo(data: any) {
  if (isMock) {
    return student;
  }
  return await axiosClient.post("/student", data);
}

