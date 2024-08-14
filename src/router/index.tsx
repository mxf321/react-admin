import Article from './modules/Article'
import ArticleCreate from './modules/ArticleCreate'
import PermissionList from './modules/PermissionList'
import RoleList from './modules/RoleList'
import UserManage from './modules/UserManage'
import { Navigate } from 'react-router-dom'
// import { RoutersProps } from './types';
import WrapperRouteComponent from "./config";
import { lazy } from 'react'
const LayoutPage = lazy(() => import("@/layout/LayoutPage"))
const LoginPage = lazy(() => import("@/views/login/LoginPage"))
const ProfilePage = lazy(() => import("@/views/profile/ProfilePage"))
const NotFoundPage = lazy(() => import("@/views/error-page/NotFoundPage"))
const UnauthorizedPage = lazy(() => import("@/views/error-page/UnauthorizedPage"))

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
        element: <WrapperRouteComponent auth={false} ><LoginPage /></WrapperRouteComponent>,
    },
    {
        path: '/',
        element: <WrapperRouteComponent auth={false} title={'layout'} ><LayoutPage /></WrapperRouteComponent>,
        children: [
            // 默认子路由
            {
                path: '',
                element: <Navigate to="/profile" />,
            },
            {
                path: '/profile',
                element: <WrapperRouteComponent auth={false} title={'profile'} ><ProfilePage /></WrapperRouteComponent>,
                name: 'profile',
                meta: {
                    title: 'profile',
                    icon: 'user'
                }
            },
            {
                path: '404',
                name: '404',
                element: <WrapperRouteComponent auth={false} ><NotFoundPage /></WrapperRouteComponent>,
            },
            {
                path: '401',
                name: '401',
                element: <WrapperRouteComponent auth={false} ><UnauthorizedPage /></WrapperRouteComponent>,
            },
            {
                path: '*',
                name: '404',
                element: <WrapperRouteComponent auth={false} ><NotFoundPage /></WrapperRouteComponent>,
            },
        ]
    },
    {
        path: '*',
        name: '404',
        element: <WrapperRouteComponent auth={false} ><NotFoundPage /></WrapperRouteComponent>,
    },
]

export const baseRoutes = [...publicRoutes]
