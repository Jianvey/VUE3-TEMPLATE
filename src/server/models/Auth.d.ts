declare namespace Model {
  namespace Auth {
    /** 登录数据 */
    interface Data {
      token: string
      user: Model.User.Data
      permissions: string[]
    }

    namespace Params {
      /** 登录参数 */
      interface Login {
        username: string
        password: string
      }
    }
  }
}
