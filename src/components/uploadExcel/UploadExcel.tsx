import React, { ChangeEvent, useCallback, useRef, useState, DragEvent } from 'react'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './UploadExcel.module.scss'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'

interface PropsType {
    /** 上传成功回调 */
    onSuccess: (excelData: ExcelData) => void;
    /** 上传前校验函数 */
    beforeUpload?: (rawFile: File) => boolean;
}
interface ExcelData {
    header: string[];
    results: Array<Record<string, any>>;
}

export const UploadExcel: React.FC<PropsType> = ({
    onSuccess,
    beforeUpload
}) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)
    const excelUploadInput = useRef<HTMLInputElement>(null);

    // 通用文件处理逻辑
    const processFile = useCallback(async (rawFile: File) => {
        try {
            setLoading(true);
            const data = await readExcelFile(rawFile);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const workSheet = workbook.Sheets[firstSheetName];

            const excelData = {
                header: getHeaderRow(workSheet),
                results: XLSX.utils.sheet_to_json(workSheet)
            };

            onSuccess?.(excelData);
        } catch (error) {
            message.error(t('uploadExcel.parseError'));
        } finally {
            setLoading(false);
        }
    }, [onSuccess, t]);
    // 文件读取逻辑
    const readExcelFile = useCallback((file: File): Promise<ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const result = e.target?.result;
                result instanceof ArrayBuffer
                    ? resolve(result)
                    : reject(new Error('Invalid file format'));
            };

            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });
    }, []);

    // 触发文件处理
    const handleFile = useCallback((file: File) => {
        if (!beforeUpload || beforeUpload(file)) {
            excelUploadInput.current!.value = '';
            processFile(file);
        }
    }, [beforeUpload, processFile]);

    // 点击上传处理
    const handleUploadClick = useCallback(() => {
        excelUploadInput.current?.click();
    }, []);

    // 输入框变化处理
    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);
    // 拖拽处理
    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (loading) return;

        const files = e.dataTransfer.files;
        if (files.length !== 1) {
            message.error(t('uploadExcel.singleFile'));
            return;
        }

        const file = files[0];
        if (!isExcel(file)) {
            message.error(t('uploadExcel.fileType'));
            return;
        }

        handleFile(file);
    }, [loading, handleFile, t]);
    const handleDragover = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);



    return (
        <div className={styles['upload-excel']}>
            <div className={styles['btn-upload']}>
                <Button
                    type="primary"
                    loading={loading}
                    icon={<UploadOutlined />}
                    onClick={handleUploadClick}
                >
                    {t('uploadExcel.upload')}
                </Button>
            </div>
            <input
                type="file"
                ref={excelUploadInput}
                className={styles['excel-upload-input']}
                accept=".xlsx,.xls"
                onChange={handleInputChange}
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
