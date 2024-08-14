import { useSelector } from '@/redux/hooks'
import { Card, Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import { PanThumb } from '@/components'
import { SvgIcon } from '@/components'
import { RootState } from '@/redux'
import { GetUserInfoResult } from '@/types/api'

interface PropsType {
  features: any[]
}

export const ProjectCard: React.FC<PropsType> = ({ features }) => {
  const { t } = useTranslation()
  const userInfo: GetUserInfoResult | null = useSelector((state: RootState) => state.user.userInfo)

  return (
    <Card
      title={t('profile.introduce')}
      bordered={true}
      style={{ width: '100%' }}
    >
      <div className="user-profile">
        {userInfo ? (
          <>
            {/* 头像 */}
            <div className="box-center">
              <PanThumb
                image={userInfo.avatar}
                role={userInfo.title}
                height="100px"
                width="100px"
              ></PanThumb>
            </div>
            {/* 姓名 & 角色 */}
            <div className="box-center">
              <div className="user-name text-center">{userInfo.username}</div>
              <div className="user-role text-center text-muted">
                {userInfo.title}
              </div>
            </div>
          </>
        ) : (<div>暂时数据</div>)}
      </div>
      {/* 简介  */}
      <div className="project-bio">
        <div className="project-bio-section">
          <div className="project-bio-section-header">
            <SvgIcon icon={'introduce'} />
            <span>{t('profile.projectIntroduction')}</span>
          </div>
          <div className="project-bio-section-body">
            <div className="text-muted">{t('profile.muted')}</div>
          </div>
        </div>
        {/* 功能  */}
        <div className="project-bio-section">
          <div className="project-bio-section-header">
            <SvgIcon icon={'reward'} />
            <span>{t('profile.projectFunction')}</span>
          </div>
          <div className="project-bio-section-body">
            {features.map((item) => (
              <div className="progress-item" key={item.id}>
                <div>{item.title}</div>
                <Progress percent={item.percentage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
