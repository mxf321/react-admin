import { Button, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../ArticleCreatePage.module.scss'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { commitArticle, editArticle } from './commit'
import { GetArticleDetailResult } from '@/types/api'

interface PropsType {
  title: string
  articleDetail: GetArticleDetailResult
  onCancle: () => void
}

export const MyMarkdown: React.FC<PropsType> = ({
  title,
  articleDetail,
  onCancle
}) => {
  const { t } = useTranslation()
  const [editValue, setEditValue] = useState(articleDetail)
  const [vd, setVd] = useState<Vditor>()
  let vditor
  const initEditor = (params) => {
    let { value } = params
    value = value ? value : ' '
    vditor = new Vditor('vditor', {
      after: () => {
        vditor.setValue(value)
        setVd(vditor)
      },
      blur() {
        saveDoc()
      }
    })
    return vditor
  }

  const saveDoc = () => {
    //在初始化时已经把vditor赋值到this对象上 可直接通过getValue方法获取当前编辑器的值
    const mdValue = vditor && vditor.getValue()
    setEditValue(mdValue)
  }

  useEffect(() => {
    initEditor({ value: (articleDetail && articleDetail.content) })
    // Clear the effect
    return () => {
      vd?.destroy()
      setVd(undefined)
    }
  }, [articleDetail])

  const onSubmitClick = async () => {
    if (!title) {
      message.info(t('article.titlePlaceholder'))
      return
    }
    if (articleDetail && articleDetail.id) {
      await editArticle({
        id: articleDetail.id,
        title: title,
        content: editValue
      })
    } else {
      await commitArticle({
        title: title,
        content: editValue
      })
    }
    initEditor({ value: '' })
    onCancle()
  }
  return (
    <div className={styles['markdown-container']}>
      <div id="vditor" className="vditor" />
      <div className={styles.buttom}>
        <Button type="primary" onClick={onSubmitClick}>
          {t('article.commit')}
        </Button>
      </div>
    </div>
  )
}
