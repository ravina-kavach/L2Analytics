import axios from "axios";

const api = axios.create({
  baseURL: "http://your-api-gateway-url/api",
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    console.log("API ERROR:", error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
