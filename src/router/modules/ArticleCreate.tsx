import { lazy } from 'react'
import WrapperRouteComponent from '../config'

const LayoutPage = lazy(() => import('@/layout/LayoutPage'))
const ArticleCreatePage = lazy(
  () => import('@/views/article-create/ArticleCreatePage')
)

export default {
  path: '/article',
  element: <WrapperRouteComponent auth={false} title={'layout'} ><LayoutPage /></WrapperRouteComponent>,
  name: 'articleCreate',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      name: 'articleCreate',
      element: (
        <WrapperRouteComponent auth={true} title={'articleCreate'}>
          <ArticleCreatePage />
        </WrapperRouteComponent>
      ),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      name: 'articleEditor',
      element: (
        <WrapperRouteComponent auth={false} title={'articleEditor'}>
          <ArticleCreatePage />
        </WrapperRouteComponent>
      ),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
