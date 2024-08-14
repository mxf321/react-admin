import dayjs from 'dayjs'
// 相对时间，语言国际化
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

export const dataFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 相对时间
dayjs.extend(rt)
export const relativeTime = (language: 'zh' | 'en', val) => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}
