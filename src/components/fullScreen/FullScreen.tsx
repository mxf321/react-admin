import { useState } from 'react'
import screenfull from 'screenfull'
import { SvgIcon } from '@/components';

export const FullScreen: React.FC = () => {
    // 是否全屏
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

    // 触发事件
    const onToggle = () => {
        screenfull.toggle()
        setIsFullscreen(!isFullscreen)
    }

    return (
        <div onClick={onToggle} id="guide-full">
            <SvgIcon icon={isFullscreen ? 'fullscreen' : 'exit-fullscreen'} />
        </div>
    )
}
