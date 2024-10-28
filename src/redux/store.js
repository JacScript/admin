import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
<<<<<<< HEAD
import productReducer from "./productRedux";  
import clientRedux from "./clientRedux";
=======
// import productReducer from "./productRedux";  
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
<<<<<<< HEAD
  product: productReducer, 
  client: clientRedux,
=======
  // product: productReducer, 
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);