import axios from "axios";
import constants from '../../constants'
const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(constants.LOGGED_IN)}`
    },
    withCredentials: true
  });

  export default axiosInstance;