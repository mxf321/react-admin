import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tabs } from 'antd'
import { ProjectCard, Author, Chapter, Feature } from './components'
import type { TabsProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { getFeatureApi } from '@/api'
import { GetFeatureItemResult } from '@/types/api'

const ProfilePage: React.FC = () => {
  const { t } = useTranslation()
  const [featureData, setFeatureData] = useState<GetFeatureItemResult[]>([])

  useEffect(() => {
    const getFeatureData = async () => {
      const res: GetFeatureItemResult[] = (await getFeatureApi()).data
      setFeatureData(res)
    }
    getFeatureData()
  }, [])

  const items: TabsProps['items'] = [
    {
      key: 'featur',
      label: t('profile.feature'),
      children: <Feature features={featureData} />
    },
    {
      key: 'chapter',
      label: t('profile.chapter'),
      children: <Chapter />
    },
    {
      key: 'author',
      label: t('profile.author'),
      children: <Author />
    }
  ]

  return (
    <Row gutter={12}>
      <Col span={6}>
        <ProjectCard features={featureData} />
      </Col>
      <Col span={18}>
        <Card bordered={true} style={{ width: '100%' }}>
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
      </Col>
    </Row>
  )
}
export default ProfilePage
