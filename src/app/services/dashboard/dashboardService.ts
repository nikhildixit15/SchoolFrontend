import { profileData } from "@/mocks";
import * as axiosClient from "../axiosClient/axiosClient";

const isMock = true;
export async function getProfileData() {
  if (isMock) {
    return profileData;
  }
  return await axiosClient.get("/profile");
}
