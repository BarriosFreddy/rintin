import axios from "axios";


const TOKEN = window.localStorage.getItem('token')

const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  export default axiosInstance;