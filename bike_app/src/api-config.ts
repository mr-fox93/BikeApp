import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://motorcycle-specs-database.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "369a2ec2a5mshf0f00df4b442215p142657jsn36ab34252691",
    "X-RapidAPI-Host": "motorcycle-specs-database.p.rapidapi.com",
  },
});

export default apiClient;
