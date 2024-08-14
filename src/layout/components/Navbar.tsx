import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Layout, theme } from 'antd'
import { useDispatch } from 'react-redux'
import { triggerCollapsedCreator } from '@/redux/base/baseActions'
import { useSelector } from '@/redux/hooks'
import { BreadcrumbComp } from '@/components/breadcrumb/index'
import { SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '@/redux/user/slice'
import {
    LangSelect,
    ThemeSelect,
    FullScreen,
    HeaderSearch,
    Guide
} from '@/components'
import { useTranslation } from 'react-i18next'
import { AppDispatch, RootState } from '@/redux'
const { Header } = Layout

export const Navbar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const {
        token: { colorBgContainer }
    } = theme.useToken()

    const collapsed = useSelector((state: RootState) => state.base.collapsed)
    const triggerCollapsed = () => {
        dispatch(triggerCollapsedCreator(!collapsed))
    }
    // 个人信息操作
    const items: MenuProps['items'] = [
        {
            key: 'home',
            label: <Link to="/">{t('navBar.home')}</Link>
        },
        {
            key: 'course',
            label: (
                <a target="_blank" href="">
                    {t('navBar.course')}
                </a>
            )
        },
        {
            key: 'logout',
            label: t('navBar.logout')
        }
    ]
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'logout') {
            dispatch(logOut())
            navigate('/login')
        }
    }

    return (
        <Header style={{ padding: ' 0 15px 0 0', background: colorBgContainer }}>
            <Flex justify="space-between">
                <Flex align="center" flex="1">
                    <Button
                        id="guide-hamburger"
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={triggerCollapsed}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64
                        }}
                    />
                    <BreadcrumbComp />
                </Flex>
                <Flex align="center">
                    <Guide />
                    <HeaderSearch />
                    <FullScreen />
                    <ThemeSelect />
                    <LangSelect />

                    <Dropdown
                        menu={{
                            items,
                            onClick
                        }}
                    >
                        <Typography.Link>
                            <Space>
                                <Avatar
                                    size="default"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                />
                                <SettingOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </Flex>
            </Flex>
        </Header>
    )
}
