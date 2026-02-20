import { homeWorkList, profileData } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function saveHomeWorkByClass(data) {
  if (!isMock) {
    return { success: true };
  }
  return await axiosClient.post("/homework/saved", data);
}

export async function getHomeWorkByClass(data) {
  if (!isMock) {
    return homeWorkList;
  }
  return await axiosClient.get("/homework/viewHomeWork", {
    params: data
  });
}

export async function uploadResults(data) {
  return await axiosClient.post("/result/createResult", data);
}

export async function getResults(data) {
  return await axiosClient.get("/result/getResult", data);
}




