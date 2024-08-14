import React, { useEffect, useState } from 'react'
import { Modal, message, Spin, Tree } from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'
import { useTranslation } from 'react-i18next'
import {
    changeUserRolesApi,
    getPermissionListApi,
    getRolePermissionApi
} from '@/api'
import { GetPermissionListResult } from '@/types/api'

interface ChildComponentProps {
    roleId: string
    isVisible: boolean
    onConfirmRoles: (data: any) => void
    onCancel: () => void
}

export const DistributePermission: React.FC<ChildComponentProps> = ({
    roleId,
    isVisible,
    onConfirmRoles,
    onCancel
}) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(true)
    // 拼凑tree数据
    const generateTree = (data: GetPermissionListResult[]) => {
        const newData: TreeDataNode[] = []
        data.forEach((item) => {
            const children: TreeDataNode[] | null =
                item.children && item.children.length > 0
                    ? generateTree(item.children)
                    : null
            const res = {
                title: item.permissionName,
                key: item.id,
                children: children
            } as TreeDataNode
            newData.push(res)
        })
        return newData
    }

    // 获取用户权限
    const [permissionList, setPermissionList] = useState<TreeDataNode[]>([])
    const getPermissionList = async () => {
        const res: GetPermissionListResult[] = (await getPermissionListApi(roleId))
            .data
        const nres: TreeDataNode[] = generateTree(res)
        setPermissionList(nres)
        setLoading(false)
    }

    // 当前角色的权限
    const [userRolesTitleList, setUserRolesTitleList] = useState<React.Key[]>([])
    const getRolePermission = async () => {
        const res: React.Key[] = (await getRolePermissionApi(roleId)).data
        setExpandedKeys(res)
        setUserRolesTitleList(res)
    }

    useEffect(() => {
        getPermissionList()
        getRolePermission()
    }, [roleId])

    const handleConfirm = async () => {
        await changeUserRolesApi(userRolesTitleList)
        message.success(t('role.updateRoleSuccess'))
        onConfirmRoles(userRolesTitleList)
    }
    const handleCancel = () => {
        onCancel()
    }

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

    const onExpand: TreeProps['onExpand'] = (expandedKeysValue: React.Key[]) => {
        setExpandedKeys(expandedKeysValue)
        setAutoExpandParent(false)
    }
    const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
        setUserRolesTitleList(checkedKeysValue as React.Key[])
        setExpandedKeys(checkedKeysValue as React.Key[])
    }
    const onSelect: TreeProps['onSelect'] = (selectedKeysValue: React.Key[]) => {
        setSelectedKeys(selectedKeysValue)
    }

    if (!permissionList || permissionList.length < 1) {
        return <Spin size="large" />
    }

    return (
        <Modal
            open={isVisible}
            onCancel={handleCancel}
            onOk={handleConfirm}
            title={t('excel.roleDialogTitle')}
            okText={t('universal.confirm')}
            cancelText={t('universal.cancel')}
        >
            <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={userRolesTitleList}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={permissionList}
            />
        </Modal>
    )
}
