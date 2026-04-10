declare namespace Model {
  namespace Base {
    /** 响应格式 */
    interface Response<T = unknown> {
      traceId: string | string[]
      code: number
      message: string | string[]
      data: T
    }

    /** 分页查询 */
    interface Pagination {
      page: number
      pageSize: number
    }

    interface List<T extends unknown[] = unknown[]> {
      total: number
      page: number
      pageSize: number
      totalPages: number
      list: T
    }
  }
}
