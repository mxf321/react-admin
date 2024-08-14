import React from 'react'
import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
const { Content } = Layout

export const AppMain: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()

    return (
        <Content
            style={{
                padding: 10,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
            }}
        >
            <Outlet />
        </Content>
    )
}
