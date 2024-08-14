import React from 'react'
import { message } from 'antd'
import { UploadExcel } from '@/components'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImportApi } from '@/api/userManage'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ImportPage: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    // 导入接口未知，接口通
    const onSuccess = async ({ header, results }) => {
        const updateData = generateData(results)
        await userBatchImportApi(updateData)
        message.success(results.length + t('excel.importSuccess'))
        navigate('/user/manage')
    }
    // 筛选数据
    const generateData = (results) => {
        const arr = []
        results.forEach((item) => {
            const userInfo = {}
            Object.keys(item).forEach((key) => {
                if (USER_RELATIONS[key] === 'openTime') {
                    userInfo[USER_RELATIONS[key]] = formatDate(item[key])
                    return
                }
                userInfo[USER_RELATIONS[key]] = item[key]
            })
            arr.push(userInfo)
        })
        return arr
    }

    return <UploadExcel onSuccess={onSuccess} />
}
export default ImportPage
