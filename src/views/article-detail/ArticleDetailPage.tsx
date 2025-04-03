import { getArticleDetailApi } from '@/api'
import { useSelector } from '@/redux/hooks'
import { relativeTime } from '@/utils/filter'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import NotFoundPage from '../error-page/NotFoundPage'
import { Loading } from '@/components'

const ArticleDetailPage: React.FC = () => {
  // 获取数据的方法
  const params = useParams()
  const navigate = useNavigate()
  const articleId = params.id
  const { t } = useTranslation()
  const [articleDetail, setArticleDetail] = useState<any>({})
  const language = useSelector((state) => state.base.language)
  const [loading, setLoading] = useState<boolean>(true);

  // 获取文章详情
  const fetchArticleDetail = async () => {
    try {
      if (!articleId) {
        throw new Error('Article ID is undefined');
      }

      const { data } = await getArticleDetailApi(articleId);
      setArticleDetail(data);
    } catch (error) {
      console.error('Failed to fetch article detail:', error);
      setArticleDetail(null); // 设置为 null 表示加载失败
    } finally {
      setLoading(false); // 无论成功或失败，都结束加载状态
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticleDetail()
    }
  }, [articleId])

  const onEditClick = () => {
    if (articleId) {
      navigate(`/article/editor/${articleId}`);
    }
  };
  // 如果正在加载，显示加载提示
  if (loading) {
    return <Loading />;
  }
  // 如果文章详情为空，显示 404 页面
  if (!articleDetail) {
    return <NotFoundPage />;
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
