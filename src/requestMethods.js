// import axios from "axios";

// const BASE_URL = "http://localhost:8089";


// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
// });

// // Attach the token from localStorage dynamically to each request
// userRequest.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });
































// import axios from "axios";

// const BASE_URL = "http://localhost:8089";
// // const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTBiYmVjMjU5NjEwNWEyYTgxMDQwNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjkyNDc5MzIsImV4cCI6MTczMTgzOTkzMn0.CS2DmiF3p5bPRwoJtLsPAesPQyfeX-rd0lvSud76e5g"
// const TOKEN = JSON.parse(JSON.parse(localStorage?.getItem("persist:root"))?.user)?.currentUser?.accessToken;   



// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });



// import axios from "axios";

// // Define the base URL for API requests
// const BASE_URL = "http://localhost:8089";

// // Create an Axios instance for public requests
// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// // Create an Axios instance for user-specific requests
// export const userRequest = axios.create({
//   baseURL: BASE_URL,
// });

// // Attach the token from localStorage dynamically to each request
// userRequest.interceptors.request.use(
//   (config) => {
//     // Retrieve the token from localStorage
//     const persistedState = localStorage.getItem("persist:root");
//     const token = persistedState 
//       ? JSON.parse(JSON.parse(persistedState).user)?.currentUser?.accessToken 
//       : null;

//     // If the token exists, attach it to the headers
//     if (token) {
//       // config.headers.Authorization = `Bearer ${token}`;
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     // Log any request errors for debugging
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );


import axios from "axios";

const BASE_URL = "http://localhost:8089";

// Function to retrieve the token from localStorage
const getToken = () => {
  const persistedData = JSON.parse(localStorage.getItem("persist:root"));
  return persistedData?.user ? JSON.parse(persistedData?.user)?.currentUser?.accessToken : null;
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token:  `Bearer ${getToken()}` },  // Ensure the correct token retrieval method
});

