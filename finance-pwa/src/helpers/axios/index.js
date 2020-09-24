import axios from "axios";


const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjVkYTM3MWE0ODljOTUyMDU3ZGFmY2MiLCJpYXQiOjE2MDA5MTQ0NzYsImV4cCI6MTYwMDkxODA3Nn0.SZFnwbgYAc7esoyGC7SqUpEDQWeY0k7tuluBe3g1cak";


const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  export default axiosInstance;