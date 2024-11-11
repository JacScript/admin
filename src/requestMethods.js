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

