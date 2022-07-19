import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import sessionReducer from "./slices/sessionSlice";

const reducers = combineReducers({ appReducer, sessionReducer });
const store = configureStore({ reducer: { reducers } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
