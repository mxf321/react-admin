import { Breadcrumb } from 'antd'
import { useSelector } from '@/redux/hooks'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RootState } from '@/redux'
import { BreadcrumbItemsType } from '@/types/app'

export const BreadcrumbComp: React.FC = () => {
    // 生成数组数据
    const breadcrumbItems: BreadcrumbItemsType[] = useSelector(
        (state: RootState) => state.base.breadcrumbItems
    )
    const { t } = useTranslation()

    function itemRender(currentRoute, params, items, paths) {
        const isLast = currentRoute?.path === items[items.length - 1]?.path
        return isLast ? (
            <span>{t('route.' + currentRoute.title)}</span>
        ) : (
            <Link to={`/${paths.join('/')}`}>{t('route.' + currentRoute.title)}</Link>
        )
    }

    return (
        <div id="guide-breadcrumb">
            <Breadcrumb itemRender={itemRender} items={breadcrumbItems} />
        </div>
    )
}
