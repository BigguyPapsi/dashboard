import axios from "axios";

export const apiUrl = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "ngrok-skip-browser-warning": false,
  },
});