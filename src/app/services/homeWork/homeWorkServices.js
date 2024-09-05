import { homeWorkList, profileData } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function saveHomeWorkByClass(data) {
  if (isMock) {
    return { success: true };
  }
  return await axiosClient.post("/profile", data);
}

export async function getHomeWorkByClass(data) {
  if (isMock) {
    return homeWorkList;
  }
  return await axiosClient.get("/homeWorkList");
}
