import axios from "axios";


const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjVkYTM3MWE0ODljOTUyMDU3ZGFmY2MiLCJpYXQiOjE2MDEwMDA2MDEsImV4cCI6MTYwMTAwNDIwMX0.qEyXqwgpV1_iSQlWmk0t6f0II2AzFhI8ozRapw3ltfI";


const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  export default axiosInstance;