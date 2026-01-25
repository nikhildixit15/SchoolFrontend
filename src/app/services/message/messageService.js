import {
  profileData,
  categoryList,
  templateList,
  studentMessages,
} from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getProfileData() {
  if (isMock) {
    return profileData;
  }
  return await axiosClient.get("/profile");
}

export async function getCategoryList() {
  if (!isMock) {
    return categoryList;
  }
  return await axiosClient.get("/messageCategory/getCategoryList");
}

export async function addCategory(data) {
  if (!isMock) {
    return [...categoryList, data];
  }
  return await axiosClient.post("/messageCategory/addCategory",data);
}

export async function addTemplateMessage(data) {
  if (!isMock) {
    return templateList;
  }
  return await axiosClient.post("/messageTemplate/addMessageTemplate",data);
}

export async function getTemplateMessage(data) {
  if (!isMock) {
    return templateList;
  }
  return await axiosClient.get("/messageTemplate/getMessageByCategory",data);
}
export async function getTemplateMessageList() {
  if (!isMock) {
    return templateList;
  }
  return await axiosClient.get("/messageTemplate/getMessageTemplate");
}

export async function deleteTemplateMessage(data) {
  if (!isMock) {
    return true;
  }
  return await axiosClient.del("/messageTemplate/deleteMessageTemplate", {data:data});
}

export async function deleteACategory(data) {
  if (!isMock) {
    return true;
  }
  return await axiosClient.del("/messageCategory/deleteCategory", {data:data});
}

export async function sendMessage(data) {
  if (!isMock) {
    return true;
  }
  return await axiosClient.post("/messageTemplate/sendMessage", data);
}

export async function getStudentMessagesById(data) {
  if (isMock) {
    return studentMessages;
  }
  return await axiosClient.get("/studentMessages");
}
