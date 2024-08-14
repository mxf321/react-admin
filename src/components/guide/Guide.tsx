import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
import { SvgIcon } from '@/components'

export const Guide: React.FC = () => {
    const { t } = useTranslation()
    const driver: Driver = new Driver({
        // 禁止点击蒙版关闭
        allowClose: true,
        closeBtnText: t('guide.close'),
        nextBtnText: t('guide.next'),
        prevBtnText: t('guide.prev')
    })

    const onClick = () => {
        driver.defineSteps(steps())
        driver.start()
    }

    return (
        <div onClick={onClick} id="guide-start">
            <Tooltip title={t('navBar.guide')}>
                <SvgIcon icon={'guide'} />
            </Tooltip>
        </div>
    )
}
