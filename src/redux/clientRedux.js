import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getClientStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients = action.payload;
    },
    getClientFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteClientStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteClientFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // //UPDATE
    updateClientStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateClientSuccess: (state, action) => {
      state.isFetching = false; // Set fetching to false when the update completes
    
      // Find the index of the client to update
      const index = state.clients.findIndex((item) => item._id === action.payload._id);
      
      if (index !== -1) {
        // Update the client at the found index with the new data from action.payload
        state.clients[index] = {
          ...state.clients[index], // Retain the existing properties
          ...action.payload, // Spread the new client data
        };
      }
    },
    
    updateClientFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //CREATE
    addClientStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients.push(action.payload);
    },
    addClientFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getClientStart,
  getClientSuccess,
  getClientFailure,
  deleteClientStart,
  deleteClientSuccess,
  deleteClientFailure,
  updateClientStart,
  updateClientSuccess,
  updateClientFailure,
  addClientStart,
  addClientSuccess,
  addClientFailure,
} = clientSlice.actions;

export default clientSlice.reducer;