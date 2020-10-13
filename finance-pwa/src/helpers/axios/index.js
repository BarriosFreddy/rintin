import axios from "axios";
import constants from '../../store/constant'
const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem(constants.LOGGED_IN)}`
    },
    withCredentials: true
  });

  export default axiosInstance;