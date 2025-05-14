import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) return notFound()

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <IssueDetails issue={issue} />
            </div>

            <div>
                <EditIssueButton issueId={issue.id} />
            </div>
        </div>
    )
}

export default IssueDetailsPage
