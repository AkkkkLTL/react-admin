
// quote from https://github.com/d3george/slash-admin/blob/main/src/api/apiClient.ts#L37
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "sonner";
import { store } from "@/store";
import { clearUserInfoAndToken } from "@/store/modules/userSlice";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

interface Result<T = any> {
  code: number;
  message: string;
  data?: T;
}

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    // 请求时开启进度条
    nProgress.start();
    config.headers.Authorization = "Bearer Token"
    return config;
  },
  (error) => {
    // 异常时关闭进度条
    nProgress.done();
    return Promise.reject(error);
  }
);

// 响应拦截
axiosInstance.interceptors.response.use(
  (res:AxiosResponse<Result>) => {
    // 响应成功关闭进度条
    nProgress.done();

    if (!res.data) throw new Error('Request Error');
    const { code, data, message } = res.data;

    // 请求成功
    const hasSuccess = data && Reflect.has(res.data, "code") && code === 200;
    if (hasSuccess) {
      return data;
    }

    // 请求失败
    throw new Error(message || 'Request Error');
  },
  (error:AxiosError<Result>) => {
    const { response, message } = error || {};
    const errMsg = response?.data?.message || message || 'Request Error';
    toast.error(errMsg, {
      position: "top-center",
    });

    const status = response?.status;
    if (status === 401) {
      store.dispatch(clearUserInfoAndToken())
    }
    return Promise.reject(error);
  }
);

class APIClient {
  get<T = any>(config:AxiosRequestConfig):Promise<T> {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config:AxiosRequestConfig):Promise<T> {
    return this.request({...config, method: "POST" });
  }
  put<T = any>(config:AxiosRequestConfig):Promise<T> {
    return this.request({...config, method: "PUT" });
  }
  delete<T = any>(config:AxiosRequestConfig):Promise<T> {
    return this.request({...config, method: "DELETE" });
  }

  request<T = any>(config: AxiosRequestConfig):Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res:AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        })
    })
  }
}

export default new APIClient();