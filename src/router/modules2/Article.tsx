import LayoutPage from '@/layout/LayoutPage';
import ArticleRankingPage from "@/views/article-ranking/ArticleRankingPage";
import ArticleDetailPage from "@/views/article-detail/ArticleDetailPage";
import { RoutersProps } from '../types';
import { Navigate } from 'react-router-dom';

const article: IRouteConfigsTable = {
  path: '/article',
  name: 'articleRanking',
  element: <LayoutPage />,
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    // 默认子路由
    {
      path: '',
      element: <Navigate to="/article/ranking" />,
    },
    {
      path: '/article/ranking',
      name: 'articleRanking',
      element: <ArticleRankingPage />,
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/detail/:id',
      name: 'articleDetail',
      element: <ArticleDetailPage />,
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}

export default article