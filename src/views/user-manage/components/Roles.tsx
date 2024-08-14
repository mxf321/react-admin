import React, { useEffect, useState } from 'react'
import { Modal, Checkbox, message, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { getRolesListApi, getUserRolesApi, changeUserRolesApi } from '@/api'
import type { GetRolesItemResult } from '@/types/api'
import { RolesType } from '@/types/app'

interface ChildComponentProps {
  userId: string
  isVisible: boolean
  onConfirmRoles: (data: string[]) => void
  onCancelRole: () => void
}

export const Roles: React.FC<ChildComponentProps> = ({
  userId,
  isVisible,
  onConfirmRoles,
  onCancelRole
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(true)

  // 获取用户权限
  const [rolesList, setRolesList] = useState<RolesType[]>([])
  const getRolesList = async () => {
    const res: GetRolesItemResult[] = (await getRolesListApi(userId)).data
    const nres: RolesType[] = res.map((item) => ({
      label: item.title,
      value: item.title
    }))
    setRolesList(nres)
    setLoading(false)
  }

  // 当前用户角色
  const [userRolesTitleList, setUserRolesTitleList] = useState<string[]>([])
  const getUserRoles = async () => {
    const res: GetRolesItemResult[] = (await getUserRolesApi(userId)).data
    const nres: string[] = res.map((item) => item.title)
    setUserRolesTitleList(nres)
  }

  useEffect(() => {
    getRolesList()
    getUserRoles()
  }, [])

  const handleConfirm = async () => {
    await changeUserRolesApi(userRolesTitleList)
    message.success(t('role.updateRoleSuccess'))
    onConfirmRoles(userRolesTitleList)
  }
  const handleCancel = () => {
    onCancelRole()
  }
  const onChange = (e) => {
    setUserRolesTitleList(e)
  }

  if (!rolesList || rolesList.length < 1) {
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
      <Checkbox.Group
        options={rolesList}
        value={userRolesTitleList}
        onChange={onChange}
      />
    </Modal>
  )
}
