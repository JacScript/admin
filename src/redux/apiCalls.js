import { loginFailure, loginStart, loginSuccess } from "./userSlice.js";
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
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err)
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


export const getClient = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getClientSuccess(res.data));
  } catch (err) {
    dispatch(getClientFailure());
  }
};