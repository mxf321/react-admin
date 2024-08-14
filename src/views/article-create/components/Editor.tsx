import { Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from '../ArticleCreatePage.module.scss'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { commitArticle, editArticle } from './commit'
import { GetArticleDetailResult } from '@/types/api'

interface PropsType {
  title: string
  articleDetail: GetArticleDetailResult
  onCancle: () => void
}

export const MyEditor: React.FC<PropsType> = ({ title, articleDetail, onCancle }) => {
  const { t } = useTranslation()
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    if (articleDetail && articleDetail.content) {
      setHtml(articleDetail.content)
    }
  }, [articleDetail])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...'
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [])
  // // 提交
  const onSubmitClick = async () => {
    if (!title) {
      message.info(t('article.titlePlaceholder'))
      return
    }
    if (articleDetail && articleDetail.id) {
      await editArticle({
        id: articleDetail.id,
        title: title,
        content: editor!.getHtml()
      })
    } else {
      await commitArticle({
        title: title,
        content: editor!.getHtml()
      })
    }
    editor!.clear()
    onCancle()
  }
  return (
    <div className={styles['editor-container']}>
      <div>
        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: '1px solid #ccc' }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(editor) => setHtml(editor.getHtml())}
            mode="default"
            style={{ height: '500px', overflowY: 'hidden' }}
          />
        </div>
      </div>
      <div className={styles.buttom}>
        <Button type="primary" onClick={onSubmitClick}>
          {t('article.commit')}
        </Button>
      </div>
    </div>
  )
}
