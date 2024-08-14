import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import WrapperRouteComponent from '../config';

const LayoutPage = lazy(() => import("@/layout/LayoutPage"))
const ArticleRankingPage = lazy(() => import("@/views/article-ranking/ArticleRankingPage"))
const ArticleDetailPage = lazy(() => import("@/views/article-detail/ArticleDetailPage"))


const article: IRouteConfigsTable = {
  path: '/article',
  name: 'articleRanking',
  element: <WrapperRouteComponent auth={false} title={'layout'} ><LayoutPage /></WrapperRouteComponent>,
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
      element: <WrapperRouteComponent auth={true} title={'articleRanking'} ><ArticleRankingPage /></WrapperRouteComponent>,
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/detail/:id',
      name: 'articleDetail',
      element: <WrapperRouteComponent auth={false} title={'articleDetail'} ><ArticleDetailPage /></WrapperRouteComponent>,
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}

export default article