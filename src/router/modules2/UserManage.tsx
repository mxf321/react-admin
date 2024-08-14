import LayoutPage from '@/layout/LayoutPage';
import UserManagePage from "@/views/user-manage/UserManagePage";
import UserInfoPage from "@/views/user-info/UserInfoPage";
import ImportPage from "@/views/import/ImportPage";
import { Navigate } from 'react-router-dom';

export default {
  path: '/user',
  element: <LayoutPage />,
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
      element: <UserManagePage />,
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      element: <UserInfoPage id='1' />,
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      name: 'import',
      element: <ImportPage />,
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
