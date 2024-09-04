import { profileData, categoryList, templateList } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getProfileData() {
  if (isMock) {
    return profileData;
  }
  return await axiosClient.get("/profile");
}

export async function getCategoryList() {
  if (isMock) {
    return categoryList;
  }
  return await axiosClient.get("/categoryList");
}

export async function addTemplateCategory(value) {
  if (isMock) {
    return [...categoryList, value];
  }
  return await axiosClient.post("/categoryList");
}

export async function getTemplateMessageList() {
  if (isMock) {
    return templateList;
  }
  return await axiosClient.get("/templateMessageList");
}

export async function deleteTemplateMessage(data) {
    if (isMock) {
      return true;
    }
    return await axiosClient.get("/templateMessageList");
  }

  export async function addMessageInTemplate(data) {
    if (isMock) {
      return true;
    }
    return await axiosClient.get("/templateMessageList");
  }

  export async function sendMessage(data) {
    if (isMock) {
      return true;
    }
    return await axiosClient.post("/sendMessage");
  }
  


  

