import { Dropdown, MenuProps, Space, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useCallback, useMemo, useState } from 'react'
import { Modal } from 'antd'
import { setMainColorCreator } from '@/redux/theme/themeActions'
import { generate, green, presetPalettes, red } from '@ant-design/colors'
import { ColorPicker, theme } from 'antd'
import { SvgIcon } from '@/components'
import { AppDispatch } from '@/redux'
import type { ColorPickerProps, GetProp } from 'antd'

type Color = GetProp<ColorPickerProps, 'value'>;
type ColorPreset = Required<ColorPickerProps>['presets'][number];

const generatePresets = (primaryColor: string): ColorPreset[] => {
    return [
        { label: 'Primary', colors: generate(primaryColor) },
        { label: 'Red', colors: red },
        { label: 'Green', colors: green }
    ];
};
const DEFAULT_COLOR = '#1677ff';
export const ThemeSelect: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { t } = useTranslation()
    const { token } = theme.useToken()
    // Memoized values
    const menuItems: MenuProps['items'] = useMemo(() => [{
        key: 'theme',
        label: t('navBar.themeChange')
    }], [t]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState<Color>(DEFAULT_COLOR);

    const colorPresets = useMemo(
        () => generatePresets(token.colorPrimary),
        [token.colorPrimary]
    );
    // Event handlers
    const showColorPicker = useCallback(() => setIsModalOpen(true), []);
    const closeColorPicker = useCallback(() => setIsModalOpen(false), []);
    const handleConfirm = useCallback(() => {
        const colorValue = typeof selectedColor === 'string'
            ? selectedColor
            : selectedColor.toHexString();

        dispatch(setMainColorCreator(colorValue));
        closeColorPicker();
    }, [selectedColor, dispatch, closeColorPicker]);

    const handleColorChange = useCallback<ColorPickerProps['onChange']>(
        (color) => setSelectedColor(color),
        []
    );


    return (
        <div id="guide-theme">
            <Dropdown
                menu={{
                    items: menuItems,
                    onClick: showColorPicker
                }}
            >
                <Typography.Link aria-label={t('navBar.themeChange')}>
                    <Space>
                        <SvgIcon icon={'change-theme'} />
                    </Space>
                </Typography.Link>
            </Dropdown>
            <Modal
                title={t('theme.themeChange')}
                open={isModalOpen}
                onOk={handleConfirm}
                onCancel={closeColorPicker}
                okText={t('universal.confirm')}
                cancelText={t('universal.cancel')}
                centered
                destroyOnClose
            >
                <div>{t('theme.themeColorChange')}</div>
                <ColorPicker
                    presets={colorPresets}
                    value={selectedColor}
                    onChange={handleColorChange}
                    showText
                    size="middle"
                    format="hex"
                />
            </Modal>
        </div>
    )
}
