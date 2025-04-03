import { Dropdown, MenuProps, Space, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { setLanguageCreator } from '@/redux/base/baseActions'
import { SvgIcon } from '@/components'
import { AppDispatch } from '@/redux'
import { useCallback } from 'react'

export const LangSelect: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const items: MenuProps['items'] = [
        {
            key: 'zh',
            label: '中文'
        },
        {
            key: 'en',
            label: 'English'
        }
    ]

    const handleLanguageChange: MenuProps['onClick'] = useCallback((e) => {
        dispatch(setLanguageCreator(e.key))
    }, [dispatch])

    return (
        <div id="guide-lang">
            <Dropdown
                menu={{
                    items,
                    onClick: handleLanguageChange,
                }}
            >
                <Typography.Link>
                    <Space>
                        <SvgIcon icon={'language'} />
                    </Space>
                </Typography.Link>
            </Dropdown>
        </div>
    )
}
