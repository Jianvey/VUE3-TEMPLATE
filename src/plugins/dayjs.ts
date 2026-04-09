import "dayjs/locale/zh-cn"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.locale("zh-cn")
dayjs.extend(localizedFormat)

export default dayjs
