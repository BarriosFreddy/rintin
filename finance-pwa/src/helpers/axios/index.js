import axios from "axios";

const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  export default axiosInstance;