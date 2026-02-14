import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "./slices/reportSlice";

export const store = configureStore({
  reducer: {
    reports: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
