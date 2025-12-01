
// quote from https://github.com/d3george/slash-admin/blob/main/src/api/apiClient.ts#L37
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "sonner";
import { t } from "i18next";
import { store } from "@/store";
import { clearUserInfoAndToken } from "@/store/modules/userSlice";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { GLOBAL_CONFIG } from "@/global-config";

/**
 * 接口返回数据格式
 * @interface Result
 */
interface Result<T = any> {
  code: number;
  message: string;
  data?: T;
}

/**
 * 实例化 axios
 * @param config AxiosRequestConfig
 * @returns axiosInstance
 */
const axiosInstance = axios.create({
  baseURL: GLOBAL_CONFIG.apiBaseUrl,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

/**
 * 拦截器
 * @param config AxiosRequestConfig
 * @returns config
 */
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

/**
 * 响应拦截器
 * @param res AxiosResponse<Result>
 * @returns res.data
 */
axiosInstance.interceptors.response.use(
  (res:AxiosResponse<Result>) => {
    // 响应成功关闭进度条
    nProgress.done();

    if (!res.data) throw new Error(t("sys.api.apiRequestFailed"));
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

/**
 * 封装 axios 实例
 * @class APIClient
 */
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