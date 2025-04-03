import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './TagsView.module.scss'
import { useSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'
import {
    removeTagsViewCreator
} from '@/redux/base/baseActions'
import { Dropdown, MenuProps } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { AppDispatch, RootState } from '@/redux'
import type { TagsViewItemType } from '@/types/app'

type MenuAction = 'refresh' | 'closeRight' | 'closeOther';
export const TagsView: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const location = useLocation()
    const tagsViewList = useSelector((state: RootState) => state.base.tagsViewList)
    const mainColor = useSelector((state: RootState) => state.theme.mainColor)

    // 右键菜单状态
    const [contextMenuState, setContextMenuState] = useState<{
        index: number;
        tag: TagsViewItemType;
    }>({ index: 0, tag: undefined! });

    // 生成菜单项
    const contextMenuItems = useMemo<MenuProps['items']>(() => [
        { label: t('tagsView.refresh'), key: 'refresh' },
        { label: t('tagsView.closeRight'), key: 'closeRight' },
        { label: t('tagsView.closeOther'), key: 'closeOther' }
    ], [t]);

    // 判断当前激活状态
    const isActive = useCallback((path: string) =>
        path === location.pathname,
        [location.pathname]);

    // 处理菜单操作
    const handleContextMenuAction = useCallback(async (action: MenuAction) => {
        const { index, tag } = contextMenuState;

        switch (action) {
            case 'refresh':
                navigate(0);
                break;

            case 'closeRight':
                dispatch(removeTagsViewCreator('right', index))
                if (tagsViewList.slice(index + 1).some(t => isActive(t.fullPath))) {
                    navigate(tagsViewList[0].fullPath);
                }
                break;

            case 'closeOther':
                dispatch(removeTagsViewCreator('right', index))
                navigate(tag.fullPath);
                break;
        }
    }, [contextMenuState, dispatch, navigate, tagsViewList, isActive]);

    // 关闭单个标签
    const handleCloseTag = useCallback((index: number, e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(removeTagsViewCreator('index', index))
        if (isActive(tagsViewList[index].fullPath)) {
            const prevTag = tagsViewList[index - 1] || tagsViewList[index + 1];
            prevTag && navigate(prevTag.fullPath);
        }
    }, [dispatch, navigate, tagsViewList, isActive]);

    return (
        <div id="guide-tag" className={styles['tags-view-container']}>
            {tagsViewList.map((tag, index) => (
                <Dropdown
                    menu={{
                        items: contextMenuItems,
                        onClick: ({ key }) => handleContextMenuAction(key as MenuAction)
                    }}
                    trigger={['contextMenu']}
                    key={`tag-${tag.fullPath}`}
                    onOpenChange={() => setContextMenuState({ index, tag })}
                >
                    <Link
                        className={`${styles['tags-view-item']} ${isActive(tag.fullPath) ? styles['active'] : ''
                            } `}
                        style={{
                            backgroundColor: isActive(tag.fullPath) ? mainColor : ''
                        }}
                        to={tag.fullPath}
                        key={tag.fullPath}
                    >
                        {t('route.' + tag.title)}
                        {!isActive(tag.fullPath) && (
                            <CloseOutlined onClick={(e) => handleCloseTag(index, e)} />
                        )}
                    </Link>
                </Dropdown>
            ))}
        </div>
    )
}
