import { getItem, setItem } from '@/utils/storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
// 获取时间差
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}
// 设置时间戳
export const setTimeStamp: () => void = () => {
  setItem(TIME_STAMP, Date.now())
}
// 是否超时
export const isCheckTimeout: () => boolean = () => {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = getTimeStamp()
  const res = currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
  return res
}
