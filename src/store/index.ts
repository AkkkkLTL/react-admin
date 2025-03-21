import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import appReducer from "./modules/appSlice";
import settingsReducer from "./modules/settingsSlice";
import userReducer from "./modules/userSlice";
import permissionReducer from "./modules/permissionSlice";

// 为每个Slice配置独立的持久化选项
const userPersistConfig = {
  key: "user",   // 存储到localStorage的key
  storage,
  whitelist: ["userInfo", "userToken"], // 需要持久化的字段
};

const settingsPersistConfig = {
  key: "settings",
  storage,
  blacklist: ["theme"]
}

// 创建持久化的reducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);

// 创建store
export const store:EnhancedStore<{
  settings: ReturnType<typeof settingsReducer>;
  user: ReturnType<typeof userReducer>;
}> = configureStore({
  reducer: {
    // app: appReducer,
    settings: persistedSettingsReducer,
    user: persistedUserReducer,
    // permission: permissionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", 'persist/REHYDRATE'], // 忽略这些action
      },
    }),
});

// 导出持久化的store
export const persistor = persistStore(store);

// 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;