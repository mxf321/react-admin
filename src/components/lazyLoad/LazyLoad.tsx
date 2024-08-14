import { Loading } from '@/components'
import React from 'react'

type PropsType = {
    children?: JSX.Element;
};

export const LazyLoad: React.FC<PropsType> = ({
    children
}) => {
    return (
        <React.Suspense fallback={<Loading />}>
            {children}
        </React.Suspense>
    )

}
