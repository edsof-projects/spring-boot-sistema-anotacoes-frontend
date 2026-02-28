import axios from "axios";

const API_URL = "http://localhost:8081";

// =========================
// API PUBLICA (SEM TOKEN)
// =========================
export const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// API PRIVADA (COM TOKEN)
// =========================
export const privateApi = axios.create({
  baseURL: API_URL
});

// =========================
// INTERCEPTOR JWT
// =========================
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    //console.log("TOKEN ENVIADO:", token); // DEBUG

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);