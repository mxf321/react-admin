import Article from './modules2/Article'
import ArticleCreate from './modules2/ArticleCreate'
import PermissionList from './modules2/PermissionList'
import RoleList from './modules2/RoleList'
import UserManage from './modules2/UserManage'
import { Navigate } from 'react-router-dom'
import LayoutPage from '@/layout/LayoutPage'
import LoginPage from '@/views/login/LoginPage'
import NotFoundPage from '@/views/error-page/NotFoundPage'
import UnauthorizedPage from '@/views/error-page/NotFoundPage'
import ProfilePage from '@/views/profile/ProfilePage'

// 私有路由表
export const privateRoutes = [
    Article,
    ArticleCreate,
    PermissionList,
    RoleList,
    UserManage
]

// 公有路由表
export const publicRoutes: IRouteConfigsTable[] = [
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <LayoutPage />,
        children: [
            // 默认子路由
            {
                path: '',
                element: <Navigate to="/profile" />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
                name: 'profile',
                meta: {
                    title: 'profile',
                    icon: 'user'
                }
            },
            {
                path: '404',
                name: '404',
                element: <NotFoundPage />
            },
            {
                path: '401',
                name: '401',
                element: <UnauthorizedPage />
            }
        ]
    },
    {
        path: '*',
        name: '404',
        element: <NotFoundPage />,
    },
]
export const baseRoutes = [...publicRoutes]

