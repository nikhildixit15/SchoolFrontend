import { studentListByClass, defaulterStudents  } from "@/mocks";
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

