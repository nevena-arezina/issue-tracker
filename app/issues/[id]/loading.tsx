import { Skeleton } from '@/app/components'
import { Card } from '@radix-ui/themes'

const LoadingIssueDetailsPage = () => {
    return (
        <div className='max-w-xl'>
            <Skeleton />

            <div className='flex gap-5 my-2'>
                <Skeleton width={"5rem"} />
                <Skeleton width={"8rem"} />
            </div >

            <Card className='prose max-w-xl' mt="5">
                <Skeleton count={5} />
            </Card>
        </div >
    )
}

export default LoadingIssueDetailsPage
