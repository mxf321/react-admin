/**
 *
 * @param {*} path
 * @returns
 * 判断是否是外部资源
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
