import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducer"

const store = configureStore({
  reducer: {
    auth
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;