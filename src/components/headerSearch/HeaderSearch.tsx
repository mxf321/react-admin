import { useState } from 'react'
import styles from './HeaderSearch.module.scss'
import { SearchOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import Fuse from 'fuse.js' // 模糊搜索
import { useNavigate } from 'react-router-dom'
import { useSelector } from '@/redux/hooks'
import { generateRoutes } from './FuseData'
import type { SearchPollType, NewFuseType } from '@/types/app'
import { RootState } from '@/redux/index'

export const HeaderSearch: React.FC = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState<string>()
    const routes = useSelector((state: RootState) => state.permission.routes)

    // 数据源
    const searchPoll: SearchPollType[] = generateRoutes(routes)
    // 搜索库相关
    let fuse
    const initFuse = (searchPoll) => {
        fuse = new Fuse(searchPoll, {
            shouldSort: true,
            minMatchCharLength: 1,
            keys: [
                {
                    name: 'title',
                    weight: 0.7
                },
                {
                    name: 'path',
                    weight: 0.3
                }
            ]
        })
    }
    initFuse(searchPoll)
    // 控制 search 展示
    const [isShow, setIsShow] = useState<boolean>(false)
    const onShowClick = () => {
        setIsShow(!isShow)
    }

    // 去重
    const filterFuse = (fuse) => {
        const stringFuse = fuse.map((i) => JSON.stringify(i.item))
        const newFuse = Array.from(new Set(stringFuse))
        return newFuse.map((j) => JSON.parse(j))
    }

    // 凑数据
    const generateFuse = (fuse) => {
        // 去重
        const fFuse: SearchPollType[] = filterFuse(fuse)
        const newFuse: NewFuseType[] = []
        fFuse.forEach((i) => {
            const res: NewFuseType = {
                label: i.title.join('>'),
                value: i.path
            }
            newFuse.push(res)
        })
        return newFuse
    }

    // search 相关
    // 搜索方法
    const [searchOptions, setSearchOptions] = useState<SelectProps['options']>([])
    const handleSearch = (query: string) => {
        if (query !== '') {
            const fuseData = fuse.search(query)
            const newFusedata: NewFuseType[] = generateFuse(fuseData)
            setSearchOptions(newFusedata)
        } else {
            setSearchOptions([])
        }
    }

    // 选中回调
    const handleChange = (value: string) => {
        navigate(value)
    }

    return (
        <div className={styles['header-search']} id="guide-search">
            <span onClick={onShowClick}>
                <SearchOutlined />
            </span>
            <Select
                className={`${isShow ? styles['show'] : styles['hide']}`}
                style={{ width: 200 }}
                showSearch
                value={value}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
                options={(searchOptions || []).map((d) => ({
                    value: d.value,
                    label: d.label
                }))}
            />
        </div>
    )
}
