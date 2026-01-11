import axios from "axios";
// const config = useRuntimeConfig();

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "X-Server-Auth":
      "Swq4j1hpNBVFrOU2mSYYOpU02o7zO5gOTlTJUZtviih6ONydtKCv8jLHAMBW",
  },
});
