import { Skeleton } from '@/app/components'
import React from 'react'

const LoadingNewIssuePage = () => {
    return (
        <div>
            <Skeleton />
            <Skeleton height={"20rem"} />
        </div>
    )
}

export default LoadingNewIssuePage
