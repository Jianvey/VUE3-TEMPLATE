/** 限制数值在指定范围内 */
function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/** 获取当前屏幕相对于设计稿的缩放比例 (取宽高中较小值) */
function getScale() {
  const baseRem = 16
  const vw = window.innerWidth / 100
  const ideal = vw * 0.4169 + baseRem * 0.5
  const fontSize = clamp(14, ideal, 16)

  return fontSize / baseRem
}

/** 将设计稿尺寸按照缩放比例转换为实际像素值 */
export function toPX(size: number | string) {
  return parseFloat(String(size)) * getScale()
}
