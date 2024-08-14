import React from 'react'
import * as Icons from '@/icons/index'
import { isExternal } from '@/utils/validate'
import styles from './SvgIcon.module.css'
import * as AntdIcons from '@ant-design/icons'

const titleCase = (str: string) => {
    const newStr: string[] = str.split('-')
    if (newStr.length > 0) {
        for (let i = 0; i < newStr.length; i++) {
            newStr[i] =
                newStr[i].slice(0, 1).toUpperCase() + newStr[i].slice(1).toLowerCase()
        }
    }
    return newStr.join('')
}

export const SvgIcon: React.FC<{
    icon: string
    classNames?: string
    restIconProps?: any
}> = ({ icon, classNames, ...restIconProps }) => {
    if (typeof icon !== 'string') return null
    const strCode = icon.charCodeAt(0)
    let res: JSX.Element
    // icon 首字母大写为 antd 自带的icon
    if (strCode >= 65 && strCode <= 90) {
        res = React.createElement(AntdIcons[icon])
    } else {
        const iconName: string = titleCase(icon)
        res = React.createElement(Icons[iconName])
    }

    const isExt: boolean = isExternal(icon)
    const styleExternalIcon = {
        mask: `url(${icon}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${icon}) no-repeat 50% 50%`
    }
    return (
        <>
            {isExt ? (
                <div
                    style={styleExternalIcon}
                    className={`${styles['svg-external-icon']} ${styles['svg-icon']} ${classNames}`}
                />
            ) : (
                <>{res}</>
            )}
        </>
    )
}
