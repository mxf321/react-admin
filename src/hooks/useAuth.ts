import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux'
import { isCheckTimeout } from '@/utils/auth'
import { getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { getUserInfo, logOut } from '@/redux/user/slice'
export const useAuth = () => {
  const token = getItem(TOKEN)
  const [permissionsMenus, setPermissionsMenus] = useState<string[]>([])
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (token) {
      if (isCheckTimeout()) {
        // Token 超时，退出登录
        dispatch(logOut())
      } else {
        // 获取用户信息
        dispatch(getUserInfo())
          .unwrap()
          .then(({ permissions }) => {
            setPermissionsMenus(permissions.menus)
          })
          .catch((error) => {
            console.error('Failed to fetch user info:', error)
          })
      }
    }
  }, [token, dispatch])

  return { token, permissionsMenus }
}
