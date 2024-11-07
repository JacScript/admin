import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from "./userSlice.js";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux.js";
import {
  getClientFailure,
  getClientStart,
  getClientSuccess,
  deleteClientFailure,
  deleteClientStart,
  deleteClientSuccess,
  updateClientFailure,
  updateClientStart,
  updateClientSuccess,
  addClientFailure,
  addClientStart,
  addClientSuccess,
} from "./clientRedux.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    const { accessToken } = res.data;

    // Save the token in localStorage
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};


export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // Update the product using the correct URL and request body
    const res = await userRequest.put(`/products/${id}`, product); // Correct the URL format and pass product as the body
    dispatch(updateProductSuccess(res.data)); // Dispatch success action with the response data
  } catch (err) {
    dispatch(updateProductFailure()); // Dispatch failure action if an error occurs
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    // create
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};


// This function is used to fetch a list of clients (users) from an API
// It dispatches different actions to manage the state of the request in the Redux store
export const getClients = async (dispatch) => {
  // Dispatch the action that signals the start of the API request
  dispatch(getClientStart());

  try {
    // Make a GET request to the '/users' endpoint using userRequest
    const res = await userRequest.get("/users");

    // If the request is successful, dispatch the success action with the response data
    dispatch(getClientSuccess(res.data));
  } catch (err) {
    // If there is an error during the request, dispatch the failure action
    dispatch(getClientFailure());
  }
};

export const updateClient = async (id, client, dispatch) => {
  dispatch(updateClientStart());
  try {
    // Send a PUT request to update the client with the specified ID
    const res = await userRequest.put(`/users/${id}`, client); 
    // Dispatch success action with response data
    // console.log(res.data)
    dispatch(updateClientSuccess(res.data));
    // console.log(res.data)
  } catch (err) {
    console.error("Update failed:", err); // Log error for debugging
    dispatch(updateClientFailure()); // Dispatch failure action if an error occurs
  }
};

export const deleteClient = async (id, dispatch) => {
  dispatch(deleteClientStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteClientSuccess(res.data));
  } catch (err) {
    dispatch(deleteClientFailure());
  }
};


export const addClient = async (client, dispatch) => {
  dispatch(addClientStart());
  try {
    // create
    const res = await userRequest.post(`/auth/register`,client);
    dispatch(addClientSuccess(res.data));
  } catch (err) {
    dispatch(addClientFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart()); // Start the logout process
  
  try {
    // Send a logout request to the server
    await publicRequest.post("/auth/signout");

    // Remove any access token or user data from local storage
    localStorage.removeItem("accessToken");

    // Dispatch success action to update the state
    dispatch(logoutSuccess());
  } catch (err) {
    // Dispatch failure action if an error occurs
    dispatch(logoutFailure());
  }
};

