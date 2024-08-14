import { Navigate } from 'react-router-dom';
import { lazy } from "react";
import WrapperRouteComponent from "../config";
const LayoutPage = lazy(() => import("@/layout/LayoutPage"))
const UserManagePage = lazy(() => import("@/views/user-manage/UserManagePage"))
const UserInfoPage = lazy(() => import("@/views/user-info/UserInfoPage"))
const ImportPage = lazy(() => import("@/views/import/ImportPage"))

export default {
  path: '/user',
  element: <WrapperRouteComponent auth={false} title={'layout'} ><LayoutPage /></WrapperRouteComponent>,
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    // 默认子路由
    {
      path: '',
      element: <Navigate to="/user/manage" />,
    },
    {
      path: '/user/manage',
      name: 'userManage',
      element: <WrapperRouteComponent auth={true} title={'userManage'} ><UserManagePage /></WrapperRouteComponent>,
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      element: <WrapperRouteComponent auth={false} title={'userInfo'} ><UserInfoPage /></WrapperRouteComponent>,
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      name: 'import',
      element: <WrapperRouteComponent auth={false} title={'excelImport'} ><ImportPage /></WrapperRouteComponent>,
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
