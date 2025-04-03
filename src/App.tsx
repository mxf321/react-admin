import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '@/router/index'
import { ConfigProvider } from 'antd'
import { Suspense, useEffect, useState } from 'react'
import { useSelector } from '@/redux/hooks'
import { Loading } from '@/components'
import { useDispatch } from 'react-redux'
import { getUserInfo } from './redux/user/slice'
import { setRoutesActionCreator } from './redux/permission/permissionActions'
import { AppDispatch } from './redux'
// 定义路由配置表类型
type IRouteConfigsTable = typeof publicRoutes[number];
function App() {
    const dispatch = useDispatch<AppDispatch>()
    const [router, setRouter] = useState<IRouteConfigsTable[]>([])
    const mainColor = useSelector((state) => state.theme.mainColor)

    // 初始化路由
    const initRoutes = async () => {
        try {
            const { payload } = await dispatch(getUserInfo());
            const permissionsMenus: string[] = payload.permissions.menus;
            const filteredRoutes = filterRoutes(permissionsMenus);
            setRouter(filteredRoutes);
        } catch (error) {
            console.error('Failed to initialize routes:', error);
        }
    };

    // 根据权限数据筛选路由
    const filterRoutes = (menus: string[]) => {
        // 筛选之后，录取到的需要通过 addRoute 进行添加的路由表数据
        const routes: IRouteConfigsTable[] = [...publicRoutes]
        menus.forEach((key: string) => {
            routes.push(...privateRoutes.filter((item) => item.name === key))
        })
        dispatch(setRoutesActionCreator(routes))
        return routes
    }

    useEffect(() => {
        initRoutes()
    }, [])

    // 创建路由实例
    const nrouter =
        router && router.length
            ? createBrowserRouter(router)
            : createBrowserRouter(publicRoutes)

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: mainColor
                    }
                }}
            >
                <Suspense fallback={<Loading />}>
                    <RouterProvider router={nrouter} />
                </Suspense>
            </ConfigProvider>
        </>
    )
}

export default App
