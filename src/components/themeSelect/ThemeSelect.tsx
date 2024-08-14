import { Dropdown, MenuProps, Space, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Modal } from 'antd'
import { setMainColorCreator } from '@/redux/theme/themeActions'
import { generate, green, presetPalettes, red } from '@ant-design/colors'
import { ColorPicker, theme } from 'antd'
import { SvgIcon } from '@/components'
import { AppDispatch } from '@/redux'
import type { ColorPickerProps, GetProp } from 'antd'

type Color = GetProp<ColorPickerProps, 'value'>
type Presets = Required<ColorPickerProps>['presets'][number]
const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors }))

export const ThemeSelect: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { t } = useTranslation()
    const items: MenuProps['items'] = [
        {
            key: 'them',
            label: t('navBar.themeChange')
        }
    ]

    const [confirmLoading, setConfirmLoading] = useState(false)
    const { token } = theme.useToken()

    const presets = genPresets({
        primary: generate(token.colorPrimary),
        red,
        green
    })
    const [value, setValue] = useState<Color>('#1677ff')

    const onClick: MenuProps['onClick'] = () => {
        setIsModalOpen(true)
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOk = () => {
        const newColor = typeof value === 'string' ? value : value!.toHexString()
        dispatch(setMainColorCreator(newColor))
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onChangeCompleteClick = (color: Color) => {
        setValue(color)
    }

    return (
        <div id="guide-theme">
            <Dropdown
                menu={{
                    items,
                    onClick
                }}
            >
                <Typography.Link>
                    <Space>
                        <SvgIcon icon={'change-theme'} />
                    </Space>
                </Typography.Link>
            </Dropdown>
            <Modal
                title={t('theme.themeChange')}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                okText={t('universal.confirm')}
                cancelText={t('universal.cancel')}
            >
                <div>{t('theme.themeColorChange')}</div>
                <ColorPicker
                    presets={presets}
                    value={value}
                    onChange={setValue}
                    onChangeComplete={(color) => {
                        onChangeCompleteClick(color)
                    }}
                />
            </Modal>
        </div>
    )
}
