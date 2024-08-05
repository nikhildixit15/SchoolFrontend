import { eventList } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getEventList(data) {
  if (isMock) {
    return eventList;
  }
  return await axiosClient.get("/eventList");
}

export async function addNewEvent(data) {
  if (isMock) {
    return [...eventList, { ...data, id: eventList.length }];
  }
  return await axiosClient.get("/eventList");
}

export async function getEventListByMonth(data) {
  if (isMock) {
    return eventList;
  }
  return await axiosClient.get("/eventList");
}
