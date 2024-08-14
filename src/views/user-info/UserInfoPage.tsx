import { getUserDetailApi } from '@/api'
import { dataFilter } from '@/utils/filter'
import { Button, Card, Descriptions, DescriptionsProps, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './UserInfoPage.module.scss'
import { useReactToPrint } from 'react-to-print'

interface PropsType {
  id: string | number
}

const UserInfoPage: React.FC<PropsType> = ({ id }) => {
  const { t } = useTranslation()
  // 获取数据的方法
  const [userDetail, setUserDetail] = useState<any>({})
  useEffect(() => {
    const getListData = async () => {
      const userDetail = (await getUserDetailApi(id)).data
      setUserDetail(userDetail)
    }
    getListData()
  }, [id])

  const items: DescriptionsProps['items'] = [
    {
      key: 'username',
      label: t('userInfo.name'),
      children: userDetail.username,
      span: 1.5
    },
    {
      key: 'gender',
      label: t('userInfo.sex'),
      children: userDetail.gender,
      span: 1.5
    },
    {
      key: 'nationality',
      label: t('userInfo.nation'),
      children: userDetail.nationality,
      span: 1.5
    },
    {
      key: 'province',
      label: t('userInfo.province'),
      children: userDetail.province,
      span: 1.5
    },
    {
      key: 'openTime',
      label: t('userInfo.date'),
      children: dataFilter(userDetail.openTime),
      span: 1.5
    },
    {
      key: 'remark',
      label: t('userInfo.remark'),
      children: userDetail.remark?.map((item) => <Tag>{item}</Tag>),
      span: 1.5
    },
    {
      key: 'address',
      label: t('userInfo.address'),
      children: userDetail.address,
      span: 3
    }
  ]
  const vertItems: DescriptionsProps['items'] = [
    {
      key: 'experience',
      label: t('userInfo.experience'),
      children: (
        <ul>
          {userDetail.experience?.map((item, index) => (
            <li key={index}>
              <span>
                {dataFilter(item.startTime)}----{dataFilter(item.endTime)}
              </span>
              <span>{item.title}</span>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      ),
      span: 3
    },
    {
      key: 'major',
      label: t('userInfo.major'),
      children: userDetail.major,
      span: 3
    },
    {
      key: 'glory',
      label: t('userInfo.glory'),
      children: userDetail.glory,
      span: 3
    }
  ]

  // 打印
  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })
  return (
    <div className={styles['user-info-container']}>
      <Card>
        <Button type="primary" onClick={handlePrint}>
          {t('userInfo.print')}
        </Button>
        <div ref={componentRef} style={{ padding: '10px 20px' }}>
          <h2 className={styles['title']}>{t('userInfo.title')}</h2>
          <Descriptions bordered items={items} />
          <Descriptions layout="vertical" bordered items={vertItems} />
          <div className={styles['footer']}>{t('userInfo.foot')}</div>
        </div>
      </Card>
    </div>
  )
}
export default UserInfoPage
