import { Card, Input, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MyEditor, MyMarkdown } from './components'
import type { TabsProps } from 'antd'
import { getArticleDetailApi } from '@/api'
import { useParams } from 'react-router-dom'
import type { GetArticleDetailResult } from '@/types/api'

const ArticleCreatePage: React.FC = () => {
  const { t } = useTranslation()

  const [title, setTitle] = useState<string>('')
  // 处理编辑状态
  const params = useParams()
  const articleId: string | undefined = params.id
  const [articleDetail, setArticleDetail] = useState({})

  const getArticleDetail = async () => {
    const res: GetArticleDetailResult = (await getArticleDetailApi(articleId!))
      .data
    setArticleDetail(res)
    setTitle(res.title)
  }
  const clearTitle = () => {
    setTitle('')
  }
  const onChange = (e) => {
    setTitle(e.target.value.trim())
  }
  const items: TabsProps['items'] = [
    {
      key: 'markdown',
      label: t('article.markdown'),
      children: (
        <MyMarkdown
          title={title}
          articleDetail={articleDetail}
          onCancle={clearTitle}
        />
      )
    },
    {
      key: 'editor',
      label: t('article.richText'),
      children: (
        <MyEditor
          title={title}
          articleDetail={articleDetail}
          onCancle={clearTitle}
        />
      )
    }
  ]

  useEffect(() => {
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId])

  return (
    <div className="article-create">
      <Card>
        <Input
          placeholder={t('article.titlePlaceholder')}
          allowClear
          value={title}
          onChange={onChange}
        />
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  )
}
export default ArticleCreatePage
