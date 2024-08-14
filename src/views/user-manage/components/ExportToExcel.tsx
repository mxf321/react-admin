import { getUserManageAllListApi } from '@/api'
import { Input, Modal } from 'antd'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { USER_RELATIONS } from './ExportToExcelConstants'
import { dataFilter } from '@/utils/filter'

interface PropsType {
    isVisible: boolean
    onConfirmETE: (data: any) => void
    onCancelETE: () => void
}

export const ExportToExcel: React.FC<PropsType> = ({
    isVisible,
    onConfirmETE,
    onCancelETE
}) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(true)
    const inputETE = useRef(null)
    // 点击确定导出

    const handleConfirm = async () => {
        setLoading(true)
        const allUser = (await getUserManageAllListApi()).data.list
        // 导入工具包
        const excel = await import('@/utils/Export2Excel')
        const data = formatJson(USER_RELATIONS, allUser)
        excel.export_json_to_excel({
            header: Object.keys(USER_RELATIONS),
            data,
            filename: inputETE.current.input.value || t('excel.defaultName')
        })
        onCancelETE()
    }
    const handleCancel = () => {
        onCancelETE()
    }

    const formatJson = (headers, rows) => {
        return rows.map((item) => {
            return Object.keys(headers).map((key) => {
                // 角色需要进行特殊处理
                if (headers[key] === 'role') {
                    const roles = item[headers[key]]
                    return JSON.stringify(roles.map((role) => role.title))
                }
                // 时间
                if (headers[key] === 'openTime') {
                    return dataFilter(item[headers[key]])
                }
                return item[headers[key]]
            })
        })
    }

    return (
        <Modal
            open={isVisible}
            onCancel={handleCancel}
            onOk={handleConfirm}
            title={t('excel.title')}
            okText={t('universal.confirm')}
            cancelText={t('universal.cancel')}
        >
            <Input ref={inputETE} placeholder={t('excel.placeholder')} allowClear />
        </Modal>
    )
}
