import axios from "axios";

const API = axios.create({
  baseURL: "https://price-pulse-zh65.onrender.com/api"
});

export default API;