import * as axiosClient from "../axiosClient/axiosClient";

export async function SendOTP(data) {
   
  return await axiosClient.post("/sendOtp", data);
}

export async function changePassword(data) {
   
  return await axiosClient.post("/resetPassword", data);
}