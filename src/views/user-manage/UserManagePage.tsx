import { Avatar, Button, Card, Flex, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { Divider, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/hooks'
import { dataFilter } from '@/utils/filter'
import { useNavigate } from 'react-router-dom'
import { Popconfirm, message } from 'antd'
import { ExportToExcel, Roles } from './components'
import { Loading, PermissionButton, ErrorPage } from '@/components'
import { useDispatch } from 'react-redux'
import { deleteUser, getUserManageList } from '@/redux/userManage/slice'
import { AppDispatch, RootState } from '@/redux'
import { GetUserManageItemResult, RoleType } from '@/types/api'

// dispatch 获取接口
const UserManagePage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.userManage.loading);
  const error = useSelector((state: RootState) => state.userManage.error);
  const tableData: GetUserManageItemResult[] = useSelector((state: RootState) => state.userManage.getUserManageListData);
  const total: number = useSelector((state: RootState) => state.userManage.getUserManageListTotal);

  // 导入
  const onImportExcelClick = () => {
    navigate('/user/import')
  }
  // 导出
  const [exportToExcelVisible, setExportToExcelVisible] = useState<boolean>(false)
  const onToExcelClick = () => {
    setExportToExcelVisible(true)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      render: (text, record, index: number) => `${index + 1}`
    },
    {
      title: t('excel.name'),
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: t('excel.mobile'),
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: t('excel.avatar'),
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar size="default" src={avatar} />
    },
    {
      title: t('excel.role'),
      key: 'role',
      dataIndex: 'role',
      render: (role: RoleType[]) => {
        if (role && role.length > 0) {
          return role.map((item) => <Tag key={item.id}>{item.title}</Tag>)
        } else {
          return <Tag>{t('excel.defaultRole')}</Tag>
        }
      }
    },
    {
      title: t('excel.openTime'),
      dataIndex: 'openTime',
      key: 'openTime',
      render: (openTime) => dataFilter(openTime)
    },
    {
      title: t('excel.action'),
      key: 'action',
      render: (text, record: GetUserManageItemResult) => (
        <>
          <Button type="primary" onClick={(e) => onShowClick(record, e)}>
            {t('excel.show')}
          </Button>
          <Divider type="vertical" />
          <PermissionButton permission="distributeRole">
            <Button onClick={(e) => onShowRoleClick(record, e)}>
              {t('excel.showRole')}
            </Button>
          </PermissionButton>
          <Divider type="vertical" />
          <PermissionButton permission="removeUser">
            <Button danger>
              <Popconfirm
                title={
                  t('excel.dialogTitle1') +
                  record.username +
                  t('excel.dialogTitle2')
                }
                onConfirm={(e) => confirm(record, e)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">{t('excel.remove')}</a>
              </Popconfirm>
            </Button>
          </PermissionButton>
        </>
      )
    }
  ]
  // 数据相关
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(5)
  useEffect(() => {
    dispatch(getUserManageList({ page: page, size: size }))
  }, [page, size])

  // 查看详情
  const onShowClick = (row: GetUserManageItemResult, e) => {
    e.stopPropagation()
    navigate(`/user/info/${row.id}`)
  }
  // 删除
  const confirm = async (row: GetUserManageItemResult, e) => {
    e.stopPropagation()
    await dispatch(deleteUser(row.id))
    message.success(t('excel.removeSuccess'))
    dispatch(getUserManageList({ page: page, size: size }))
  }
  const cancel = () => {
    message.info('Delete canceled')
  }
  // 角色
  const [selectUserId, setSelectUserId] = useState('')
  const onShowRoleClick = (row: GetUserManageItemResult, e) => {
    e.stopPropagation()
    setIsModalVisible(true)
    setSelectUserId(row.id)
  }
  // 改变table
  const changeTable = (page: number, pageSize: number) => {
    setSize(pageSize)
    setPage(page)
    // getListData()
  }
  ////////弹窗
  const [selectedData, setSelectedData] = useState<string[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleConfirmRole = (data: string[]) => {
    setSelectedData(data)
    setIsModalVisible(false)
  }
  const handleCancelRole = () => {
    setIsModalVisible(false)
  }
  // 导出
  const handleConfirmETE = () => {
    setExportToExcelVisible(false)
  }
  const handleCancelETE = () => {
    setExportToExcelVisible(false)
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="user-manage-container">
      <Card>
        <Flex gap="small" wrap>
          <PermissionButton permission="importUser">
            <Button type="primary" onClick={onImportExcelClick}>
              {t('excel.importExcel')}
            </Button>
          </PermissionButton>
          <Button onClick={onToExcelClick}>{t('excel.exportExcel')}</Button>
        </Flex>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: total,
            pageSize: size,
            current: page,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: [2, 5, 10],
            showTotal: (total) => `共${total}条`,
            onChange: changeTable,
            locale: {
              items_per_page: '/页',
              jump_to: '跳至',
              page: '页'
            }
          }}
        />
      </Card>
      <ExportToExcel
        isVisible={exportToExcelVisible}
        onConfirmETE={handleConfirmETE}
        onCancelETE={handleCancelETE}
      />
      <Roles
        isVisible={isModalVisible}
        onConfirmRoles={handleConfirmRole}
        userId={selectUserId}
        onCancelRole={handleCancelRole}
      />
    </div>
  )
}
export default UserManagePage
