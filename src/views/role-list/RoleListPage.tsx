import { Button, Card, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DistributePermission } from './components'
import { ErrorPage, Loading, PermissionButton } from '@/components'
import { useSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { getRoleList } from '@/redux/userRole/slice'
import { AppDispatch, RootState } from '@/redux'
import { GetRoleItemResult } from '@/types/api'

// dispatch 获取接口
const RoleListPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.userRole.loading)
  const error = useSelector((state: RootState) => state.userRole.error)
  const tableData: GetRoleItemResult[] = useSelector(
    (state: RootState) => state.userRole.getRoleListData
  )

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      render: (text, record, index: number) => `${index + 1}`
    },
    {
      title: t('role.name'),
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: t('role.desc'),
      dataIndex: 'describe',
      key: 'describe'
    },
    {
      title: t('excel.action'),
      key: 'action',
      render: (text, record: GetRoleItemResult) => (
        <PermissionButton permission="distributePermission">
          <Button
            type="primary"
            onClick={(e) => onDistributePermissionClick(record, e)}
          >
            {t('role.assignPermissions')}
          </Button>
        </PermissionButton>
      )
    }
  ]

  useEffect(() => {
    dispatch(getRoleList())
  }, [])

  const [selectedData, setSelectedData] = useState<React.Key[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectRoleId, setSelectRoleId] = useState<string>('')
  // 分配权限---------未完成
  const onDistributePermissionClick = (row: GetRoleItemResult, e) => {
    e.stopPropagation()
    setIsModalVisible(true)
    setSelectRoleId(row.id)
  }

  const handleConfirm = (data: React.Key[]) => {
    setSelectedData(data)
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <>
      <Card>
        <Table columns={columns} dataSource={tableData} pagination={false} />
      </Card>
      <DistributePermission
        isVisible={isModalVisible}
        onConfirmRoles={handleConfirm}
        roleId={selectRoleId}
        onCancel={handleCancel}
      />
    </>
  )
}
export default RoleListPage
