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
import { useState } from 'react'
import { AppDispatch, RootState } from '@/redux'
import type { TagsViewItemType } from '@/types/app'

export const TagsView: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const location = useLocation()
    const tagsViewList = useSelector((state: RootState) => state.base.tagsViewList)
    const mainColor = useSelector((state: RootState) => state.theme.mainColor)
    // tagsIndex 操作 右键菜单
    const [tagsIndex, setTagsIndex] = useState<number>(0)
    const [tagItem, setTagItem] = useState<TagsViewItemType>()
    // 是否被选中
    const isActive: (tag: TagsViewItemType) => boolean = (tag: TagsViewItemType) => {
        return tag.fullPath === location.pathname
    }

    const items: MenuProps['items'] = [
        {
            label: t('tagsView.refresh'),
            key: 'refresh'
        },
        {
            label: t('tagsView.closeRight'),
            key: 'closeRight'
        },
        {
            label: t('tagsView.closeOther'),
            key: 'closeOther'
        }
    ]
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'refresh':
                onRefreshClick()
                break
            case 'closeRight':
                onCloseRightClick()
                break
            case 'closeOther':
                onCloseOtherClick()
                break
            default:
                break
        }
    }

    const onRefreshClick = () => {
        navigate(0)
    }

    const onCloseRightClick = () => {
        dispatch(removeTagsViewCreator('right', tagsIndex))
        // 删除的右侧数据有 isActive
        const rightTagsViewList: TagsViewItemType[] = tagsViewList.filter((i: TagsViewItemType, index: number) => index > tagsIndex)
        const curTag: TagsViewItemType | undefined = rightTagsViewList.find((i: TagsViewItemType) => location.pathname.includes(i.fullPath))
        if (curTag) {
            navigate(tagsViewList[0].fullPath)
        }
    }
    const onCloseOtherClick = () => {
        const path: string = tagsViewList[tagsIndex].fullPath
        dispatch(removeTagsViewCreator('other', tagsIndex))
        navigate(path)
    }
    const onOpenChange = (index: number, tag: TagsViewItemType) => {
        setTagsIndex(index)
        setTagItem(tag)
    }
    // 关闭
    const onCloseClick = (i, e) => {
        // e.preventDefault 阻止 link
        e.preventDefault()
        dispatch(removeTagsViewCreator('index', i))
    }

    return (
        <div id="guide-tag" className={styles['tags-view-container']}>
            {tagsViewList.map((tag, index) => (
                <Dropdown
                    menu={{ items, onClick: handleMenuClick }}
                    trigger={['contextMenu']}
                    key={`con-${index}`}
                    onOpenChange={() => {
                        onOpenChange(index, tag)
                    }}
                >
                    <Link
                        className={`${styles['tags-view-item']} ${isActive(tag) ? styles['active'] : ''
                            } `}
                        style={{
                            backgroundColor: isActive(tag) ? mainColor : ''
                        }}
                        to={tag.fullPath}
                        key={tag.fullPath}
                    >
                        {t('route.' + tag.title)}
                        {!isActive(tag) && (
                            <CloseOutlined onClick={(e) => onCloseClick(index, e)} />
                        )}
                    </Link>
                </Dropdown>
            ))}
        </div>
    )
}
