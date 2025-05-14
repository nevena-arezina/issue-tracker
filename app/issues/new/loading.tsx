import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
    return (
        <div>
            <Skeleton />
            <Skeleton height={"20rem"} />
        </div>
    )
}

export default LoadingNewIssuePage
