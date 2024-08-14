import { PanThumb } from '@/components'
import { RootState } from '@/redux'
import { useSelector } from '@/redux/hooks'
import { GetUserInfoResult } from '@/types/api'
import { useTranslation } from 'react-i18next'

export const Author: React.FC = () => {
  const { t } = useTranslation()
  const userInfo: GetUserInfoResult | null = useSelector(
    (state: RootState) => state.user.userInfo
  )

  return (
    <div>
      {userInfo ? (
        <PanThumb image={userInfo.avatar} height={'100px'} width={'100px'}>
          {t('profile.name')}
        </PanThumb>
      ) : (
        <div>暂时数据</div>
      )}
      <div>
        <h3>{t('profile.name')}</h3>
        <span>{t('profile.job')}</span>
      </div>
      <div>{t('profile.Introduction')}</div>
    </div>
  )
}
