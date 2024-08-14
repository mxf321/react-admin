export type TagsViewItemType = {
  fullPath: string
  meta?: {
    icon?: string
    title?: string
  }
  name?: string
  params?: any
  path?: string
  query?: any
  title: string
}

export type BreadcrumbItemsType = {
  path: string
  title: string | undefined
}

export type SearchPollType = {
  path: string
  title: string[]
}
export type NewFuseType = {
  label: string
  value: string
}

export type TagType = {
  fullPath: string
  title: string
}

export interface IMenuItem extends IRouteConfigsTable {
  meta: {
    title: string
    icon?: string | FunctionalComponent | IconifyIcon
    showLink?: boolean
    rank?: number
  }
  children?: IMenuItem[]
}

// 拼凑数据 menu 的 type，用于 antd menu
export type MenuType = {
  key: string
  icon: JSX.Element
  label: string
  title: string
}
// 从 routes 中拼的 path 及 title 数据，用于 tags 及 breadcrumbItems
export type MapsTiltePathsType = {
  path: string
  title: string
  parents: {
    path: string
    title: string | undefined
  } | null
}
// 文章排名
export type DynamicItemType = {
  label: string
  prop: string
}
export type InitDynamicItemType = {
  label: string
  value: string
}
// 角色列表
export type PermissionTreeType = {
  title: string
  key: string | number
  children: PermissionTreeType[] | null
}
// 员工管理--配置角色
export type RolesType = {
  label: string
  value: string
}
