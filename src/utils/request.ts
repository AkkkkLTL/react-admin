import store from "@/redux/store";
import axios from "axios";
import { getToken } from "./auth";
import { message } from "antd";
import confirm from "antd/es/modal/confirm";
import { resetToken } from "@/redux/modules/userSlice";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
});

// Request interceptor
service.interceptors.request.use(
  config => {
    // 请求时开启进度条
    NProgress.start();
    // 发送请求前在请求头部加上token
    if (store.getState().user.token) {
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => {
    // 处理请求异常
    console.log(error);
    // 异常时关闭进度条
    NProgress.done();
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    // 相应成功关闭进度条
    NProgress.done();
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
    // 异常时关闭进度条
    NProgress.done();
    message.error({
      content: error.message,
      duration: 3
    });
    return Promise.reject(error);
  }
);

export default service;