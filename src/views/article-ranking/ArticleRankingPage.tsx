import {
  Button,
  Card,
  Checkbox,
  Divider,
  message,
  Popconfirm,
  Table
} from 'antd'
import DynamicData from './dynamic/DynamicData'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  deleteArticleApi,
  getArticleListApi,
  sortArticleApi
} from '@/api'
import { relativeTime } from '@/utils/filter'
import { useSelector } from '@/redux/hooks'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { TableColumnsType } from 'antd'
import { GetArticleListResult, GetArticleItemResult } from '@/types/api'
import { DynamicItemType, InitDynamicItemType } from '@/types/app'
import { RootState } from '@/redux'
import { ColumnGroupType, ColumnType } from 'antd/es/table'

interface DataType {
  key: string | number,
  ranking: string | number,
  title: string,
  author: string,
  publicDate: string | number,
  desc: string,
}
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string
}
const Row = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: props['data-row-key']
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {})
  }

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  )
}
const ArticleRankingPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [dynamicData, setDynamicData] = useState<InitDynamicItemType[]>([])
  const language: "zh" | "en" = useSelector((state: RootState) => state.base.language)
  const dyData: DynamicItemType[] = DynamicData()
  // 获取动态列的数据
  const initDynamicData = () => {
    const res: InitDynamicItemType[] = dyData.map((item: DynamicItemType) => ({ label: item.label, value: item.prop }))
    setDynamicData(res)
  }

  // 创建 被勾选的动态列数据
  const [selectDynamicLable, setSelectDynamicLable] = useState<string[]>([])
  // 默认全部勾选
  const initSelectDynamicLable = async () => {
    const res: string[] = dyData.map((item: DynamicItemType) => item.prop)
    setSelectDynamicLable(res)
  }
  const onChange = (checkedValues: string[]) => {
    setSelectDynamicLable(checkedValues)
  }
  useEffect(() => {
    initDynamicData()
    initSelectDynamicLable()
  }, [language])

  // 文章 table
  const columns: TableColumnsType<DataType> = [
    {
      title: t('article.ranking'),
      dataIndex: 'ranking',
      key: 'ranking'
    },
    {
      title: t('article.title'),
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: t('article.author'),
      dataIndex: 'author',
      key: 'author'
    },

    {
      title: t('article.publicDate'),
      dataIndex: 'publicDate',
      key: 'publicDate',
      render: (publicDate) => relativeTime(language, publicDate)
    },
    {
      title: t('article.desc'),
      dataIndex: 'desc',
      key: 'desc'
    },
    {
      title: t('article.action'),
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={(e) => onShowClick(record, e)}>
            {t('article.show')}
          </Button>
          <Divider type="vertical" />
          <Button danger>
            <Popconfirm
              title={
                t('article.dialogTitle1') +
                record.title +
                t('article.dialogTitle2')
              }
              onConfirm={(e) => confirm(record, e)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">{t('article.remove')}</a>
            </Popconfirm>
          </Button>
        </>
      )
    }
  ]
  const [tableColumns, setTableColumns] = useState(columns)

  // 数据相关
  const [tableData, setTableData] = useState<DataType[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(5)

  const getTable = (tableData: GetArticleItemResult[]) => {
    const newTable: DataType[] = []
    tableData.forEach((item: GetArticleItemResult) => {
      newTable.push({
        key: item.id,
        ranking: item.ranking,
        title: item.title,
        author: item.author,
        publicDate: item.publicDate,
        desc: item.desc
      })
    })
    return newTable
  }
  // 获取数据的方法
  const getListData = async () => {
    const res: GetArticleListResult = (await getArticleListApi({ page: page, size: size })).data
    setTotal(res.total)
    const resTable: DataType[] = getTable(res.list)
    setTableData(resTable)
  }

  useEffect(() => {
    // // 遍历列数据，从中判读出当前列是否是被勾选的
    const tableCols: (ColumnGroupType<DataType> | ColumnType<DataType>)[] = []
    // 遍历列数据，从中判读出当前列是否是被勾选的
    const selectData: (ColumnGroupType<DataType> | ColumnType<DataType>)[] = columns.filter((column) => {
      return selectDynamicLable.includes(column.key as string)
    })
    tableCols.push(...selectData)
    setTableColumns(tableCols)
    getListData()
  }, [selectDynamicLable])

  // 查看详情
  const onShowClick = (row: DataType, e) => {
    e.stopPropagation()
    navigate(`/article/detail/${row.key}`)
  }

  const confirm = async (row: DataType, e) => {
    e.stopPropagation()
    await deleteArticleApi(row.key)
    message.success(t('article.removeSuccess'))
    getListData()
  }

  const cancel = () => {
    message.info('Delete canceled')
  }

  // 改变table
  const changeTable = (page: number, pageSize: number) => {
    setSize(pageSize)
    setPage(page)
    getListData()
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1
      }
    })
  )

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      let activeIndex, overIndex
      setTableData((prev) => {
        activeIndex = prev.findIndex((i) => i.key === active.id)
        overIndex = prev.findIndex((i) => i.key === over?.id)

        return arrayMove(prev, activeIndex, overIndex)
      })
      await sortArticleApi({
        initRanking: tableData[activeIndex].ranking,
        finalRanking: tableData[overIndex].ranking
      })
      message.success(t('article.sortSuccess'))
    }
  }

  return (
    <div className="article-ranking-container">
      <Card bordered={true} style={{ width: '100%' }}>
        <div>{t('article.dynamicTitle')}</div>
        <Checkbox.Group
          options={dynamicData}
          value={selectDynamicLable}
          onChange={onChange}
        />
      </Card>
      <Card>
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={tableData.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: Row
                }
              }}
              rowKey="key"
              columns={tableColumns}
              dataSource={tableData}
              pagination={{
                defaultPageSize: 5,
                defaultCurrent: 1,
                total: total,
                pageSize: size,
                current: page,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: [2, 5, 10],
                showTotal: (total) => `共${total}条`,
                onChange: changeTable,
                locale: {
                  items_per_page: '/页',
                  jump_to: '跳至',
                  page: '页'
                }
              }}
            />
          </SortableContext>
        </DndContext>
      </Card>
    </div>
  )
}
export default ArticleRankingPage
