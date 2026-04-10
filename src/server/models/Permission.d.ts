declare namespace Model {
  namespace Permission {
    /** 权限数据 */
    interface Data {
      permissionId: string
      permissionName: string
      permissions: string[]
      createdAt: string
      updatedAt: string
    }

    namespace Params {
      /** 权限搜索参数 */
      interface Search extends Model.Base.Pagination {
        permissionName?: string
      }

      /** 权限弹窗编辑参数 */
      type Action = Partial<
        Pick<Model.Permission.Data, "permissionId" | "permissionName" | "permissions">
      >
    }
  }
}
