import axios from "axios";
import constants from '../../store/constant'

const getToken = () => window.localStorage.getItem(constants.LOGGED_IN)

console.log({token: getToken()});


const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    withCredentials: false
  });

  export default axiosInstance;