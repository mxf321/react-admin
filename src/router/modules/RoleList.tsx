import { lazy } from "react";
import WrapperRouteComponent from "../config";

const LayoutPage = lazy(() => import("@/layout/LayoutPage"))
const RoleListPage = lazy(() => import("@/views/role-list/RoleListPage"))

export default {
  path: '/user',
  element: <WrapperRouteComponent auth={false} title={'layout'} ><LayoutPage /></WrapperRouteComponent>,
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      name: 'userRole',
      element: <WrapperRouteComponent auth={true} title={'roleList'} ><RoleListPage /></WrapperRouteComponent>,
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
