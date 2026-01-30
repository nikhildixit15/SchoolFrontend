import { eventList, examList, subjectList, examTypeList } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getEventList() {
  if (!isMock) {
    return eventList;
  }
  return await axiosClient.get("/event/getAllEvent");
}

export async function getHolidayList() {
  if (!isMock) {
    return eventList;
  }
  return await axiosClient.get("/holidayRouter/getHoliday");
}

export async function deleteHoliday(id) {
  if (!isMock) {
    return { success: true }; // mock response
  }

  return await axiosClient.del(`/holidayRouter/${id}`);
}

export async function deleteEvent(id) {
  if (!isMock) {
  return { data: [] };

  }
    return await axiosClient.del(`/event/${id}`);
}

export async function getEventListByMonth(data) {
  if (isMock) {
    return eventList;
  }
  return await axiosClient.get("/eventList");
}

export async function getExamList( ) {
  if (!isMock) {
    return examList;
  }
  return await axiosClient.get("/exam/getExamSheet");
}

export async function getSubjectList(data) {
  if (isMock) {
    return subjectList;
  }
  return await axiosClient.get("/subject");
}
 
export async function saveStudentParticipant(data) {
  if (!isMock) {
    return [...examList, { ...data, id: examList.length }];
  }
  return await axiosClient.post("/event/addStudentParticipants", data);
}
 
export async function saveStaffParticipant(data) {
  if (!isMock) {
    return [...examList, { ...data, id: examList.length }];
  }
  return await axiosClient.post("/event/addStaffParticipants", data);
}
 
export async function saveAudienceParticipant(data) {
  if (!isMock) {
    return [...examList, { ...data, id: examList.length }];
  }
  return await axiosClient.post("/event/addAudParticipants", data);
}

export async function getExamTypeList(data) {
  if (isMock) {
    return examTypeList;
  }
  return await axiosClient.post("/addExam");
}
