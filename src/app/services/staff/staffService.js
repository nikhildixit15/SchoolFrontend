import { staffList, designationList, departmentList } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getStaffList(data) {
  return await axiosClient.get("/staff");
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
  if (!isMock) {
    return { success: true };
  }
  return await axiosClient.post("/department", data);
}

export async function addDesignation(data) {
  if (!isMock) {
    return { success: true };
  }
  return await axiosClient.post("/designation", data);
}

export async function saveStudentInfo(data) {
  return await axiosClient.post("/staff", data);
}

export async function getStaffById(data) {
  const id = data.id;
  const response = await axiosClient.get(`/staff/${id}`);
  return response.data;
}

export async function updateStaffProfile(id, data) {
  if (!isMock) {
    return student;
  }
  return await axiosClient.put(`/staff/editStaffProfile/${id}`, data);
}
export async function myStaffAttendance(data) {
  if (!isMock) {
    return student;
  }
  return await axiosClient.post("/staff/myAttendance", data);
}

export async function getStaffAttendanceById({ staffId, month, year }) {
  return await axiosClient.get("/staff/StaffAttendanceById", {
    staffId,
    month,
    year,
  });
}
