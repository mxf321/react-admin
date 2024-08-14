import React from 'react'
import { Collapse } from 'antd'
import { GetFeatureItemResult } from '@/types/api'

interface PropsType {
  features: GetFeatureItemResult[]
}

export const Feature: React.FC<PropsType> = ({ features }) => {
  return (
    <Collapse
      accordion
      expandIconPosition="end"
      bordered={false}
      items={features.map((item) => ({
        key: item.id,
        label: item.title,
        children: <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
      }))}
    />
  )
}
