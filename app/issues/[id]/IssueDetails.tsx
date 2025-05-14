import { StatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <div>
            <Heading>{issue.title}</Heading>

            <div className='flex gap-5 my-2'>
                <StatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </div>

            <Card className='prose' mt="5">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetails
