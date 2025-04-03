import { useCallback, useMemo, useState } from 'react'
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
const FUSE_OPTIONS: Fuse.IFuseOptions<SearchPollType> = {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
        { name: 'title', weight: 0.7 },
        { name: 'path', weight: 0.3 }
    ]
};
export const HeaderSearch: React.FC = () => {
    const navigate = useNavigate()
    const routes = useSelector((state: RootState) => state.permission.routes)
    const [searchValue, setSearchValue] = useState<string>();
    const [isVisible, setIsVisible] = useState(false);
    // 生成搜索数据源
    const searchPool = useMemo<SearchPollType[]>(
        () => generateRoutes(routes),
        [routes]
    );

    // 搜索库相关
    // 初始化 Fuse 实例
    const fuseInstance = useMemo(
        () => new Fuse(searchPool, FUSE_OPTIONS),
        [searchPool]
    );

    // 处理搜索选项生成
    const generateSearchOptions = useCallback((results: Fuse.FuseResult<SearchPollType>[]): NewFuseType[] => {
        const uniqueResults = Array.from(new Map(
            results.map(result => [result.item.path, result.item])
        ).values());

        return Array.from(uniqueResults).map(item => ({
            label: item.title.join(' > '),
            value: item.path
        }));
    }, []);

    // search 相关
    // 搜索方法
    const [searchOptions, setSearchOptions] = useState<SelectProps['options']>([])
    const handleSearch = useCallback((query: string) => {
        if (!query.trim()) {
            setSearchOptions([]);
            return;
        }

        const results = fuseInstance.search(query);
        const options = generateSearchOptions(results);
        setSearchOptions(options);
    }, [fuseInstance, generateSearchOptions]);

    // 选中回调
    // 导航处理
    const handleSelect = useCallback((path: string) => {
        navigate(path);
        setSearchValue(undefined);  // 清空选中值
        setIsVisible(false);        // 关闭下拉框
    }, [navigate]);

    // 切换搜索框可见状态
    const toggleSearch = useCallback(() => {
        setIsVisible(prev => !prev);
    }, []);

    return (
        <div className={styles['header-search']} id="guide-search">
            <button
                type="button"
                onClick={toggleSearch}
                aria-label="Toggle search"
                className={styles.toggleButton}>
                <SearchOutlined />
            </button>
            <Select
                className={styles[isVisible ? 'show' : 'hide']}
                style={{ width: 200 }}
                showSearch
                value={searchValue}
                placeholder="Search..."
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleSelect}
                notFoundContent={null}
                options={searchOptions}
                onBlur={() => setIsVisible(false)}
                autoFocus={isVisible}
            />
        </div>
    )
}
