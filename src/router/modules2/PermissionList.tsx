import LayoutPage from '@/layout/LayoutPage';
import PermissionListPage from "@/views/permission-list/PermissionListPage";

export default {
  path: '/user',
  element: <LayoutPage />,
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      name: 'userPermission',
      element: <PermissionListPage />,
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
