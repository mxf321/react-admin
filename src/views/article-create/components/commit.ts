import { createArticleApi, editArticleApi } from '@/api'
import i18next from 'i18next'
import { message } from 'antd'
import { CommitArticleParams, EditArticleParams } from '@/types/api'

export const commitArticle = async (data: CommitArticleParams) => {
  const res = await createArticleApi(data)
  message.success(i18next.t('article.createSuccess'))
  return res
}

export const editArticle = async (data: EditArticleParams) => {
  const res = await editArticleApi(data)
  message.success(i18next.t('article.editorSuccess'))
  return res
}
