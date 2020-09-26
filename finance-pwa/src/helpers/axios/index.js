import axios from "axios";


const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjVkYTM3MWE0ODljOTUyMDU3ZGFmY2MiLCJpYXQiOjE2MDEwOTEzMTksImV4cCI6MTYwMTA5NDkxOX0.sIX0X8VrVdZo6u5LmxpHWKWw0JCItvvoURdRNBeJFO4";


const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  export default axiosInstance;