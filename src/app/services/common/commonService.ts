import { classList, examTypeList, subjectList, teacherList } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getMasterData() {
  if (isMock) {
    return { classList, examTypeList, subjectList, teacherList };
  }
  return await axiosClient.get("/masterData");
}
