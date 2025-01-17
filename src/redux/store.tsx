import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./modules/appSlice";
import settingsReducer from "./modules/settingsSlice";
import userReducer from "./modules/userSlice";
import permissionReducer from "./modules/permissionSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    user: userReducer,
    permission: permissionReducer
  }
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
})
export default store;