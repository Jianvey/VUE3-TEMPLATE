import http from "@/server"

/** 获取权限列表 */
export function _GetPermissionList(params: Model.Permission.Params.Search) {
  return http.post<Model.Base.List<Model.Permission.Data[]>, Model.Permission.Params.Search>(
    "/permission",
    params,
  )
}

/** 更新权限 */
export function _UpdatePermission(params: Model.Permission.Params.Action) {
  return http.post("/permission", params)
}

/** 删除权限 */
export function _DeletePermission(permissionId: string) {
  return http.delete(`/permission/${permissionId}`)
}
