import { Avatar, Layout } from 'antd'
import React from 'react'
import styles from '../../LayoutPage.module.scss'
import { SidebarMenu } from './SidebarMenu'
import { useSelector } from '@/redux/hooks'
import { RootState } from '@/redux'

const { Sider } = Layout

export const Sidebar: React.FC = () => {
    const collapsed = useSelector((state: RootState) => state.base.collapsed)

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width="256px"
            className="sider"
        >
            <div className={styles['logo-container']}>
                <Avatar
                    className={styles['logo-avatar']}
                    size={64}
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                {!collapsed && (
                    <span className={styles['logo-title']}>REACT ADMIN</span>
                )}
            </div>
            <SidebarMenu />
        </Sider>
    )
}
