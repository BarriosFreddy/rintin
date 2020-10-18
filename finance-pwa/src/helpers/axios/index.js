import axios from "axios";

const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false
  });

  export default axiosInstance;