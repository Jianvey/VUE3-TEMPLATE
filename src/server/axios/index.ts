import axios, { type AxiosResponse } from "axios"
import { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios"

import useStore from "@/store"
import { snackbar } from "@/tools/snackbar"

class HTTP {
  // axios实例
  instance: AxiosInstance
  // 进行中的请求
  actives = new Map<string, AbortController>()

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      config => {
        this.cancel(config)
        const controller = new AbortController()
        config.signal = controller.signal
        this.actives.set(this.getRequestKey(config), controller)

        if (config.headers) {
          const token = sessionStorage.getItem("token")
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }

        return config
      },
      error => Promise.reject(error),
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<Model.Base.Response>) => {
        const { code, message } = response.data

        // 登录过期/Token异常
        if (code === 401 || code === 403) {
          this.cancelAll()
          useStore().user.reset()
        }

        if (code !== 0) {
          snackbar.error(message)
          return Promise.reject(response)
        }

        return response
      },
      error => {
        const statusText = error?.response?.statusText
        error.message = statusText ? `${error?.response.status} (${statusText})` : error.message

        return Promise.reject(error)
      },
    )
  }

  /**
   * @description 获取请求唯一Key
   * @return {string}
   */
  getRequestKey({ baseURL, url, method, data, params }: AxiosRequestConfig): string {
    const methodString = method ? method.toUpperCase() : ""
    const dataString = data ? JSON.stringify(data) : ""
    const paramsString = params ? JSON.stringify(params) : ""

    return `${methodString} ${baseURL}${url} ${dataString} ${paramsString}`
  }

  /**
   * @description 取消进行中的请求
   * @param {string | AxiosRequestConfig} config 请求的唯一Key或配置对象
   */
  cancel(config: string | AxiosRequestConfig) {
    const key = typeof config === "string" ? config : this.getRequestKey(config)

    if (this.actives.has(key)) {
      const abortController = this.actives.get(key)
      abortController?.abort(key)
      this.actives.delete(key)
    }
  }

  /**
   * @description 取消/重置所有进行中的请求
   * @param {AxiosRequestConfig} config
   */
  cancelAll() {
    this.actives.forEach(abortController => abortController?.abort())
    this.actives.clear()
  }

  request<T, D>(config: AxiosRequestConfig): Promise<Model.Base.Response<T>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<
          Model.Base.Response<T>,
          AxiosResponse<Model.Base.Response<T>>,
          D
        >(config)
        resolve(response.data)
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.code !== "ERR_CANCELED") {
            snackbar.error(error.message)
          }
        }
        reject(error)
      }
    })
  }

  get<T = any, D = any>(url: string, params: D, config: AxiosRequestConfig = {}) {
    return this.request<T, D>({ url, params, ...config, method: "GET" })
  }

  post<T = any, D = any>(url: string, data: D, config: AxiosRequestConfig = {}) {
    return this.request<T, D>({ url, data, ...config, method: "POST" })
  }

  delete<T = any, D = any>(url: string, params: D, config: AxiosRequestConfig = {}) {
    return this.request<T, D>({ url, params, ...config, method: "DELETE" })
  }

  patch<T = any, D = any>(url: string, data: D, config: AxiosRequestConfig = {}) {
    return this.request<T, D>({ url, data, ...config, method: "PATCH" })
  }

  put<T = any, D = any>(url: string, data: D, config: AxiosRequestConfig = {}) {
    return this.request<T, D>({ url, data, ...config, method: "PUT" })
  }
}
export default HTTP
