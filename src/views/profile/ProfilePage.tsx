import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tabs } from 'antd'
import { ProjectCard, Author, Chapter, Feature } from './components'
import type { TabsProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { getFeatureApi } from '@/api'
import { GetFeatureItemResult } from '@/types/api'
import { Loading } from '@/components'

const ProfilePage: React.FC = () => {
  const { t } = useTranslation()
  const [featureData, setFeatureData] = useState<GetFeatureItemResult[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatureData = async () => {
      try {
        const res: GetFeatureItemResult[] = (await getFeatureApi()).data
        setFeatureData(res)
      } catch (error) {
        console.error('Failed to fetch features:', error);
      } finally {
        setLoading(false);
      }
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

  if (loading) {
    return <Loading />
  }
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
