import React, { useRef, useState } from 'react'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './UploadExcel.module.scss'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'

interface PropsType {
    onSuccess: (excelData) => void
    beforeUpload?: (rawFile: File) => boolean
}

export const UploadExcel: React.FC<PropsType> = ({
    onSuccess,
    beforeUpload
}) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)

    const excelUploadInput = useRef<any>()
    const handleUpload = () => {
        excelUploadInput.current?.click()
    }
    const handleChange = (e) => {
        const files = e.target.files
        const rawFile = files[0]
        if (!rawFile) return
        upload(rawFile)
    }

    // 拖拽上传
    const handleDrop = (e) => {
        if (loading) return
        const files = e.dataTransfer.files
        if (files.length !== 1) {
            message.error('必须要有一个文件')
            return
        }
        const rawFile = files[0]
        if (!isExcel(rawFile)) {
            message.error('必须是 .xlsx,.xls,.csx 文件')
            return
        }
        upload(rawFile)
    }
    const handleDragover = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    }

    // 触发上传事件
    const upload = (rawFile: File) => {
        excelUploadInput.current.value = null
        // 如果没有指定上传前回调的话
        if (!beforeUpload) {
            renderData(rawFile)
            return
        }
        // 如果用户指定了上传前的回调，那么只有返回true时，才会执行对应的后续操作
        const before = beforeUpload(rawFile)
        if (before) {
            renderData(rawFile)
        }
    }
    // 读取数据（异步）
    const renderData = (rawFile) => {
        setLoading(true)
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            // 读取操作完成时触发
            reader.onload = (e) => {
                // 1. 获取到解析后的数据
                const data = e.target?.result
                // 2. 利用xlsx对数据进行解析
                const workbook = XLSX.read(data, { type: 'array' })
                // 3. 获取第一张表格名称
                const firstSheetName = workbook.SheetNames[0]
                // 4. 读取 sheet1 的数据
                const workSheet = workbook.Sheets[firstSheetName]
                // 5. 解析数据表头
                const header = getHeaderRow(workSheet)
                // 6. 解析数据库
                const results = XLSX.utils.sheet_to_json(workSheet)
                // 7. 传入解析之后的数据
                generateData({ header, results })
                // 8. 处理loading
                setLoading(false)
                // 9. 成功回调
                resolve(results)
            }
            reader.readAsArrayBuffer(rawFile)
        })
    }

    // 根据导入内容，生成数据
    const generateData = (excelData) => {
        onSuccess && onSuccess(excelData)
    }
    return (
        <div className={styles['upload-excel']}>
            <div className={styles['btn-upload']}>
                <Button
                    type="primary"
                    loading={loading}
                    icon={<UploadOutlined />}
                    onClick={handleUpload}
                >
                    {t('uploadExcel.upload')}
                </Button>
            </div>
            <input
                type="file"
                ref={excelUploadInput}
                className={styles['excel-upload-input']}
                accept=".xlsx,.xls"
                onChange={handleChange}
            />
            <div
                className={styles['drop']}
                onDragOver={handleDragover}
                onDrop={handleDrop}
            >
                <InboxOutlined style={{ fontSize: '60px' }} />
                <span>{t('uploadExcel.drop')}</span>
            </div>
        </div>
    )
}
