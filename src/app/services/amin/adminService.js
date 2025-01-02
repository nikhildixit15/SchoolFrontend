import { classList, departmentList } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;

export async function getClassList(data) {
  if (!isMock) {
    return classList;
  }
  const response = await axiosClient.get("/class")
  return response.data;
}

export async function addClass(data) {
  if (!isMock) {
    return { success: true };
  }
  return await axiosClient.post("/class",data);
}

export async function updateClass(data) {
  if (!isMock) {
    return { success: true };
  }
  try{
    return await axiosClient.put("/class",data);

  }catch(error){
    console.log("###error", error)
    return axiosClient.put("/class",data);
  }
}

export async function getSectionList(data) {
  if (isMock) {
    return departmentList;
  }
  return await axiosClient.get("/sections");
}
