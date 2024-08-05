import axios from "axios";

axios.defaults.baseURL = "https://api.example.com";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export async function get(url: string, params?: any) {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    alert(error);
  }
}

export async function post(url: string, data: any) {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    alert(error);
  }
}

export function put() {}
