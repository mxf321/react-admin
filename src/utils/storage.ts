// 存储数据
export const setItem = (key: string, value: string | object | any) => {
  // 基本数据类型  -- 复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取数据
export const getItem = (key: string) => {
  let data
  if (key) {
    data = window.localStorage.getItem(key)
  }
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 删除指定数据
export const removeItem: (key: string) => void = (key: string) => {
  window.localStorage.removeItem(key)
}

// 删除所有数据
export const removeAllItem: () => void = () => {
  window.localStorage.clear()
}
