/**
 * 控制权限的按键
 */

import { RootState } from '@/redux';
import { useSelector } from '@/redux/hooks'
import { useMemo } from 'react';

type PermissionButtonProps = {
    /** 需要验证的权限标识 */
    requiredPermission: string;
    /** 权限验证通过时渲染的子内容 */
    children: React.ReactNode;
    /** 权限不匹配时的降级内容 */
    fallback?: React.ReactNode | null;
};

// 自定义权限校验钩子
const usePermission = (requiredPermission: string) => {
    const userPermissions = useSelector((state: RootState) =>
        state.user.userInfo?.permissions?.points ?? []
    );

    return useMemo(
        () => userPermissions.includes(requiredPermission),
        [userPermissions, requiredPermission]
    );
};

export const PermissionButton: React.FC<PermissionButtonProps> = ({
    requiredPermission,
    children,
    fallback = null
}) => {
    const hasPermission = usePermission(requiredPermission);
    return hasPermission ? <>{children}</> : <>{fallback}</>;
}
