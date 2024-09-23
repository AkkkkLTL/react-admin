import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./modules/appSlice";
import settingsReducer from "./modules/settingsSlice";
import userReducer from "./modules/userSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    user: userReducer,
  }
});

export default store;