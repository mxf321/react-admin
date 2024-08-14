import styles from './LayoutPage.module.scss'
import React from 'react'
import { Layout } from 'antd'
import { AppMain, Navbar, Sidebar } from './components'
import { TagsView } from '@/components';
const LayoutPage: React.FC = () => {
    return (
        <Layout className={styles['app-wrapper']}>
            <Sidebar />
            <Layout>
                <Navbar />
                <TagsView />
                <AppMain />
            </Layout>
        </Layout>
    )
}
export default LayoutPage