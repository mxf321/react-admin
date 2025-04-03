import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from '../../LayoutPage.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { generateAllRoutes, generateMenus } from '@/utils/route'
import { useDispatch } from 'react-redux'
import {
  addTagsViewListCreator,
  setBreadcrumbItemsCreator
} from '@/redux/base/baseActions'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@/redux/hooks'
import { SvgIcon } from '@/components'
import { AppDispatch, RootState } from '@/redux'
import {
  BreadcrumbItemsType,
  MapsTiltePathsType,
  MenuType,
  TagsViewItemType
} from '@/types/app'

export const SidebarMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const routes: IRouteConfigsTable[] = useSelector(
    (state: RootState) => state.permission.routes
  )
  const tagsViewList: TagsViewItemType[] = useSelector(
    (state: RootState) => state.base.tagsViewList
  )

  const filterMenu = () => {
    return generateMenus(routes)
  }

  const menus: IRouteConfigsTable[] = filterMenu()
  // 数据源 ：所有 router 的数据
  const routesPoll: IRouteConfigsTable[] = generateAllRoutes(routes)

  // 合并 menus 数据
  const getMenus = (menus: IRouteConfigsTable[]) => {
    const newMenus: MenuType[] = []
    menus.forEach((menu: IRouteConfigsTable) => {
      const icon = <SvgIcon icon={menu.meta!.icon} />
      const res: MenuType = {
        key: menu.path,
        icon: icon,
        label: t('route.' + menu.meta!.title),
        title: menu.meta!.title
      }
      if (menu.children && menu.children.length > 0) {
        res['children'] = getMenus(menu.children)
      }
      newMenus.push(res)
    })
    return newMenus
  }
  const routesConfig: MenuType[] = getMenus(menus)

  // title 及 path 的对应数据集合
  const mapsTiltePaths = () => {
    const arr: MapsTiltePathsType[] = routesPoll.map((i) => {
      const path = i.path.includes(':')
        ? i.path.substring(0, i.path.lastIndexOf('/'))
        : i.path
      const parentsMenus = routes.find((j: IRouteConfigsTable) => {
        return (
          j.path !== '/' &&
          j.children?.find(
            (k: IRouteConfigsTable) => k.path && i.path.includes(k.path)
          )
        )
      })
      const parents = parentsMenus
        ? {
          path: parentsMenus.path,
          title: parentsMenus.meta && parentsMenus.meta.title
        }
        : null
      return {
        path,
        title: i.meta!.title,
        parents
      }
    })
    return arr
  }
  const mapsTiltePathsData: MapsTiltePathsType[] = mapsTiltePaths()

  // 默认选中的子菜单有
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([])

  const selectKey = (e) => {
    navigate(e.key)
  }
  // menu 展开时 unique-opened
  const onOpenChange: MenuProps['onOpenChange'] = (openKeys: string[]) => {
    openKeys = openKeys.filter((i) => i)
    if (openKeys.length > 2) {
      return
    } else if (openKeys.length === 2) {
      const newKeys = openKeys.filter((i) => !stateOpenKeys.includes(i))
      setStateOpenKeys(newKeys)
    } else {
      setStateOpenKeys(openKeys)
    }
  }

  // 改变的连锁反应
  const changeAction = async (pathname: string) => {
    // 点击一级面包屑时

    const mapData: MapsTiltePathsType | undefined = mapsTiltePathsData.find(
      (i) => pathname.includes(i.path)
    )
    // path 没对应tags 时，如输入链接时
    const tagPath: TagsViewItemType | undefined = tagsViewList.find((i) =>
      pathname.includes(i.fullPath)
    )
    // 点击一级面包屑或者手动输入链接时，直接 navigate
    if (!mapData || !tagPath) {
      navigate(pathname)
    }
    // path 没对应tags 时 , 而且考虑排除点击一级面包屑时的情况
    // tag 的链接用 pathname
    if (!tagPath && mapData) {
      dispatch(
        addTagsViewListCreator({
          fullPath: pathname,
          title: mapData?.title
        })
      )
    }
    // 面包屑数据
    let breadcrumbItems: BreadcrumbItemsType[]
    // mapData.parents:location.pathname的父级
    // 没 父级时，即面包屑仅一级
    if (mapData?.parents) {
      breadcrumbItems = [
        { path: mapData?.parents?.path, title: mapData?.parents?.title },
        { path: pathname, title: mapData.title }
      ]
    } else {
      breadcrumbItems = [{ path: pathname, title: mapData?.title }]
    }
    dispatch(setBreadcrumbItemsCreator(breadcrumbItems))
    // menus 回显点击键actives SelectedKeys
    setSelectedKeys([pathname])
    // menus 展开回显 StateOpenKeys
    const mapDataParentsPath = mapData?.parents?.path
    if (mapDataParentsPath && mapDataParentsPath !== stateOpenKeys.join('')) {
      setStateOpenKeys([mapDataParentsPath])
    }
  }

  // location 改变后
  useEffect(() => {
    const pathname: string = location.pathname
    changeAction(pathname)
  }, [location])

  return (
    <div id="guide-sidebar" className={styles.menus}>
      <Menu
        theme="dark"
        mode="inline"
        onClick={selectKey}
        items={routesConfig}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
      />
    </div>
  )
}
