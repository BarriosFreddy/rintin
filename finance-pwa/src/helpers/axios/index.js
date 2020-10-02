import axios from "axios";

const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });

  export default axiosInstance;