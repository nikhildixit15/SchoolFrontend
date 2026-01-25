import { studentListByClass, defaulterStudents, student } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getStudents(data: any) {
  return await axiosClient.get("/student");
}

export async function getStudentsOfClass(data: any) {
  return await axiosClient.get("/student/getStudentsOfClass", data);
}

export async function getDefaulterStudents() {
  if (!isMock) {
    return defaulterStudents;
  }
  return await axiosClient.get("/student/defaulters");
}

export async function getStudentBasicInfo(data: any) {
  const id = data.id;
  if (isMock) {
    return student;
  }
  return await axiosClient.get(`/student${id}`);
}

export async function getStudentById(data: any) {
  const id = data.id;
  if (!isMock) {
    return student;
  }
  return await axiosClient.get(`/student/${id}`);
}

export async function getStudentInfo(data: any) {
  if (!isMock) {
    return student;
  }
  return await axiosClient.get("/student");
}

export async function saveStudentInfo(data: any) {
  if (!isMock) {
    return student;
  }
  return await axiosClient.post("/student", data);
}
