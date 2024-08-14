import LayoutPage from '@/layout/LayoutPage';
import RoleListPage from "@/views/role-list/RoleListPage";

export default {
  path: '/user',
  element: <LayoutPage />,
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      name: 'userRole',
      element: <RoleListPage />,
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
