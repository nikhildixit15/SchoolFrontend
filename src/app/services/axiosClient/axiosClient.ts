import axios from "axios";

axios.defaults.baseURL = "https://schoolerp-backend-nwmz.onrender.com";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  axios.defaults.headers.post["Content-Type"] =
  "application/json; charset=utf-8";

  axios.defaults.headers.post['Accept'] =
  "application/json"; 
  

export async function get(url: string, params?: any) {
  try {
    if(params)  {
      const response = await axios.get(url, { params });
    return response;
    }
    // If no params are provided, just make a simple GET request
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

export async function put(url: string, data: any) {
  try {
    const response = await axios.put(url, data);
    console.log("###response1242142412421", response)
    return response;
  } catch (error) {
    alert(error);
  }

}

export async function del(url: string, data?: any) {
  try {
    const response = await axios.delete(url, data);
    return response;
  } catch (error) {
    alert(error);
  }
}

