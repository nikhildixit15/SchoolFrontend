import { studentListByClass } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getStudents(data) {
  if (isMock) {
    return studentListByClass;
  }
  return await axiosClient.get("/student");
}
