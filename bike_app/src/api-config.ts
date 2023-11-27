// api-client.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.api-ninjas.com/v1/",
  headers: {
    "X-Api-Key": "gQzJZDdWPUbw5e6A9RZK9w==QzB6xpm1wEbBzuYT",
    "Content-Type": "application/json",
  },
});

export default apiClient;
