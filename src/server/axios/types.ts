import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"

export type Methods = "get" | "post" | "put" | "patch" | "delete"

export interface HTTPRequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  /**
   * 是否启用重复请求去重。
   *
   * 开启后，如果存在相同请求 key 的进行中请求，会先取消旧请求，再发起当前请求。
   * 默认关闭。
   */
  dedupe?: boolean
  /**
   * 自定义请求去重 key。
   *
   * 仅在 dedupe 为 true 时生效；不传时会使用 method + url + params + data 自动生成 key。
   * 适合把多个“语义相同但参数对象结构不完全一致”的请求归并到同一个去重组里。
   */
  dedupeKey?: string
  /**
   * 认证失败时是否自动尝试刷新 access token 并重试当前请求。
   *
   * 默认开启；登录接口、刷新接口这类不应重试的请求应显式传 false。
   */
  retryOnAuthError?: boolean
  /** 是否跳过自动添加认证信息，默认为 false */
  skipAuth?: boolean
  /** 是否跳过全局错误处理器，默认为 false */
  skipErrorHandler?: boolean
}

export type InternalHTTPRequestConfig<D = unknown> = InternalAxiosRequestConfig<D> &
  Omit<HTTPRequestConfig<D>, "headers"> & {
    _requestKey?: string
    _retried?: boolean
  }
