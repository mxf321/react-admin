// 指定初始列数据
import i18next from 'i18next'
export default () => [
  {
    label: i18next.t('article.ranking'),
    prop: 'ranking'
  },
  {
    label: i18next.t('article.title'),
    prop: 'title'
  },
  {
    label: i18next.t('article.author'),
    prop: 'author'
  },
  {
    label: i18next.t('article.publicDate'),
    prop: 'publicDate'
  },
  {
    label: i18next.t('article.desc'),
    prop: 'desc'
  },
  {
    label: i18next.t('article.action'),
    prop: 'action'
  }
]
