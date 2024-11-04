import axios from "axios";

const BASE_URL = "http://localhost:8089";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Attach the token from localStorage dynamically to each request
userRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
































// import axios from "axios";

// const BASE_URL = "http://localhost:8089";
// // const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTBiYmVjMjU5NjEwNWEyYTgxMDQwNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjkyNDc5MzIsImV4cCI6MTczMTgzOTkzMn0.CS2DmiF3p5bPRwoJtLsPAesPQyfeX-rd0lvSud76e5g"
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;   



// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });