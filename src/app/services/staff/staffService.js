import { staffList, designationList, departmentList } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getStaffList(data) {
  if (isMock) {
    return staffList;
  }
  return await axiosClient.get("/staffList");
}

export async function getDesignationList(data) {
  if (!isMock) {
    return designationList;
  }
  return await axiosClient.get("/designation");
}

export async function getDepartmentList(data) {
  if (!isMock) {
    return departmentList;
  }
  return await axiosClient.get("/department");
}

export async function addDepartment(data) {
  if (isMock) {
    return { success: true };
  }
  return await axiosClient.post("/departmentList", data);
}

export async function addDesignation(data) {
  if (isMock) {
    return { success: true };
  }
  return await axiosClient.post("/designation", data);
}
