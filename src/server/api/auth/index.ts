import http from "@/server"

/** 登录 */
export function _SignIn(params: Model.Auth.Params.Login) {
  return http.post<Model.Auth.Data, Model.Auth.Params.Login>("/auth/login", params, {
    dedupe: true,
    dedupeKey: "auth/login",
    retryOnAuthError: false,
    skipAuth: true,
    withCredentials: true,
  })
}

/** 刷新 Token */
export function _RefreshToken() {
  return http.post<string, Record<string, never>>(
    "/auth/refresh",
    {},
    {
      dedupe: true,
      dedupeKey: "auth/refresh",
      retryOnAuthError: false,
      skipAuth: true,
      skipErrorHandler: true,
      withCredentials: true,
    },
  )
}
