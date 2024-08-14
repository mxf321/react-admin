import { getPermissionListApi } from '@/api'
import { Card, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TableColumnsType } from 'antd'
import { GetPermissionListResult } from '@/types/api'

interface DataType {
    key: React.Key
    id: number | string
    name: string
    mark: string
    desc: string
}

const PermissionListPage: React.FC = () => {
    const { t } = useTranslation()
    const columns: TableColumnsType<DataType> = [
        {
            title: t('permission.name'),
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: t('permission.mark'),
            dataIndex: 'mark',
            key: 'mark'
        },
        {
            title: t('permission.desc'),
            dataIndex: 'desc',
            key: 'desc'
        }
    ]
    // 数据相关
    const [tableData, setTableData] = useState<DataType[]>([])
    const getTable = (tableData: GetPermissionListResult[]) => {
        const newTable: DataType[] = []
        tableData.forEach((item) => {
            const res = {
                key: item.id,
                id: item.id,
                name: item.permissionName,
                mark: item.permissionMark,
                desc: item.permissionDesc
            }
            let children
            if (item.children && item.children.length > 0) {
                children = getTable(item.children)
            }
            res['children'] = children
            newTable.push(res)
        })
        return newTable
    }
    // 获取数据的方法
    const getListData = async () => {
        const res: GetPermissionListResult[] = (await getPermissionListApi()).data
        const resTable: DataType[] = getTable(res)
        setTableData(resTable)
    }
    useEffect(() => {
        getListData()
    }, [])

    return (
        <Card>
            <Table columns={columns} dataSource={tableData} pagination={false} />
        </Card>
    )
}
export default PermissionListPage
