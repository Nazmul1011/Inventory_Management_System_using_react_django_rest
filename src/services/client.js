// src/services/client.js
import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: false, // set true only if your API uses cookies
  headers: { "Content-Type": "application/json" },
});

// optional: response interceptor (central error handling)
client.interceptors.response.use(
  (res) => res,
  (err) => {
    // you can transform or log errors here
    return Promise.reject(err);
  }
);

export default client;
