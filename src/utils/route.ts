import path from 'path-browserify'

export const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

// 根据 routes 数据，返回对应的 menu 规则数据
export const generateMenus = (routes: IRouteConfigsTable[], basePath = '') => {
  const result: IRouteConfigsTable[] = []
  // 不满足该条件 meta && meta.title && meta.icon 的数据不应该存在
  routes.forEach((item: IRouteConfigsTable) => {
    // 不存在 children 不存在 meta 直接 return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children 不存在meta，迭代 generateRoutes
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children!))
      return
    }
    // 不存在 children ,存在meta || 存在 children && 存在 meta
    // 因为最终的 menu 需要进行跳转，此时我们需要合并 path
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，可能存在 同名父路由 的情况
    let route = result.find((item) => item.path === routePath)
    // 当前 路由 尚未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon && title
      if (route.meta && route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    // 存在 children && 存在 meta
    if (!isNull(item.children)) {
      route.children!.push(...generateMenus(item.children!, route.path))
    }
  })
  return result
}

export const generateAllRoutes = (routes: IRouteConfigsTable[]) => {
  // 创建 result 数据
  let res: IRouteConfigsTable[] = []
  for (const route of routes) {
    if (route.meta && route.meta.title && !route.children) {
      res.push(route)
    }
    // 存在children时，迭代进行处理
    if (route.children) {
      const tempRoutes = generateAllRoutes(route.children)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
