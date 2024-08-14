import LayoutPage from '@/layout/LayoutPage';
import ArticleCreatePage from "@/views/article-create/ArticleCreatePage";

export default {
  path: '/article',
  element: <LayoutPage />,
  name: 'articleCreate',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      name: 'articleCreate',
      element: <ArticleCreatePage />,
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      name: 'articleEditor',
      element: <ArticleCreatePage />,
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
