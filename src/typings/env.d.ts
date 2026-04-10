interface ImportMetaEnv {
  /** 预览端口 */
  readonly VITE_APP_PORT: string
  /** 站点标题 */
  readonly VITE_APP_SITE_TITLE: string
  /** 站点作者 */
  readonly VITE_APP_SITE_AUTHOR: string
  /** 站点关键词 */
  readonly VITE_APP_SITE_KEYWORDS: string
  /** 站点描述 */
  readonly VITE_APP_SITE_DESCRIPTION: string
  /** 公共基础路径 */
  readonly VITE_APP_BASE_URL: string
  /** 服务请求地址 */
  readonly VITE_APP_BASE_API: string
  /** Cloudflare Turnstile Site Key */
  readonly VITE_APP_CLOUDFLARE_TURNSTILE_SITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
