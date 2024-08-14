import { getChapterApi } from '@/api'
import { GetChapterItemResult } from '@/types/api'
import { Card, Timeline } from 'antd'
import { useEffect, useState } from 'react'

export const Chapter: React.FC = () => {
  const [chapterData, setChapterData] = useState<GetChapterItemResult[]>([])
  useEffect(() => {
    const getChapterData = async () => {
      const res: GetChapterItemResult[] = (await getChapterApi()).data
      setChapterData(res)
    }
    getChapterData()
  }, [])
  return (
    <Timeline
      items={chapterData.map((item) => ({
        children: (
          <>
            <p>{item.timestamp}</p>,<Card>{item.content}</Card>
          </>
        )
      }))}
    />
  )
}
