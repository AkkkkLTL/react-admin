import store from "@/redux/store";
import axios from "axios";
import { getToken } from "./auth";
import { message } from "antd";
import confirm from "antd/es/modal/confirm";
import { resetToken } from "@/redux/modules/userSlice";

// Create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
});

// Request interceptor
service.interceptors.request.use(
  config => {
    // do sth before request is sent
    if (store.getState().user.token) {
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => {
    // do sth with request error
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error
    if (res.code !== 20000) {
      message.error({
        content: res.message || 'Error',
        duration: 3
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        confirm({
          title: "Confirm logout",
          content: "You have been logged out, you can cancel to stay on this page, or log in again",
          okText: "Re-Login",
          cancelText: "Cancel",
          onOk: () => {
            store.dispatch(resetToken());
            location.reload();
          }
        })
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error);
    message.error({
      content: error.message,
      duration: 3
    });
    return Promise.reject(error);
  }
);

export default service;