import { classList, departmentList, subjectList } from "@/mocks";
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


export async function getSubjectList(data) {
  if (!isMock) {
    return subjectList;
  }
  return await axiosClient.get("/subject");
}


export async function addSubject(data) {
  if (!isMock) {
    return [...subjectList, { ...data, id: subjectList.length }];
  }
  return await axiosClient.post("/subject", data);
}

export async function deleteSubject(id) {
  if (!isMock) {
    return subjectList.filter((item) => item.id !== id);
  }
  return await axiosClient.del(`/subject/${id}`);
}

export async function addPeriod(data) {
  if (!isMock) {
      return [...(subjectList || []), { ...data, _id: Math.random().toString() }];

  }
    return await axiosClient.post("/period", data);

}

export async function getPeriodList() {
  if (!isMock) {
  return { data: [] };

  }
    return await axiosClient.get("/period");
}
