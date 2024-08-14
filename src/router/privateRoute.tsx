import React, { useState } from 'react'
import { Navigate } from 'react-router'
import { useSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { getUserInfo, logOut } from '@/redux/user/slice'
import KeepAlive from 'react-activation'
import { AppDispatch } from '@/redux'
import { getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { isCheckTimeout } from '@/utils/auth'
import { useNavigate } from 'react-router-dom'
type PropsType = {
  children?: JSX.Element
  title?: string
}
const PrivateRoute: React.FC<PropsType> = ({ title, children }) => {
  const token = useSelector((state) => state.user.token) || getItem(TOKEN)
  const userInfo = useSelector((state) => state.user.userInfo)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [permissionsMenus, setPermissionsMenus] = useState(
    (userInfo && userInfo['permissions']['menus']) || []
  )

  const getUse = async () => {
    const { permissions } = (await dispatch(getUserInfo())).payload
    setPermissionsMenus(permissions['menus'])
  }
  //   1. 是否有token
  //   2. 没token，直接login
  //   3. 有token,是否有useInfo信息，没直接获取，有就next
  if (token) {
    // 超时退出
    if (isCheckTimeout()) {
      dispatch(logOut())
      navigate('/login')
    }
    if (!userInfo) {
      getUse()
    }
  }
  const logged = token && userInfo ? true : false
  if (!logged) {
    return <Navigate to="/login" />
  } else {
    return title &&
      title.trim() &&
      userInfo &&
      permissionsMenus &&
      permissionsMenus.length > 0 &&
      permissionsMenus.includes(title) ? (
      <>
        <KeepAlive id={title}>{children}</KeepAlive>
      </>
    ) : null
  }
}

export default PrivateRoute
