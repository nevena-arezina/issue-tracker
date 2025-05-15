import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) return notFound()

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className='md:col-span-4 mb-5'>
                <IssueDetails issue={issue} />
            </div>

            {session && <div className='flex flex-col space-y-5'>
                <AssigneeSelect />
                <EditIssueButton issueId={issue.id} />
                <DeleteIssueButton issueId={issue.id} />
            </div>}
        </div>
    )
}

export default IssueDetailsPage
