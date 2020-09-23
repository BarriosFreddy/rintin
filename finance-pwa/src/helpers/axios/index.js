import axios from "axios";


const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjVkYTM3MWE0ODljOTUyMDU3ZGFmY2MiLCJpYXQiOjE2MDA4Mjk1MzUsImV4cCI6MTYwMDgzMzEzNX0.es3NLfatgbyIdfhCVHFnQPD0bFS1_dninrNqnbOo4Pk";


const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  export default axiosInstance;