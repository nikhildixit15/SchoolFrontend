import { studentListByClass, defaulterStudents, student } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
 

export async function addSection(data: any) {
  if (!isMock) {
     console.log("Yes");
     return;
  }
  return await axiosClient.post("/section", data);
}

