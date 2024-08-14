/**
 * 控制权限的按键
 */

import { useSelector } from '@/redux/hooks'

type PropsType = {
    permission: string
    children?: any
}
export const PermissionButton: React.FC<PropsType> = ({
    permission,
    children
}) => {
    const userInfo = useSelector((state) => state.user.userInfo)
    const permissions = userInfo && userInfo['permissions']['points']
    return userInfo &&
        permissions &&
        permissions.length > 0 &&
        permissions.includes(permission)
        ? children
        : null
}
