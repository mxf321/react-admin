import { getArticleDetailApi } from '@/api'
import { useSelector } from '@/redux/hooks'
import { relativeTime } from '@/utils/filter'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import NotFoundPage from '../error-page/NotFoundPage'

const ArticleDetailPage: React.FC = () => {
  // 获取数据的方法
  const params = useParams()
  const navigate = useNavigate()
  const articleId = params.id
  const { t } = useTranslation()
  const [articleDetail, setArticleDetail] = useState<any>({})
  const language = useSelector((state) => state.base.language)
  const getArticleDetail = async () => {
    const res = (await getArticleDetailApi(articleId!)).data
    setArticleDetail(res)
  }

  useEffect(() => {
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId])

  const onEditClick = () => {
    navigate(`/article/editor/${articleId}`)
  }

  return (
    <>
      {articleDetail ? (
        <div className="article-detail-container">
          <h2 className="title">{articleDetail.title}</h2>
          <div className="header">
            <span className="author">
              {t('article.author')}:{articleDetail.author}
            </span>
            <span className="time">
              {t('article.publicDate')}:
              {relativeTime(language, articleDetail.publicDate)}
            </span>
            <Button type="link" className="edit" onClick={onEditClick}>
              {t('article.edit')}
            </Button>
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: articleDetail.content }}
          ></div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}
export default ArticleDetailPage
