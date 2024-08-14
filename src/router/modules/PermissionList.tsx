import { lazy } from 'react'
import WrapperRouteComponent from '../config'

const LayoutPage = lazy(() => import('@/layout/LayoutPage'))
const PermissionListPage = lazy(
  () => import('@/views/permission-list/PermissionListPage')
)

export default {
  path: '/user',
  element: <WrapperRouteComponent auth={false} title={'layout'} ><LayoutPage /></WrapperRouteComponent>,
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      name: 'userPermission',
      element: (
        <WrapperRouteComponent auth={true} title={'permissionList'}>
          <PermissionListPage />
        </WrapperRouteComponent>
      ),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
