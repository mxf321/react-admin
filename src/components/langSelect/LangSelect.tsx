import { Dropdown, MenuProps, Space, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { setLanguageCreator } from '@/redux/base/baseActions'
import { SvgIcon } from '@/components'
import { AppDispatch } from '@/redux'

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

    const onClick: MenuProps['onClick'] = (e) => {
        dispatch(setLanguageCreator(e.key))
    }

    return (
        <div id="guide-lang">
            <Dropdown
                menu={{
                    items,
                    onClick
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
